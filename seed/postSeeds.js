const { Post } = require("../models")

const postsData = [
    {
      title: 'Tech Trends 2023',
      body: 'Exploring the latest technological advancements shaping the future.',
      user_id: 1,
    },
    {
      title: 'JavaScript Best Practices',
      body: 'A comprehensive guide to writing clean and efficient JavaScript code.',
      user_id: 2,
    },
    {
      title: 'The Rise of Artificial Intelligence',
      body: 'Examining the impact of AI on various industries and everyday life.',
      user_id: 3,
    },
    {
      title: 'Web Development Frameworks Comparison',
      body: 'A detailed analysis of popular web development frameworks and their strengths.',
      user_id: 4,
    },
    {
      title: 'Cybersecurity Essentials for Businesses',
      body: 'Protecting your organization from online threats and data breaches.',
      user_id: 5,
    },
    {
      title: 'Digital Marketing Strategies in 2023',
      body: 'Strategies and tactics to boost your online presence and engage your audience.',
      user_id: 6,
    },
    {
      title: 'The Future of Virtual Reality',
      body: 'Exploring the potential of VR technology and its applications in various fields.',
      user_id: 7,
    },
    {
      title: 'Data Science and Machine Learning in Healthcare',
      body: 'How data science and ML are revolutionizing healthcare and medical research.',
      user_id: 8,
    },
    {
      title: 'Game Development Tips and Tricks',
      body: 'Insights into game development techniques for both beginners and experienced developers.',
      user_id: 9,
    },
    {
      title: 'Blockchain and Cryptocurrencies Unveiled',
      body: 'Understanding the fundamentals and potential of blockchain technology and cryptocurrencies.',
      user_id: 10,
    },
    {
      title: 'The Art of UI/UX Design',
      body: 'Crafting user-friendly and visually appealing interfaces for digital products.',
      user_id: 1,
    },
    {
      title: 'Cloud Computing Advancements',
      body: 'Exploring the latest trends and innovations in cloud computing services.',
      user_id: 2,
    },
    {
      title: 'The Evolution of Mobile App Development',
      body: 'A journey through the history and evolution of mobile app development.',
      user_id: 3,
    },
    {
      title: 'E-commerce Strategies for Success',
      body: 'Tips and strategies to build and grow a successful e-commerce business.',
      user_id: 4,
    },
    {
      title: 'Artificial Intelligence in Finance',
      body: 'Analyzing the role of AI in shaping the future of the financial industry.',
      user_id: 5,
    },
  ];

  const seedPosts = async () => {
    try {
        await Post.bulkCreate(postsData);
        console.log('Posts seeded successfully!');
    } catch (error) {
        console.error('Error during post seeding:', error);
    }
};

  module.exports = seedPosts;