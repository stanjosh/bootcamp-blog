const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const views = require('./views');
const dayjs = require('dayjs');
const engine = require('express-handlebars');
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


var hbs = engine.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
  helpers: {
    formatTime: function (date, format) {
      return dayjs(date).format(format);
    },
    compare: function (val1, val2) {
      return val1 === val2 ? true : false
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  },
});

const oneDay = 1000 * 60 * 30;
app.use(session({
  store: new SequelizeStore({
    db: sequelize
  }),
  secret: process.env.SOME_OTHER_PLAINTEXT_PASSWORD,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));


//username and password




app.engine('hbs',  hbs.engine);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(controllers);
app.use(views);


// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
.then(() => 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
}));
