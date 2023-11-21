const seedUsers = require("./userSeeds");
const seedPosts = require("./postSeeds");
const seedComments = require("./commentSeeds");

const sequelize = require("../config/connection");

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n---- Database Synced----\n");

    await seedUsers();
    console.log("\n---- Added Users----\n");

    await seedPosts();
    console.log("\n---- Added Posts----\n");

    await seedComments();
    console.log("\n---- Added Comments----\n");

    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedData();
