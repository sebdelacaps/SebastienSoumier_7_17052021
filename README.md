###Creation of a corporate social network
Getting started
git clone git@github.com:marieparet/groupomania.git

Frontend :
cd frontend
npm install 
npm run serve
Backend :
cd backend
npm install
npm start
Database :
Make sure you have MySQL installed globally

cd backend
You'll need to verify that the username and password in the config database.json file, match your local MySQL credentials.

npx sequelize-cli db:create
npx sequelize-cli db:migrate
Then open on any web browser : http://localhost:8080/
