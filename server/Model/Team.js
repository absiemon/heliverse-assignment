import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, require: true },
    description: { type: String, require: true },
    member: {
      type: [
        {
          id: { type: String, require: true },
          first_name: { type: String, require: true },
          last_name: { type: String, require: true },
          domain: { type: String, require: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const TeamModel = mongoose.model("Team", TeamSchema);

export default TeamModel;
