import app from './server';
import './LoadEnv';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Simple project server started on port: ' + port);
});
