Job Posting API
Author: Aaron McNeil
Date: January 30, 2022

App runs on port 5000


To run in dev mode: npm run dev
To build app: npm run build
To run app *buld command must be executed first*: npm run start
To execute tests: npm run test
To clear build directory: npm run clean

node v10.19.0
nodemon v2.0.15
express v4.17.2
mysql v2.18.1


sudo npm install mysql2



Endpoints:
GET    '/'                - Generic hello world homepage
GET    '/jobposting'      - Get all job posting
GET    '/jobposting/:id'  - Get a job posting with specific ID
POST   '/jobposting/:id'  - Insert a new job posting with a specific id into the database *Primary use is for testing purposes*
POST   '/jobposting'      - Insert a new job posting into the database *ID is auto-incremented*
PATCH  '/jobposting/:id'  - Update all the fields (title, description, location, hourly wage) for a jobposting with a specific ID
PATCH  '/title/:id'       - Update the 'title' field for a job posting with a specific ID
PATCH  '/description/:id' - Update the 'description' field for a job posting with a specific ID
PATCH  '/location/:id'    - Update the 'location' field for a job posting with a specific ID
PATCH  '/wage/:id'        - Update the 'wage' field for a job posting with a specific ID
DELETE '/jobposting/:id'  - Delete a job posting with specific ID

