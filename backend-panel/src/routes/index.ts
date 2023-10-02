import { Router } from 'express';
import AdvisorRoute from './advisor.route'

const router = Router();

router.use('/advisor', AdvisorRoute)

export default router;