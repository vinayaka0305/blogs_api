const blogsSchema = require("../models/blogsSchema");

const createBlogs = async (req, res) => {
  try {
    const data = await new blogsSchema({
      title: req.body.title,
      description: req.body.description,
      user: req._id,
      created: req.created,
      comments: req.body.comments ? req.body.comments : [],
    });
    const result = await data.save();
    res.status(201).json({
      status: "success",
      message: "created blog",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const retrieveblogs = async (req, res) => {
  try {
    const result = await blogsSchema.find();
    res.status(200).json({
      status: "success",
      message: "fetched all blogs",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const data = await blogsSchema.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(401).json({
        status: "failed",
        messgage: "user not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        messgage: "deleted blog",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messgage: error.message,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const data = await blogsSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(401).json({
        status: "failed",
        messgage: "user not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        messgage: "updated the blog",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messgage: error.message,
    });
  }
};

const updateBlogsByVotes = async (req, res) => {
  try {
    const result = await blogsSchema.findById(req.params.id);
    if (req.body.vote) {
      result.upvote++;
    } else {
      result.downvote++;
    }
    // console.log(result,"result")
    console.log(req.id,"id");
    result.votes.push(req.id);
    const updateByVote = await blogsSchema.findByIdAndUpdate(
      req.params.id,
      result,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      messgage: "upvote/downvote updated successfully",
      updateByVote,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messgage: error.message,
    });
  }
};

const updateBlogComments = async(req,res)=>{
  try {
    const data = await blogsSchema.findById(req.params.id);
    data.comments.push(req.body.comments);
    const updateComments = await blogsSchema.findByIdAndUpdate(req.params.id,data,{new:true});
    res.status(200).json({
      status: "success",
      messgage: "comments updated successfully",
      updateComments,
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      messgage: error.message,
    });
  }
}
module.exports = {
  createBlogs,
  updateBlogsByVotes,
  retrieveblogs,
  deleteById,
  updateById,
  updateBlogComments
};
