import { Request, Response, Router } from 'express';
import { StudentCtr } from '@ctr';
import log from 'loglevel';
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    log.warn('getStudent req:', req.query)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.getStudent(req.query)
    res.json(result)
})

router.post('/add', async (req: Request, res: Response) => {
    log.warn('addStudent req:', req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.addStudent(req.body)
    res.json(result)
})

router.put('/update', async (req: Request, res: Response) => {
    log.warn('updateStudent req:', req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.updateStudent(req.body)
    res.json(result)
})

router.get('/count', async (req: Request, res: Response) => {
    log.warn('countStudent req:', req.query)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.groupStudent(req.query)
    res.json(result)
})

export default router
