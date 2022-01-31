//Author: Aaron McNeil
//Date: January 30,2022
//Test cases for API

import request from "supertest";
import { expect }from "chai";
const app =  require("../src/index");

//Test case to check that server starts successfully
describe("server checks", function(){
    it("server is created without error", function(done){
        request(app).get("/").expect(200, done);
    });
});


//Test cases for POST endpoints
describe("Job Posting POST", function(){
    it("Create job posting", function(done){
        request(app).post("/jobposting").send({
            title: "Assembly Line Worker",
            description: "Manufacture spring for automobiles",
            location: "Waterloo, ON",
            wage: "16.5"
        }).expect(200, done);
    });

    it("Create job posting with ID of 1", function(done){
        request(app).post("/jobposting/1").send({
            title: "Cashier",
            description: "Process sales and returns at checkout",
            location: "Hamilton, ON",
            wage: "15.65"
        }).expect(200, done);
    });
});


//Test cases for GET endpoints
describe("Job Posting GET", function(){
    it("Get all job postings", function(done){
        request(app).get("/jobposting").expect(200, done);
    });

    it("Get job posting of ID = 1", function(done){
        request(app).get("/jobposting/1").expect(200, done);
    });
});


//Test cases for PATCH endpoints
describe("Job Posting PATCH", function(){
    it("Update all fields for job posting of ID = 1", function(done){
        request(app).patch("/jobposting/1").send({
            title: "Robot Assembly Line Worker",
            description: "Monitor machines and perform maintenance",
            location: "Kitchener, ON",
            wage: "18.25"
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
});

//Test cases for DELETE endpoints
describe("Job Posting DELETE", function(){
    it("Delete job posting of ID = 1", function(done){
        request(app).delete("/jobposting/1").expect(200, done);
    });
});
