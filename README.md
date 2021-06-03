# Creation of a corporate social network

## Getting started
git clone https://github.com/sebdelacaps/SebastienSoumier_7_17052021

## Frontend :

* cd frontend-groupomania
* npm install 
* npm run serve

## Backend :
* cd backend-Groupomania
* npm install
* npm start

## Database :
Make sure you have MySQL installed globally

* cd backend
* 
You'll need to verify that the username and password in the config database.json file (backend-Groupomania/config/config.json), match your local MySQL credentials.

sequelize db:create (Create database specified by configuration)
sequelize db:migrate (Run pending migrations)

Then open on any web browser : http://localhost:8080/
