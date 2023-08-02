const blogSeeds = require('./blog-seeds');
const userSeeds = require('./user-seeds');
const commentSeeds = require('./comment-seeds');
const sequelize = require('../../config/connection');


const seedAll = async () => {
  await sequelize.sync({ force: true });
  


  
  console.log('\n----- DATABASE SYNCED -----\n');
  await userSeeds();
  console.log('\n----- USERS SEEDED -----\n');

  await blogSeeds();
  console.log('\n----- BLOG POSTS SEEDED -----\n');

  await commentSeeds();
  console.log('\n----- COMMENTS SEEDED -----\n');


  process.exit(0);
};

seedAll();
