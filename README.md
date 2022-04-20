# Team 67 - Product Based Software Engineering Project #1

Discussion Section: 24172	

Team Members:
  Alex Cornide Huber, Ben Zipes, Jordan Hanley, Nikhil Giridharan

Steps to Run
- Setup a MongoDB Atlas Server using the following instructions: https://www.mongodb.com/basics/mongodb-atlas-tutorial
- Install npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Navigate to the desired directory to host the project files
- Run ```git clone https://github.com/zipesb/team67-project1.git```
- Navigate to the file with the path “team67-project1/classhub/backend/.env”
- Replace the “ATLAS_URI” field with the URI from your MongoDB Atlas Server that you setup in the tutorial linked above **(Alternatively, ignore this step and use our default database)**
- Navigate to the "keys.js" file at "team67-project1/classhub/backend/config/keys.js"
- Replace the secretOrKey with your own private value for use with the JSON Web Token security measures
- Navigate to the “team67-project1/classhub” directory
- Run ```npm install```
- Run ```npm start```
- Navigate to the “team67-project1/classhub/backend” directory
- Run ```npm install```
- Run ```nodemon server.js```
- Open a local browser and navigate to “http://localhost:3000/” in the address bar
- To run the end-to-end tests implemented in puppeteer run ```npm test``` from the “team67-project1/classhub” directory
