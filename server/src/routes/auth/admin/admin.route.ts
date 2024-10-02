import express from 'express';
import { logInAdmin, logOutAdmin, registerAdmin } from '../../../controllers/auth/admin/admin.controller';
const router = express.Router();

router.post('/register-admin', registerAdmin )
router.post('/login-admin', logInAdmin )
router.get('/logout-admin', logOutAdmin )


export default router;