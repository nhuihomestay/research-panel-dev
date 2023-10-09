import { Request, Response, Router } from 'express';
import { AdvisorCtr } from '@ctr';
import log from 'loglevel';
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.getAdvisor(req.body)
    res.json(result)
})

router.post('/add', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.addAdvisor(req.body)
    res.json(result)
})

router.post('/check', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.checkThesis(req.body)
    res.json(result)
})

router.get('/total', async (req: Request, res: Response) => {
    const advisorCtr = new AdvisorCtr()
    const result = await advisorCtr.groupAdvisor()
    res.json(result)
})

export default router
