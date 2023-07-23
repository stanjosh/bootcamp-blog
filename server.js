const path = require('path');
const express = require('express');
const routes = require('./routes');
const views = require('./views');
const engine = require('express-handlebars');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;
var hbs = engine.create(
    {
      extname: '.hbs',
      defaultLayout: 'main',
      layoutsDir: `${__dirname}/views/layouts`,
      partialsDir: `${__dirname}/views/partials`,
});



app.engine('hbs',  hbs.engine);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(views);
app.use(routes);



// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
.then(() => 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
}));
