const { User } = require('../');

const userData = [
  {
    email: 'gorp@gorpy.com',
    author_name: 'Ralph Gorp',
    password: 'password123'
  },
  {
    email: 'me@cake.bum',
    author_name: 'Shoe McGee',
    password: 'password123'
  },
  {
    email: 'john@rugcleaning.net',
    author_name: 'John Johnson',
    password: 'password123'
  },
  {
    email: 'billbill231@yahoo.com',
    author_name: 'bill billson',
    password: 'password123'
  },
  {
    email: 'steve@grillmaster.org',
    author_name: 'Steven Stevenstein',
    password: 'password123'
  },
];

const seedCategories = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedCategories;
