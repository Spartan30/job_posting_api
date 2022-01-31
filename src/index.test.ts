//Author: Aaron McNeil
//Date: January 31,2022
//Test cases for API

import request from "supertest";
import { expect }from "chai";
const app =  require("../src/index");
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
})


//Test case to check that server starts successfully
describe("server checks", function(){

    //Database setup
    before("Test setup - Clear Table", function(done){
        
        connection.query("DELETE FROM job_postings", function(error, rows, fields){
            done()
        });

    });

    before("Test setup - Insert job posting 2", function(done){

        connection.query("INSERT into job_postings VALUES(2, 'Sales Floor Associate', 'Assist customers with finding the products they want on the sales floor', 'Toronto, ON', 25.45, 'Sales Inc', now(), now())", function(error, rows, fields){
            done()
        });

    });

    before("Test setup - Insert job posting 3", function(done){

        connection.query("INSERT into job_postings VALUES(3, 'Maintenance Technician', 'Perform prventative maintenance and repairs on factor machinery', 'Waterloo, ON', 35, 'Automotive Corp', now(), now())", function(error, rows, fields){
            done()
        });

    });

    before("Test setup - Insert job posting 4", function(done){

        connection.query("INSERT into job_postings VALUES(4, 'Customer Support', 'Answer questions from our customers via the phone', 'Hamilton, ON', 18.6, 'Furniture Depot', now(), now())", function(error, rows, fields){
            done()
        });

    });

    
    //Check that server is running
    it("server is created without error", function(done){
        request(app).get("/").expect(200, done);
    });
});


//Test cases for GET endpoints
describe("Job Posting GET", function(){
    it("Get all job postings", function(done){
        request(app).get("/jobposting").expect(200, done);
    });

    it("Get job posting of ID = 2", function(done){
        request(app).get("/jobposting/2").expect(200, done);
    });
});


//Test cases for POST endpoints
describe("Job Posting POST", function(){
    it("Create job posting", function(done){
        request(app).post("/jobposting").send({
            title: "Assembly Line Worker",
            description: "Manufacture spring for automobiles",
            location: "Waterloo, ON",
            wage: "16.5",
            company: 'Toyota'
        }).expect(200, done);
    });

    it("Create job posting with ID of 1", function(done){
        request(app).post("/jobposting/1").send({
            title: "Cashier",
            description: "Process sales and returns at checkout",
            location: "Hamilton, ON",
            wage: "15.65",
            company: 'Walmart'
        }).expect(200, done);
    });
});


//Test cases for PATCH endpoints
describe("Job Posting PATCH", function(){
    it("Update all fields for job posting of ID = 1", function(done){
        request(app).patch("/jobposting/1").send({
            title: "Robot Assembly Line Worker",
            description: "Monitor machines and perform maintenance",
            location: "Kitchener, ON",
            wage: "18.25",
            company: "Honda"
        }).expect(200, done);
    });

    it("Update description field of job posting with ID of 1", function(done){
        request(app).patch("/description/1").send({
            description: "Perform maintenance on assembly robots"
        }).expect(200, done);
    });

    it("Update location field of job posting with ID of 1", function(done){
        request(app).patch("/location/1").send({
            location: "Cambridge, ON"
        }).expect(200, done);
    });

    it("Update wage field of job posting with ID of 1", function(done){
        request(app).patch("/wage/1").send({
            wage: "19.5"
        }).expect(200, done);
    });

    it("Update company field of job posting with ID of 1", function(done){
        request(app).patch("/company/1").send({
            company: "Ford"
        }).expect(200, done);
    });
});


//Test cases for DELETE endpoints
describe("Job Posting DELETE", function(){
    it("Delete job posting of ID = 1", function(done){
        request(app).delete("/jobposting/1").expect(200, done);
    });

    //Database teardown
    after("Test teardown - Clear table", function(done){
        connection.query("DELETE FROM job_postings", function(error, rows, fields){
            done()
        });

    });

});
