import express from 'express'
const router = express.Router();
import UserModel from "../Model/User.js"

router.get("/searchByName", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const perPage = parseInt(req.query.perPage) || 20; // Number of documents per page
    var query = req.query.search;
    try {
        let success=false;
        const skip = (page - 1) * perPage;
        const query_data = await UserModel.find({
            $or: [
                { "first_name": { $regex: ".*" + query + ".*", $options: 'i' } },
                { "last_name": { $regex: ".*" + query + ".*", $options: 'i' } }
            ]
        }).skip(skip).limit(perPage);

        const totalDoc = await UserModel.countDocuments({
            $or: [
                { "first_name": { $regex: ".*" + query + ".*", $options: 'i' } },
                { "last_name": { $regex: ".*" + query + ".*", $options: 'i' } }
            ]
        });

        const content = {
            meta: {
                total: totalDoc,
                pages: Math.ceil(totalDoc / perPage),
                page: page,
            },
            data: query_data
        }

        if (query_data === 0) {
            return res.status(200).json({ success, error: "Data is not found" })
        }
        success=true;
        res.json({success, content});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});

router.get('/domains', async (req, res) => {
    try {
        const uniqueDomains = await UserModel.distinct('domain');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/gender', async (req, res) => {
    try {
        const uniqueDomains = await UserModel.distinct('gender');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/available', async (req, res) => {
    try {
        const queryObject={};
        queryObject.available=true
        const uniqueAvailable =   await UserModel.find(queryObject);
        
        res.json(uniqueAvailable);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get("/searchByFilter", async (req, res) => {
    let success = false;
    try {
        const domain = req.query.domain;
        const gender = req.query.gender;
        const available =req.query.available;
        const queryObject={};
        if(domain){
            queryObject.domain=domain;
        }
        if(gender){
            queryObject.gender=gender;
        }
        if(available==="true"){
            queryObject.available=true
        }
        if(available==="false"){
            queryObject.available=false
            
        }
        const filter_data = await UserModel.find(queryObject);

        if (filter_data.length === 0) {
            return res.status(200).json({ success, error: "Data is not found" })

        } 
        success=true
        res.json({success,filter_data});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});

router.get("/filter", async (req, res) => {
    let success = false;
    try {
        const domain = req.query.domain;
        const gender = req.query.gender;
        const available =req.query.available;
        const search =req.query.search;
        const queryObject={};
        console.log(domain, gender, available, search)
        console.log(typeof(domain), typeof(gender), typeof(available), typeof(search))

        if(domain !== undefined || domain || domain !== 'undefined'){
            queryObject.domain=domain;
        }
        if(gender !== undefined || gender || gender !== 'undefined'){
            queryObject.gender=gender;
        }
        if(available !== undefined || available || available !== 'undefined'){
            if(available === "true") queryObject.available=true
            else queryObject.available=false
        }
        if(search !== undefined && search.length > 0){
            queryObject.$or = [
                { first_name: { $regex: new RegExp(search, 'i') } },
                { last_name: { $regex: new RegExp(search, 'i') } },
            ];
        }
        const filter_data = await UserModel.find(queryObject);

        if (filter_data.length === 0) {
            return res.status(200).json({ success, error: "Data is not found" })
        } 
        success=true
        res.json({success,filter_data});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});


export default router;