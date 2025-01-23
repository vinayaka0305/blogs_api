const mongoose=require("mongoose");

const blogsSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    user:{type:String},
    created:{type:String},
    comments:{type:Array},
    votes:{type:Array},
    upvote:{type:Number,default:0,required:true},
    downvote:{type:Number,default:0,require:true}
})

module.exports = mongoose.model("blog",blogsSchema);