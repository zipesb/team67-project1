# Team 67 - Classhub

Discussion Section: 24172	

Description: ClassHub is a public learning platform where students, teachers and avid learners can set up pages for learning different skills or school subjects. These pages are open to contributors as designated by the page’s creator. In each class page, all members can submit relevant files– powerpoints, worksheets, answer keys, or instructional videos– to help each other achieve their educational goals. Chat rooms are available for each class page to allow students to converse with each other regarding their class curriculum. Additionally, users can manage their own accounts and pages they create, rate any class page on a 5-star system, and search for material on other class subjects.


Team Members:
  Alex Cornide Huber, Ben Zipes, Jordan Hanley, Nikhil Giridharan

Steps to Run
- Setup a MongoDB Atlas Server using the following instructions: https://www.mongodb.com/basics/mongodb-atlas-tutorial
- Install npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Navigate to the desired directory to host the project files
- Run ```git clone https://github.com/zipesb/team67-project1.git```
- Navigate to the file with the path “team67-project1/classhub/backend/.env”
- Replace the “ATLAS_URI” field with the URI from your MongoDB Atlas Server that you setup in the tutorial linked above
- Navigate to the "keys.js" file at "team67-project1/classhub/backend/config/keys.js"
- Replace the secretOrKey with your own private value for use with the JSON Web Token security measures
- Navigate to the “team67-project1/classhub” directory
- Run ```npm install```
- Run ```npm start```
- Navigate to the “team67-project1/classhub/backend” directory
- Run ```npm install```
- Run ```nodemon server.js```
- Open a local browser and navigate to “http://localhost:3000/” in the address bar
- To run the end-to-end tests implemented in puppeteer run “npm test” from the “team67-project1/classhub” directory
