import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    profilePicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRxffWt6PLGGVvlDlXn8hSORdDei-RYaSV8I5aMEaMK6vakdwXO0-Fq4H9dW5_8thfAk&usqp=CAU",
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }



}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;