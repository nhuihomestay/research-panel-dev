import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// @ts-ignore
import expressAutosanitizer from 'express-autosanitizer';
import path from 'path';
import BaseRouter from './routes';
import helmet from 'helmet'

const app = express();
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', (process.env.ENDPOINT_ENV || '') + (process.env.PORT || ''));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

if (process.env.NODE_ENV === 'prod') {
    app.use(helmet())
}

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

