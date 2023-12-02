import express from 'express'
const router = express.Router();
import UserModel from "../Model/User.js"

// Route 1 :-Get "api/user/fetchAllUser", 
router.get("/fetchAllUser", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const perPage = parseInt(req.query.perPage) || 20; // Number of documents per page
    try {
        const domain = req.query.domain;
        const gender = req.query.gender;
        const available = req.query.available;
        const search = req.query.search;
        const queryObject = {};

        if (domain !== undefined) {
            console.log("here")
            queryObject.domain = domain;
        }
        if (gender !== undefined) {
            queryObject.gender = gender;
        }
        if (available !== undefined) {
            if (available === "true") queryObject.available = true
            else queryObject.available = false
        }
        if (search !== undefined && search.length > 0) {
            const decodedName = decodeURIComponent(search.trim());
            const nameParts = decodedName.split(' ');

            // Check if there's at least one part
            if (nameParts.length > 0) {
                // Use $or to match either first_name or last_name
                queryObject.$or = nameParts.map((part) => ({
                    $or: [
                        { first_name: { $regex: new RegExp(part, 'i') } },
                        { last_name: { $regex: new RegExp(part, 'i') } },
                    ],
                }));
            }
        }
        console.log(queryObject)

        const skip = (page - 1) * perPage;
        let success = false;
        const users = await UserModel.find(queryObject).skip(skip).limit(perPage);
        const totalDoc = await UserModel.countDocuments(queryObject);
        success = true;
        const content = {
            meta: {
                total: totalDoc,
                pages: Math.ceil(totalDoc / perPage),
                page: page,
            },
            data: users
        }
        res.json({ success, content });

    } catch (error) {
        res.status(500).json(`Internal server error occured ${error}`);
    }
})

// Route 2 :- add  a user using: Post "api/user/adduser",  login required 
router.post("/adduser", async (req, res) => {
    try {
        let success = false;
        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
        let userByEmail = await UserModel.findOne({ email });

        //calculating the maximum id
        const result = await UserModel.aggregate([
            {
              $group: {
                _id: null,
                maxId: { $max: { $toInt: '$id' } }
              }
            }
        ]);
        const maxId = (result[0].maxId + 1).toString();  

        if (userByEmail) {
            return res.status(200).json({ success: false, error: "Sorry, a user with this email already exists" });
        }

        const user = new UserModel({
            id:maxId, first_name, last_name, email, gender, avatar, domain, available,
        })
        // saving the user 
        const saveuser = await user.save();
        success = true;
        res.json({ success, saveuser });

    } catch (error) {
        res.status(500).json({ success: false, error: `Internal server error ${error}` });
    }
})

//  Route 3 :- update an existing  user using: Put "api/user/update", 
router.put("/update/:id", async (req, res) => {
    try {
        let success = false;
        //only first_name,last_name,avatar,gender,domain,available can be update
        const { first_name, last_name, gender, avatar, domain, available } = req.body;
        //creating a new node object    
        const newUser = {};
        if (first_name) { newUser.first_name = first_name }
        if (last_name) { newUser.last_name = last_name }
        if (gender) { newUser.gender = gender }
        if (avatar) { newUser.avatar = avatar }
        if (domain) { newUser.domain = domain }
        newUser.available = available

        console.log(newUser)
        //Find the note to updated and update: checking the content is already available or not
        let user = await UserModel.findById(req.params.id);
        console.log(user)
        if (!user) {
            return res.status(200).json({ success, error: "User  is not found" });
        }
        user = await UserModel.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        success = true;
        res.json({ success, user });
    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
})
//  Route 4 :- Delete an existing  user using: Delete "api/user/delete",
router.delete("/delete/:id", async (req, res) => {
    try {
        let success = false
        let user = await UserModel.findById({ "_id": req.params.id });
        if (!user) {
            return res.status(200).json({ success, error: "User is not found" });
        }

        // Allow the deletion only if user owns this note

        user = await UserModel.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, user });
    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
})

export default router;
