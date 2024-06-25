import express from 'express';
import { signup,activate, signin,OAuthSignin } from '../controllers/auth.controller.js';

const router=express.Router()

//signup 
router.post('/signup',signup)

//activate user account after mail verification
router.get('/verification/confirm/:token',activate)

//signin
router.post('/signin',signin)

//OAuth signin
router.post('/OAuth',OAuthSignin)


export default router