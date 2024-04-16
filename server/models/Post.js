// post.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    caption: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [{ type: String }], 
    keywords: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }], 
    reviews: [{
      reviewText: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
      
    }], 
    
    ratings: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      rating: { type: Number, default: 0, min: 0, max: 5 }
    }], 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;