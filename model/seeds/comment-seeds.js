const { Comment } = require('../');

const commentData = [
  {
    user_id: 1,
    blogpost_id: 3,
    comment_content: 'Neat!',

  },
  {
    user_id: 2,
    blogpost_id: 2,
    comment_content: 'Cool post.',

  },
  {
    user_id: 5,
    blogpost_id: 5,
    comment_content: 'Imagine the smell!',

  },
  {
    user_id: 3,
    blogpost_id: 4,
    comment_content: 'Here is a comment!',

  },
  {
    user_id: 1,
    blogpost_id: 3,
    comment_content: 'Wow!',

  },
  {
    user_id: 1,
    blogpost_id: 2,
    comment_content: 'It do be like that sometimes.',

  },
  { 
    user_id: 3,
    blogpost_id: 4,
    comment_content: 'Gold, Jerry! Gold!',

  },
  {
    user_id: 2,
    blogpost_id: 3,
    comment_content: "That's a spicy meatball!",

  },
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;
