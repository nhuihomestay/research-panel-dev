import { Request, Response, Router } from 'express';
import { AdvisorCtr } from '@ctr';
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.getAdvisor(req.body)
    res.json(result)
})

router.post('/add', async (req: Request, res: Response) => {
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.addAdvisor(req.body)
    res.json(result)
})

router.post('/check', async (req: Request, res: Response) => {
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.checkThesis(req.body)
    res.json(result)
})

export default router
