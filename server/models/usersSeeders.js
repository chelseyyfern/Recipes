// usersSeeders.js

const mongoose = require('mongoose');
const faker = require('faker');
const UsersModel = require('./users'); 

mongoose.connect("mongodb+srv://rachelaranjo:Lancasteruniversity.17@cluster0.8jvshet.mongodb.net/recipe");


const generateFakeUser = async (existingUsers) => {
    const numFollowers = faker.datatype.number({ min: 0, max: 10 });
    const numFollowing = faker.datatype.number({ min: 0, max: 10 });

    
    existingUsers = existingUsers || [];

   
    const followers = Array.from({ length: numFollowers }, () => faker.random.arrayElement(existingUsers));
    const following = Array.from({ length: numFollowing }, () => faker.random.arrayElement(existingUsers));


    
    const uniqueFollowers = Array.from(new Set(followers.map(user => user ? user._id : null).filter(id => id)));
    const uniqueFollowing = Array.from(new Set(following.map(user => user ? user._id : null).filter(id => id)));

    const pfp = `https://picsum.photos/100/100?random=${Math.random()}`;

    
    const newUser = new UsersModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        pfp: pfp,
        createdAt: faker.date.past(),
        followers: uniqueFollowers,
        following: uniqueFollowing,
    });


    await newUser.save();

  
    for (const existingUser of existingUsers) {
        
        if (uniqueFollowers.includes(existingUser._id) && !existingUser.following.includes(newUser._id)) {
            existingUser.following.push(newUser._id);
            await existingUser.save();
        }
        
        if (uniqueFollowing.includes(existingUser._id) && !existingUser.followers.includes(newUser._id)) {
            existingUser.followers.push(newUser._id);
            await existingUser.save();
        }
    }

    
    await Promise.all(existingUsers.map(async (user) => {
        console.log(`${user.username} has ${user.followers.length} followers.`);
        
       
        if (user.followers.length > 5 && !user.achievements.includes('popular')) {
            
            user.achievements.push('popular');
            await user.save();
        }
    }));

    return newUser;
};

const seedFakeUsers = async (numUsers) => {
    try {
 
        const existingUsers = await UsersModel.find();

        for (let i = 0; i < numUsers; i++) {
            await generateFakeUser(existingUsers.slice()); // Clone existingUsers array
        }

        console.log(`${numUsers} fake users inserted successfully with followers/following relationships.`);
    } catch (error) {
        console.error('Error inserting fake users:', error);
    } finally {
        mongoose.disconnect();
    }
};


seedFakeUsers(14);