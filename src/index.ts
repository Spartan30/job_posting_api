import express, {Application, Request, Response, NextFunction} from 'express';
import mysql from 'mysql2';


//Configure mysql connection
const connection = mysql.createConnection({
    host: 'database-1.ch30r11oyqan.us-east-1.rds.amazonaws.com',
    user: 'api',
    password: 'JobPostApi01!',
    database: 'job_posting_api',
    connectionLimit: 10
});

connection.connect(function(error){
    if (!!error){
        console.log('Error: Failed to connect to database');
    }
    else{
        console.log('Connected to database')
    }
})


//Configure app
const app: express.Application = express();
const PORT = 5000;

app.use(express.json());


//Display Hello World home page
app.get('/', (req: Request, res: Response) => {
    
    res.status(200).send('Hello World');

});


//GET jobposting
//Param: n/a
//Body: n/a
//Get all job postings
app.get('/jobposting', (req: Request, res: Response) => {

    connection.query("SELECT * FROM job_postings", function(error, rows, fields){
        if(!!error){
            console.log('Error: query failed');
            res.status(500).send({
                error: "Query failed"
            });
        }
        else{
            console.log('Successful query');
            console.log(rows);

            res.status(200).send({
                result: rows
            });
        }
    });
});



//GET jobposting
//Param: id
//Body: n/a
//Get job posting with a specific id
app.get('/jobposting/:id', (req: Request, res: Response) => {

    const { id } = req.params;

    if (!id) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else{

        connection.query("SELECT * FROM job_postings WHERE id = ?", [id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    }
});


//POST jobposting
//Param: id
//Body: title, description, location, wage
//Insert new job posting into database with a specific id (mainly for testing purposes)
app.post('/jobposting/:id', (req: Request, res: Response) => {
    
    const { id } = req.params;
    const { title } = req.body;
    const { description } = req.body;
    const { location } = req.body;
    const { wage } = req.body;

    if (!id || !title || !description || !location || !wage) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else if(isNaN(wage)){
        res.status(418).send({ message: 'Wage must be a valid number'})
    }
    else{

        //Execute insert query
        connection.query("INSERT INTO job_postings VALUES(?, ?, ?, ?, ?, now(), now())",[id, title, description, location, wage], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


//POST jobposting
//Param: n/a
//Body: title, description, location, wage
//Insert new job posting into database
app.post('/jobposting', (req: Request, res: Response) => {
    
    const { title } = req.body;
    const { description } = req.body;
    const { location } = req.body;
    const { wage } = req.body;

    if (!title || !description || !location || !wage) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else if(isNaN(wage)){
        res.status(418).send({ message: 'Wage must be a valid number'})
    }
    else{

        //Execute insert query
        connection.query("INSERT INTO job_postings VALUES(NULL, ?, ?, ?, ?, now(), now())",[title, description, location, wage], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


//PATCH jobposting
//Param: id
//Body: title, description, location, wage
//Update all the fields for a job posting with a specific id
app.patch('/jobposting/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { title } = req.body;
    const { description } = req.body;
    const { location } = req.body;
    const { wage } = req.body;

    if (!id || !title || !description || !location || !wage) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else if(isNaN(wage)){
        res.status(418).send({ message: 'Wage must be a valid number'})
    }
    else{

        //Execute insert query
        connection.query("UPDATE job_postings SET title = ?, description = ?, location = ?, hourly_wage = ?, updated = now() WHERE id = ?",[title, description, location, wage, id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


//PATCH title
//Param: id
//Body: title
//Update the title field for a job posting with a specific id
app.patch('/title/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { title } = req.body;

    if (!id || !title ) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else{

        //Execute insert query
        connection.query("UPDATE job_postings SET title = ?, updated = now() WHERE id = ?",[title, id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


//PATCH description
//Param: id
//Body: description
//Update the description field for a job posting with a specific id
app.patch('/description/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { description } = req.body;

    if (!id || !description ) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else{

        //Execute insert query
        connection.query("UPDATE job_postings SET description = ?, updated = now() WHERE id = ?",[description, id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});



//PATCH location
//Param: id
//Body: location
//Update the location field for a job posting with a specific id
app.patch('/location/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { location } = req.body;

    if (!id || !location ) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else{

        //Execute insert query
        connection.query("UPDATE job_postings SET location = ?, updated = now() WHERE id = ?",[location, id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


//PATCH wage
//Param: id
//Body: wage
//Update the hourly_wage field for a job posting with a specific id
app.patch('/wage/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { wage } = req.body;

    if (!id || !wage ) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else if(isNaN(wage)){
        res.status(418).send({ message: 'Wage must be a valid number'})
    }
    else{

        //Execute insert query
        connection.query("UPDATE job_postings SET hourly_wage = ?, updated = now() WHERE id = ?",[wage, id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


//DELETE jobposting
//Param: id
//Body: n/a
//Delete a job posting with a specific id
app.delete('/jobposting/:id', (req: Request, res: Response) => {

    const { id } = req.params;

    if (!id) {
        res.status(418).send({ message: 'Missing required data'})
    }
    else{

        //Execute insert query
        connection.query("DELETE FROM job_postings WHERE id = ?",[id], function(error, rows, fields){
            if(!!error){
                console.log('Error: query failed');
                console.log(error)

                res.status(500).send({
                    error: "Query failed"
                });
            }
            else{
                console.log('Successful query');
                console.log(rows);

                res.status(200).send({
                    result: rows
                });
            }
        });
    
    }

});


module.exports = app.listen(PORT, () => console.log('Server running on port ' + PORT))