const { User } = require('../models');

const userData = [
  {
    email: 'gorp@gorpy.com',
    author_name: 'Ralph Gorp',
    password: '$2a$12$gLnDmzH.37hg94T4TgZcjuCEMa909p8L8M3p9qqHQms9GyNJ4zfNy'
  },
  {
    email: 'me@cake.bum',
    author_name: 'Shoe McGee',
    password: '$2a$12$gLnDmzH.37hg94T4TgZcjuCEMa909p8L8M3p9qqHQms9GyNJ4zfNy'
  },
  {
    email: 'john@rugcleaning.net',
    author_name: 'John Johnson',
    password: '$2a$12$gLnDmzH.37hg94T4TgZcjuCEMa909p8L8M3p9qqHQms9GyNJ4zfNy'
  },
  {
    email: 'billbill231@yahoo.com',
    author_name: 'bill billson',
    password: '$2a$12$gLnDmzH.37hg94T4TgZcjuCEMa909p8L8M3p9qqHQms9GyNJ4zfNy'
  },
  {
    email: 'steve@grillmaster.org',
    author_name: 'Steven Stevenstein',
    password: '$2a$12$gLnDmzH.37hg94T4TgZcjuCEMa909p8L8M3p9qqHQms9GyNJ4zfNy'
  },
];

const seedCategories = () => User.bulkCreate(userData);

module.exports = seedCategories;
