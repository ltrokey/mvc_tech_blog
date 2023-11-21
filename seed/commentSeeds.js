const { Comment } = require("../models")

const CommentsData = [
    {
      text: 'Great insights! Looking forward to more content like this.',
      user_id: 8,
      post_id: 1,
    },
    {
      text: 'I learned a lot from this. Thanks for sharing!',
      user_id: 10,
      post_id: 2,
    },
    {
      text: 'This is fascinating. How do you see these trends evolving in the next few years?',
      user_id: 6,
      post_id: 3,
    },
    {
      text: 'Have you considered the security implications of these frameworks?',
      user_id: 1,
      post_id: 4,
    },
    {
      text: 'Really appreciate the tips for boosting online presence. Will definitely try them out.',
      user_id: 3,
      post_id: 5,
    },
    {
      text: 'Do you think VR will become mainstream soon?',
      user_id: 7,
      post_id: 6,
    },
    {
      text: 'The potential in healthcare is immense. Exciting times ahead!',
      user_id: 5,
      post_id: 7,
    },
    {
      text: 'As a game developer, these tips are gold. Thanks for sharing your expertise!',
      user_id: 9,
      post_id: 8,
    },
    {
      text: 'Blockchain has the power to transform many industries. What are your thoughts on its future?',
      user_id: 2,
      post_id: 9,
    },
    {
      text: 'User experience is crucial. Do you have any specific tools or practices you recommend for UI/UX design?',
      user_id: 4,
      post_id: 10,
    },
  ];

  const seedComments = async () => {
    try {
        await Comment.bulkCreate(CommentsData);
        console.log('Comments seeded successfully!');
    } catch (error) {
        console.error('Error during comment seeding:', error);
    }
};

  module.exports = seedComments;