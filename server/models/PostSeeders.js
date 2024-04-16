const mongoose = require('mongoose');
const faker = require('faker');
const UserModel = require('./User'); 
const PostModel = require('./Post'); 


mongoose.connect("mongodb+srv://rachelaranjo:Lancasteruniversity.17@cluster0.8jvshet.mongodb.net/recipe");

const generateFakeEngagement = async () => {
    const posts = await PostModel.find(); 
    const users = await UserModel.find(); 

    for (const post of posts) {
        
        const likeCount = faker.datatype.number({ min: 0, max: 50 });
        const likedByUsers = faker.helpers.uniqueArray(users, likeCount).map(user => user._id);
        post.likes = [...new Set([...post.likes, ...likedByUsers])]; 

        
        const reviewCount = faker.datatype.number({ min: 0, max: 10 });
        for (let i = 0; i < reviewCount; i++) {
            const user = faker.random.arrayElement(users);
            post.reviews.push({
                reviewText: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 3 })),
                user: user._id,
                rating: faker.datatype.number({ min: 1, max: 5 })
            });
        }

        await post.save();
    }

    console.log(`Added fake engagement data to ${posts.length} posts.`);
};
generateFakeEngagement().then(() => {
    console.log('Successfully generated fake engagement data for posts.');
    mongoose.disconnect();
}).catch(err => {
    console.error('Failed to generate fake engagement data:', err);
    mongoose.disconnect();
});