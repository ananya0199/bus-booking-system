import express from 'express';
import controller from '../controller/authController';

const router = express.Router();

router.post('/signup', controller.signUp);
router.post('/login', controller.login);
//post bus api
//get bus api
//post api for updating bus detail
export= router;