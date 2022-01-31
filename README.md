Job Posting API
Author: Aaron McNeil
Date: January 30, 2022


API runs on port 5000


***Environment Setup***
API uses node framework and npm for package management, they can be downloaded at this link: https://nodejs.org/en/download/
Once downloaded please run to install node and npm
Once installed, open a command line (as administrator), and go to the root of the project folder and execute: npm install
Once the dependencies have finished installing, the below commands (under ***Scripts***) can be used to build, run, and test the API

***Scripts***

To run in dev mode: npm run dev
To build app: npm run build
To run app *buld command must be executed first*: npm run start
To execute tests: npm run test
To clear build directory: npm run clean


***Endpoints***
GET    '/'                - Generic hello world homepage
GET    '/jobposting'      - Get all job postings
GET    '/jobposting/:id'  - Get a job posting with specific ID
POST   '/jobposting/:id'  - Insert a new job posting with a specific ID into the database *Job postings cannot have duplicate ID's*
POST   '/jobposting'      - Insert a new job posting into the database *ID is auto-incremented*
PATCH  '/jobposting/:id'  - Update all the fields (title, description, location, and hourly wage) for a job posting with a specific ID
PATCH  '/title/:id'       - Update the 'title' field for a job posting with a specific ID
PATCH  '/description/:id' - Update the 'description' field for a job posting with a specific ID
PATCH  '/location/:id'    - Update the 'location' field for a job posting with a specific ID
PATCH  '/wage/:id'        - Update the 'wage' field for a job posting with a specific ID
PATCH  '/company/:id'     - Update the 'company' field for a job posting with a specific ID
DELETE '/jobposting/:id'  - Delete a job posting with a specific ID