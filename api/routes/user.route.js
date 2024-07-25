import express from 'express'
import { test, updateUser, deleteUser, signout, getUsers  } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js';
import { getUser } from '../controllers/comment.controller.js';


const router =  express.Router();

// Define a test route
router.get('/test', test);

// Define an update user route with token verification
router.put('/update/:userId',verifyToken, updateUser);

// To delete the account
router.delete('/delete/:userId', verifyToken, deleteUser);

// To signout from the existing account
router.post('/signout', signout);

// for the admin to know the total users
router.get('/getusers', verifyToken,getUsers)

router.get('/:userId', getUser)

export default router;
