import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import githubRoutes from './routes/github';

dotenv.config();

const app = express();

app.use(json());

app.use('/github', githubRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
