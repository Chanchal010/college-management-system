import express from 'express';
import { logInTeacher, logOutTeacher, registerTeacher } from '../../../controllers/auth/Teacher/teacherAuth.controller';
const router = express.Router();

router.post('/register-teacher', registerTeacher )
router.post('/login-teacher', logInTeacher )
router.get('/logout-teacher', logOutTeacher )


export default router;