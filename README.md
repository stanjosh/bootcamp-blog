# Y-blog
CRUD blog ussing mysql2, express, handlebars, and sequelize

## Description

Y-blog is a simple blog web app that uses a mariadb database to store blog posts and comments. The app uses express.js to handle the server and routing, mysql2 to connect to the database, sequelize to handle the database queries, and handlebars to render the html. The app allows users to create, read, update, and delete blog posts and comments. The app also allows users to login and logout. The app uses express-session to handle the user sessions. The app also uses bcrypt to hash the user passwords before storing them in the database. All the IDs for each item are a UUID. Seeding the database with the seed script assigns the blog posts to randomly selected users and then assigns the seeded comments to random users and blog posts. The app also uses dotenv to retrieve the database information from a .env file. The app also uses connect-session-sequelize to store the user sessions in the database. The app also uses express-handlebars to render the html. The app also uses express-s

[youtube video demonstration](https://youtu.be/kE05ffkQKNI)


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

To install necessary dependencies, run the following command:

```
  npm i
```

Run your sql shell and ```source model/schema.sql``` file to create database called ```blog_db```.

put your information in the ```.env``` file

Run ```npm run seed``` to seed the database.

## Usage



```run npm start``` to start the server. Use Insomnia to test the api routes.


## License

This project is licensed under the MIT license.