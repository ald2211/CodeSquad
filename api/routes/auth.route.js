import express from 'express';
import { signup,activate } from '../controllers/auth.controller.js';

const router=express.Router()

//signup 
router.post('/signup',signup)

//activate user account after mail verification
router.get('/verification/confirm/:token',activate)


export default router