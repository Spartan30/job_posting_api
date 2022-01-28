import express, {Application, Request, Response, NextFunction} from 'express';

const app: express.Application = express();
const PORT = 5000;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    
    res.send('Hello World');

});

app.get('/jobposting', (req: Request, res: Response) => {
    
    res.status(200).send({
        id: '1',
        name: 'testing'
    });

});

app.post('/jobposting/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;
    const { name } = req.body;
    const { wage } = req.body;

    if (!name || !wage) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else{

        res.status(200).send({
            jobposting: `${id} name: '${name}' and wage: $${wage}`
        });
    
    }

});


app.listen(PORT, () => console.log('Server running on port ' + PORT))

//id
//title
//description
//location
//hourly pay rate

//creation datetime
//updated datetime