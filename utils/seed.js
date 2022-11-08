const connection = require("../config/connection");
const { Thought, User, Reaction } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  await Reaction.deleteMany({});

  const user1 = await User.create({
    "username": "Joe",
    "email": "joe@gmail.com",
  });

  const user2 = await User.create({
    "username": "Tarek",
    "email": "tarek@gmail.com",
  });

  const thought1 = await Thought.create({
    "thoughtText": "Testing from Joe",
    "username": user1,
  });

  const thought2 = await Thought.create({
    "thoughtText": "Testing from Tarek",
    "username": user2,
  });

  await User.findOneAndUpdate(
    { _id: user1._id },
    { $push: { thoughts: thought1._id, friends: user2._id } },
    { new: true }
  );

  const reaction1 = await Reaction.create({
    "reactionBody": "This is my reaction",
    "username": user2,
  });

  await Thought.findOneAndUpdate(
    { _id: thought1._id },
    { $push: { reactions: reaction1._id } },
    { new: true }
  );

  // Log out the seed data to indicate what should appear in the database
  // console.table();
  console.info("Seeding complete! 🌱");
});
