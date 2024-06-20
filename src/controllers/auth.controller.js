import { response } from "express";
import Admin from "../models/admin.model.js"
import bcrypt from 'bcrypt';

const login = async (req, res) => {
   
    try {
        const {username, password} = req.body;
        
        const admin = await Admin.findOne({username});

        if(!admin){
            res.status(404).json({error: 'User not found!'})
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({username: admin.username})
       
    } catch (error) {
       console.log(error) 
    }
   
} 

export default {
    login
}