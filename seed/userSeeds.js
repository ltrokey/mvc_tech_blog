const { User } = require("../models");

const userData = [
  {
    username: "ByteBender83",
    password: "password1",
    created_at: new Date(),
  },
  {
    username: "QuantumCoder21",
    password: "password2",
    created_at: new Date(),
  },
  {
    username: "TechSavvyGeek",
    password: "password3",
    created_at: new Date(),
  },
  {
    username: "CyberNinjaX",
    password: "password4",
    created_at: new Date(),
  },
  {
    username: "CodeCraftMaster",
    password: "password5",
    created_at: new Date(),
  },
  {
    username: "PixelPioneer99",
    password: "password6",
    created_at: new Date(),
  },
  {
    username: "RoboGuruTech",
    password: "password7",
    created_at: new Date(),
  },
  {
    username: "DataDynamo47",
    password: "password8",
    created_at: new Date(),
  },
  {
    username: "NeuralNetNinja",
    password: "password9",
    created_at: new Date(),
  },
  {
    username: "TechWhizKid22",
    password: "password10",
    created_at: new Date(),
  },
];

const seedUsers = async () => {
  try {
    await User.bulkCreate(userData);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error during users seeding:", error);
  }
};

module.exports = seedUsers;
