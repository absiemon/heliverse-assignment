import express from 'express'
const router = express.Router();
import TeamModel from "../Model/Team.js"

router.get("/allTeam", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const perPage = parseInt(req.query.perPage) || 20; // Number of documents per page
    try {
        const skip = (page - 1) * perPage;
        let success = false;
        const teams = await TeamModel.find().skip(skip).limit(perPage);
        const totalDoc = await TeamModel.countDocuments();
        success = true;
        const content = {
            meta: {
                total: totalDoc,
                pages: Math.ceil(totalDoc / perPage),
                page: page,
            },
            data: teams
        }
        res.json({ success, content });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Internal server error occurred" });
    }
  });


router.get("/Team/:id",async (req, res) => {
    try {
        let success=false;
        const team = await TeamModel.findById(req.params.id);
        if(team.length<0){
            return res.status(200).json({ success, error: "Team is not found" })
        }
        success=true;
        res.json({success,team});

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
});


router.post("/addTeam", async (req, res) => {
    try {
        const { teamName, description, member } = req.body;
        let success=false;
        const checkTeam = await TeamModel.find({teamName});
        console.log(checkTeam)
        if(checkTeam.length > 0){
            return res.status(200).json({success: false, error: "Team name already taken"});
        }

        const team = new TeamModel({
            teamName,
            description,
            member,
        });

        // Save the team
        const savedTeam = await team.save();

        res.json({ success: true, savedTeam });

    } catch (error) {
        res.status(500).json({success: false, error: `Internal server error ${error}`});
    }
})

export default router;