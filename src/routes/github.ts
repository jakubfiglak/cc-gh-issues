import { Router } from 'express';

import { authenticate } from '../controllers/github';

const router = Router();

router.post('/authenticate', authenticate);

export default router;
