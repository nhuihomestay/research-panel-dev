import { Request, Response, Router } from 'express';
import { StudentCtr } from '@ctr';
import log from 'loglevel';
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.getStudent(req.body)
    res.json(result)
})

router.post('/add', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.addStudent(req.body)
    res.json(result)
})

router.put('/update', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.updateStudent(req.body)
    res.json(result)
})

router.get('/count', async (req: Request, res: Response) => {
    log.warn('req:', req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.groupStudent(req.body)
    res.json(result)
})

export default router
