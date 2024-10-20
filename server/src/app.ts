import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors(
//     {
//         origin: 'http://localhost:5173', // Frontend URL
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization'],
//         credentials: true,
//     }
// ));

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

//auth routes
import studentAuthRoute from './routes/auth/student/student.route'
import teacherAuthRoute from './routes/auth/teacher/teacher.route'
import adminAuthRoute from './routes/auth/admin/admin.route'
import studentProfileRoute from './routes/profile/studentProfile.route'


app.use('/api/v1/auth', studentAuthRoute)
app.use('/api/v1/auth', teacherAuthRoute)
app.use('/api/v1/auth', adminAuthRoute)

app.use('/api/v1/profile', studentProfileRoute)




export default app;