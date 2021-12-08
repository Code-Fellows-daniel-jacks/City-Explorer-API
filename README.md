# City Explorer Server

**Author**: Daniel Jackson
**Version**: 1.0.3 

## Overview
This will act as a middle point server for clients of my city-explorer website to get information from APIs. 

## Getting Started
You'll need a new repo in GitHub, and need to follow these steps: 
1. run ```npm init``` and create a package.json file
2. run ```npm install express dotenv cors``` in order to set up the dependancies you need for this server
3. add a .gitignore and .eslintr.json file and edit according
4. use either a provided json or api to get information to render to site
5. from there you have the building blocks, it's just a matter of linking the server to the deployed app and being able to request information between one another
## Architecture
This uses express (server library), dotenv, cors (to allow users to access server), and vanilla JavaScript

## Change Log

12-07-2021 4:05pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credit and Collaborations
Sara Russert helped a ton with understanding the correct way to format my GET url, as well as sifting through the .json and finding the data I was querying for.