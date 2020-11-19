import { Router } from 'express';

import { authenticate, getRepos, transferIssues } from '../controllers/github';

const router = Router();

router.post('/authenticate', authenticate);
router.post('/transferissues', transferIssues);
router.get('/repos', getRepos);

export default router;
