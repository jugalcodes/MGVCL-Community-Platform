import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import cookieParser from "cookie-parser"

// Load environment variables from .env file
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(
    () => {
        console.log("mongodb is connected")
    }
).catch((err) => {
    console.log(err);
})


// Middleware
app.use(express.json());
app.use(cookieParser())

// Start the server
app.listen(3000, () => {
    console.log(`server is running at 3000`)
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes)

// Error Handling Middleware
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});