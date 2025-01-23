const blogsSchema = require("../models/blogsSchema");

const votingAuthorization = async (req, res, next) => {
  try {
    const data = await blogsSchema.findById(req.params.id);
    const dataFind = data.votes.findIndex((obj) => obj == req.id);

    if (dataFind == -1) {
      next();
    } else {
      res.status(400).json({
        status: "failed",
        message: "person can like/dislike one at a time",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "person can like/dislike one at a time",
    });
  }
};


module.exports = votingAuthorization;