import express from 'express';
import { signup,activate, signin,OAuthSignin, signout } from '../controllers/auth.controller.js';

const router=express.Router()

//signup 
router.post('/signup',signup)

//activate user account after mail verification
router.get('/verification/confirm/:token',activate)

//signin
router.post('/signin',signin)

//OAuth signin
router.post('/OAuth',OAuthSignin)

//signout
router.get('/signout',signout)


export default router