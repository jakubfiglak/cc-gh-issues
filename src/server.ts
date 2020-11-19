import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import githubRoutes from './routes/github';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/github', githubRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
