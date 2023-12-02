import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';

import connectDB from "./config/DbConnection.js";
import UserModel from "./Model/User.js"

import userRoute from './Route/user.js'
import teamRoute from './Route/team.js'
import searchRoute from './Route/search.js'

import { readFile } from 'fs/promises'; 
const data = await readFile('./user.json', 'utf-8');
const userData = JSON.parse(data);

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))
app.use(morgan());

app.use(cors());

await connectDB();


// Function to populate MongoDB with seed data
const addMockData = async () => {
    try {
      
      const users = await UserModel.find({});
      if(users.length === 0){
      // Remove existing data from the collection
        await UserModel.deleteMany();
    
        // Insert mock data into the collection
        await UserModel.insertMany(userData);
        console.log('mock data added to MongoDB');
      }
    } catch (error) {
      console.error('Error populating database:', error);   
    }
};

//defining routes path  

// app.use('/', (req, res)=>{
//   return res.json({
//     message: "You are at the home page"
//   })
// })

app.use("/api/user", userRoute);
app.use("/api/query", searchRoute);
app.use("/api/team", teamRoute);

// if(process.env.NODE_ENV==='production'){
//   app.use(express.static('client/build'))
// }

const port = process.env.PORT || 8000;

await addMockData();
app.listen(port, () => {
    console.log(`Backend  listening on port http://localhost:${port}`)
})





