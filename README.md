# Y-blog
CRUD blog ussing mysql2, express, handlebars, and sequelize

## Description

Y-blog is a simple blog web app that uses a mariadb database to store blog posts, comments, users, and sessions.

It uses express to handle the routes, sequelize to wrangle the database, and handlebars to render.

It uses express-session to handle sessions and bcrypt to hash passwords. Additionally, userIDs should be hidden from the client.

It uses dotenv to hide connection information.

You can read all blog posts and comments without logging in. If you are logged in, you can create or delete your own comments, or create, update, and delete your own blog posts. You can also view your own dashboard, which shows all of your blog posts and comments.

[live demo on heroku](https://y-blog-4ae3f01d0257.herokuapp.com/dashboard)



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