import express from 'express';
import dotenv from 'dotenv';
import githubRoutes from './routes/github';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/github', githubRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
