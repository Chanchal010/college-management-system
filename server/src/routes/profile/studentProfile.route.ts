import express from 'express';
import { saveStudentProfile } from '../../controllers/profile/student/studentProfile.controller';
const router = express.Router();
router.post('/student-profile', saveStudentProfile )





export default router;