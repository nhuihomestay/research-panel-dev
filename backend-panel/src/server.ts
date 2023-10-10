import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// @ts-ignore
import expressAutosanitizer from 'express-autosanitizer';
import path from 'path';
import BaseRouter from './routes';
// import cors from 'cors'

const app = express();
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', 'http:/localhost:5173/');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// const allowedOrigins = [
//     'http://localhost:5173', // เปลี่ยนเป็น URL ของเว็บแอปของคุณ
//   ];
  
//   const corsOptions = {
//     origin: (origin:any, callback:any) => {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   };
  
//   app.use(cors(corsOptions));


app.use(express.json({ limit: '10MB' }), (error: any, req: any, res: any, next: any) => {
    if (error instanceof SyntaxError) {
        return res.send({ data: "large request" });
    } else {
        next();
    }
})
app.use((error: any, req: any, res: any, next: any) => {
    if (error instanceof SyntaxError) {
        return res.send({ data: "json error" });
    } else {
        next();
    }
});
app.use(express.urlencoded({ extended: true, limit: '10MB' }));

app.use(expressAutosanitizer.all);

app.use('/api', BaseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        error: err.message,
    });
});

const staticDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));
app.use('*', (req: Request, res: Response) => {
    res.json({ devMessage: 'Url not found' })
});

export default app;

