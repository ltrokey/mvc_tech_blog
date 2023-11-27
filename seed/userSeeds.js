const { User } = require("../models");
const bcrypt = require("bcrypt");

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

// Convert all usernames to lowercase
const userDataLowercase = userData.map((user) => ({
  ...user,
  username: user.username.toLowerCase(),
}));

const seedUsers = async () => {
  try {
    const usersWithHashedPasswords = await Promise.all(
      userDataLowercase.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await User.bulkCreate(usersWithHashedPasswords);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error during users seeding:", error);
  }
};

module.exports = seedUsers;
