const Joi = require("joi");
const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    minlength: 5
  },
  createdby: {
    type: String,
    required: true
  },
  assignedto: {
    type: String
  },
  status: {
    type: String
  },
  createdon: {
    type: Date,
    default: Date.now()
  },
  updatedon: {
    type: Date,
    default: Date.now()
  },
  state: {
    type: String,
    default: "open"
  }
});

const Post = mongoose.model("Post", postsSchema);

function validatePost(post) {
  const schema = {
    title: Joi.string().required(),
    text: Joi.string()
      .min(5)
      .required(),
    createdby: Joi.string().required(),
    assignedto: Joi.string().allow(""),
    status: Joi.string().allow("")
  };

  return Joi.validate(post, schema);
}
function validateUpdate(post) {
  const schema = {
    _id: Joi.objectId(),
    title: Joi.string().allow(""),
    text: Joi.string()
      .min(5)
      .allow(""),
    createdby: Joi.string().allow(""),
    assignedto: Joi.string().allow(""),
    status: Joi.string().allow(""),
    state: Joi.string()
      .valid("open", "closed")
      .allow("")
  };

  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
exports.validateUpdate = validateUpdate;
