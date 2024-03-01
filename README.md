**Capstone Project 2: Tourlifve**  
live at https://defiant-faucet.surge.sh/  
Github:  [backend](https://github.com/HapoGit89/Tourlifve_backend.git)  [frontend](https://github.com/HapoGit89/Tourlifve_frontend.git)

This web app is called Tourlifve and wants to help frequent travellers by letting them custom search for interesting places nearby their stays.

The features are:

- SignIn and LogIn for users
- Tour planning featuring a GoogleMap based search 
- Nearby place search featuring a GoogleMap based form
- User Profile Edit
- Tour and Place Edits

I developed this app because the following scenario is something I frequently encounter when working as touring musician: When staying at a place in a new city, one option to search for interesting places is Google Maps. However, this option lacks the ability to search for places by traveltime and mode of travel, two limited resources when on tour. Also I wanted to be able to save interesting places in relation to the location I am staying in. Tourlifve solves these problems.


A standard user flow could look like:

Visiting the home route, users get prompted to sign in or log in. 

After authentification, it is possible to create a new project/tour by clicking the tour navigation link.
Having created a tour, users can now enter the locations they will stay at on that tour/journey.
For each location it is possible to search for an save interesting places nearby by using a search query, traveltime budget and travelmode.

When on tour/on a journey, the user accesses tourlifve and can look at list of places he/she saved for each location.

For the location and places search I used the GoogleMaps API with the places library and its npm react wrappers. In order to run the frontend and backend, an own Google API key is required and should be put as envorinoment var.


**Teck Stack:**  
HTML  
CSS/React Bootstrap  
Node.js/Express  
React

**Run app with:**  
backend: node server.js  
frontend: npm start

**Run tests with:**  
backend: jest -i  
frontend: npm test

Unfortunately, this app is not mobile ready yet. That is to come in the next weeks/months
