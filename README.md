# Car Gallery
A simple image gallery for car data using Node, Express, Webpack, React, and Redux. 

## Getting Started
Run the `npm install` command inside your command line in the main folder.

### Running The App
Run `npm start` in the main folder in your command line to start the server and go to http://localhost:3000 in your browser to view the app.

### Running The React App Seperately
Navigate to the client folder and run `npm install` then `npm start` in the command line to start the application, then go to http://localhost:8080 in your browser to view the applicatione. Note that the application will not work if the Node server is not runnning. 

* Note: If any changes are made to the react app, run `npm run postinstall` in the client folder to generate the bundle.js file in order for the server to serve the updated version of the files.


# Process

## What I did
- Set up an Express server, which serves the react app and returns the car data
- Set up the react app to render the car list returned from the server
- Added filters for price and make
- Added functionality to click on picture and view in carousel
- Added auto rotate for the carousel

## Problems encountered (mostly due to lack of time)
- The css for the header and footer
- Checking if image url is broken
- Throttling the price filter

## To Do Next
- Fix header css
- Add footer
- Seperate the components into own files, and use styledComponents in each component's file to style them
- Fix the layout (car description, grid) and make it responsive
- Add tests to the frontend and backend
- Add eslint to ensure consistent code style and best code practicies
- Check if image url exists and put a default photo if not
- Use react router to navigate between pages (to allow bookmarking photos)
- Adding throttle to price filter so that list is not empty when user starts typing
