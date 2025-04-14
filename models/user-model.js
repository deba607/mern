const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});


// Secure the method with the bcryptjs
userSchema.pre("save", async function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
 try {
  const saltRound = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(user.password, saltRound);
  user.password = hash_password;
 } catch (err) {
  return next(err);
  }
  });

  //Compare with password
  userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  // json web token
  userSchema.methods.generateToken = function() {
    try {
      return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.SECRET_KEY, {
        expiresIn: "30d",
        }
    )
      } catch (err) {
        console.log("Error", err);
        }
  };

// Define the model or the collection name

const User = new mongoose.model("User", userSchema);
module.exports = User;