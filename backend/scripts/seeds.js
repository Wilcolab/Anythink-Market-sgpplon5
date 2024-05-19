require('../models/User');
require('../models/Item');
require('../models/Comment');
var mongoose = require('mongoose');
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");
var User = mongoose.model("User");

mongoose.connect(process.env.MONGODB_URI);

let userId;
let itemId; 

async function seedDatabase() {
    const users = Array.from(Array(100)).map((_item, i) => ({
        username:`deneme${i}`,
        email: `deneme${i}@anythinks.com`,
        bio: `test`,
        role: 'user',
    }))

    for(let user of users){
        const u = new User(user);
        const dbItem = await u.save();
        if(!userId){
            userId = dbItem._id;
        }
    }

    const items = Array.from(Array(100)).map((_item, i) => ({
        slug: `testSlug${i}`,
        title: `test item${i}`,
        description: `test`,
        seller: userId,
    }))

    for(let item of items){
        const i = new Item(item);
        const dbItem = await i.save();
        if(!itemId){
            itemId = dbItem._id;
        }
    }
    
    const comments = Array.from(Array(100)).map((_item,i) => ({
        body: `test comment`,
        seller: userId,
        item: itemId 
    }))

    for(let comment of comments){
        const c = new Comment(comment);
        const dbItem = await c.save();
    }

}

seedDatabase().then(()=>{
    process.exit();
}).catch((err) => {
    console.log(err);
    process.exit();
})