## Welcome to the mean stack

The mean stack is intended to provide a simple and fun starting point for cloud native fullstack javascript applications.   
MEAN is a set of Open Source components that together, provide an end-to-end framework for building dynamic web applications; starting from the top (code running in the browser) to the bottom (database). The stack is made up of:

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **A**ngular (formerly Angular.js): Front-end web app framework; runs your JavaScript code in the user's browser, allowing your application UI to be dynamic
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone https://github.com/linnovate/mean
cd mean
cp .env.example .env
npm install
npm start (for development)
```

### Api Urls
#### Cron Urls
 * http://localhost:4040/api/cron/velov
   * Get Velov Information from download.data.grandlyon.com and save them in the MongoDB DB
 * http://localhost:4040/api/cron/district
   * Get District Information from download.data.grandlyon.com and save them in the MongoDB DB
 * http://localhost:4040/api/cron/touristicArea
   * Get Touristic area Information from download.data.grandlyon.com and save them in the MongoDB DB
#### GetAll Urls
  * http://localhost:4040/api/data/velov
    * Get All Velov of the MongoDB DB
  * http://localhost:4040/api/data/district
    * Get All District of the MongoDB DB
  * http://localhost:4040/api/data/touristicArea
    * Get All Touristic area of the MongoDB DB

#### GetAllNear Urls
  * http://localhost:4040/api/data/velov/:long/:latt
    * Get All Velov of the MongoDB DB near the Point
  * http://localhost:4040/api/data/district/:long/:latt
    * Get All District of the MongoDB DB near the Point
  * http://localhost:4040/api/data/touristicArea/:long/:latt
    * Get All Touristic area of the MongoDB DB near the Point
    
you can add ?distance=(distance in meters) after calling the urls to change the meter radius of the research
 
### Credits 
- The MEAN name was coined by Valeri Karpov.
- Initial concept and development was done by Amos Haviv and sponsered by Linnovate.
- Inspired by the great work of Madhusudhan Srinivasa.
