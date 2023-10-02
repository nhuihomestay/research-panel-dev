import { Request, Response, Router } from 'express';
import { AdvisorCtr } from '@ctr';
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.getAdvisor(req.query)
    res.json(result)
})

export default router
