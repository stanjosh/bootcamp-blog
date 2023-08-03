const blogSeeds = require('./blog-seeds');
const userSeeds = require('./user-seeds');
const commentSeeds = require('./comment-seeds');
const sequelize = require('../../config/connection');
const { User, BlogPost, Comment } = require('../');

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')
    
  await userSeeds()
  console.log('\n----- USERS SEEDED -----\n')

  const randomUserIDs = async () => {
    let users = await User.findAll()
    users = users.map(user => user.get({ plain: true }))
    .map(user => user.id);
    users.sort((a, b) => a - Math.random() * (a - b))
    return users
  }

  const userIDs = await randomUserIDs();

  await blogSeeds(userIDs)
  console.log('\n----- BLOG POSTS SEEDED -----\n')

  const randomBlogIDs = async () => {
    let blogs = await BlogPost.findAll()
    blogs = blogs.map(blog => blog.get({ plain: true }))
    .map(blog => blog.id);
    blogs.sort((a, b) => a - Math.random() * (a - b))
    return blogs
  }

  const blogIDs = await randomBlogIDs();

  await commentSeeds(blogIDs, userIDs)
  console.log('\n----- COMMENTS SEEDED -----\n')

  



  process.exit(0);
};



seedAll();
