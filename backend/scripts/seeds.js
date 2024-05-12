//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require("mongoose");
const connection = process.env.MONGODB_URI;

mongoose.connect(connection);

const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");

const users = []

for(let i = 0; i<100; i++){
    let newUser = {
        username : `user${i}`,
        email: `user${i}@gmail.com`,
        bio: "Hi! I'm new user.",
    }
    users.push(newUser);
}

const seedDB = async () => {
    await User.insertMany(users);

    for (let user of users) {
    let newItem = new Item({
      slug: `slug${user._id}`,
      title: `title ${i}`,
      description: `description ${i}`,
      seller: user._id,
    });
    await newItem.save();

    // Add item to user's items array
    user.items.push(newItem._id);
    await user.save();

    // Create comments for each item
    for (let i = 0; i < 10; i++) {
      let newComment = new Comment({
        body: `This is comment`,
        seller: user._id,
        item: newItem._id,
      });
      await newComment.save();

      // Add comment to item's comments array
      newItem.comments.push(newComment._id);
      await newItem.save();
    }
  }
};

seedDB()
  .then(() => {
  console.log("Finished DB seeding");
  process.exit(0);
})
.catch((err) => {
  console.log(`Error while running DB seed: ${err.message}`);
  process.exit(1);
});