import { Router } from 'express';
import AdvisorRoute from './advisor.route'
import StudentRoute from './student.route'

const router = Router();

router.use('/advisor', AdvisorRoute)
router.use('/student', StudentRoute)

export default router;