import express from 'express';
import userRoutes from './routes/userRoute.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import bodyParser from 'body-parser';
import AppError from './utils/appError.js';
import addCorsHeaders from './middlewares/corsErrorHandler.js';
import { loginUser, signUpUser } from './controllers/authController.js';
import playListRoutes from './routes/playListRoutes.js';
const app = express();
// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(addCorsHeaders);
// ROUTES
app.post('/signup', signUpUser);
app.post('/login', loginUser);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/playlists', playListRoutes);
app.all('*', (req, res, next) => {
    const error = new AppError('OH! OH!, it seems the route you are looking for does not exist', 400);
    next(error);
});
//GLOBAL ERROR HANDLER
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map