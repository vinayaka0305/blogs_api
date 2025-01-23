const blogsSchema = require("../models/blogsSchema");

const authorization = async (req, res, next) => {
  try {
    const data = await blogsSchema.findById(req.params.id);
    console.log(data);
    if (data.user === req.id) {
      next();
    } else {
      res.status(401).json({
        status: "failed",
        message:
          "authorization failed,current user don't have access to delete the data",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "current user don't have access to delete the data",
    });
  }
};

module.exports = authorization;
