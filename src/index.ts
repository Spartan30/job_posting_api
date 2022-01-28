import express, {Application, Request, Response, NextFunction} from 'express';

const app: express.Application = express();

app.get('/', (req: Request, res: Response) => {
    
    res.send('Hello World');

});


app.listen(5000, () => console.log('Server running on port 5000'))