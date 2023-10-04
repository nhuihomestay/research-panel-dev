import { Request, Response, Router } from 'express';
import { StudentCtr } from '@ctr';
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const studentCtr = new StudentCtr()
    const result = await studentCtr.getStudent(req.body)
    res.json(result)
})

router.post('/add', async (req: Request, res: Response) => {
    console.log(req.body)
    const studentCtr = new StudentCtr()
    const result = await studentCtr.addStudent(req.body)
    res.json(result)
})

router.put('/update', async (req: Request, res: Response) => {
    const studentCtr = new StudentCtr()
    const result = await studentCtr.updateStudent(req.body)
    res.json(result)
})

export default router
