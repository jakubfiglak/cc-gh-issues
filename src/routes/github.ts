import { Router } from 'express';

import { authenticate, transferIssues } from '../controllers/github';

const router = Router();

router.post('/authenticate', authenticate);
router.post('/transferissues', transferIssues);

export default router;
