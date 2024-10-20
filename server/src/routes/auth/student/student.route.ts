import express from 'express';
import { logInStudent, logOutStudent, registerStudent } from '../../../controllers/auth/student/studentAuth.controller';
const router = express.Router();

router.post('/register-student', registerStudent )
router.post('/login-student', logInStudent )
router.get('/logout-student', logOutStudent )




export default router;