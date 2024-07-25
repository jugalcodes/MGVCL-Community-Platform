import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// here we used "next" inorder to use the middleware
export const signup = async (req,res,next) => {
    console.log(req.body)
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        // return res.status(400).json({message: 'All fields are required '});
        next(errorHandler(400, 'All fields are required'))
    }

    // here 10 is the number of rounds of salt for better security for the password
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username, 
        email, 
        password: hashedPassword, // using this bcryptjs it makes the password in db more secure and encyprted
    })


    try {
        await newUser.save();
        res.json('Signup successful')
    } catch (error) {
        // res.status(500).json({ message: error.message})
        next(error); // here we are using MIDDLEWARES to handle error in order to make our code more handy 
    }

}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields required'))
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
            return next(errorHandler(404, 'User not found'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword){
            return next(errorHandler(400, 'Incorrect Password'))
        }

        // after validating password and email as both correct now we are creating token
        // with the help of this token we will encrypt the data and create the cookie so no one can easily read the credentials.    
        const token = jwt.sign( {id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);  //thus as soon as user logout from site then cookie expires

        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)
        

    } catch (error) {
        next(error);
    }


    
};

export const google = async (req , res, next) => {

    //checking whether user exist or not and if not then creating a new user 
    const {email, name, googlePhotoUrl} = req.body;

    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);


            const {password, ...rest} = user._doc;
            
            res.status(200).cookie('access_token', token, {
                httpOnly: true, // enhances security by securing cookie this means this cookie will not be accessed by client side code that is js but needs a POST type HTTP requests
            }).json(rest);
        }


        // now as in the user.controller we had made password as required so while siging from google we wont ask for 
        // password but to sign in we need a password so we will create a random password so that user can login with google without any issue
        else{

            //this means 36 => a to z and 0 to 9 included and last 8 digit will be numbers
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); // this 10 means about salt that more secure more encrypted

        const newUser = new User({

            //jugal chhatriwala = jugalchhatriwala1234
            username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
            email,
            password: hashedPassword,
            profilePicture: googlePhotoUrl,
        })

        //now saving the new user
        await newUser.save();
        const token = jwt.sign({id: newUser._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
        res 
            .status(200)
            .cookie('access_token', token , {
                httpOnly: true,
            })
            .json(rest);
        }
        
    } catch (error) {
        next(error)
    }
}