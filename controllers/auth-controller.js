const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Registration Logic
const home = async (req, res)=> {
  try {
    res.status(202).send("This is the router code");
  } catch (error) {
    console.error(error);
  }
};

const register = async (req, res)=> {
  try {
    //console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({email});

    if(userExist) return res.status(400).json ({message: "Email already exist"});
   

    const userCreated = await User.create({username, email, phone, password,});

    res.status(201).json({message: "Registration Successful", 
      token: await userCreated.generateToken(), 
      userId: userCreated._id.toString()});
  } catch (error) {
    //res.status(400).json({message:"Error: Internal Server Error"});
    next(error);
  }
};




// Login Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({email});

    if(!userExist) return res.status(600).json({message:"Invalid Credaintials"});

    //const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
      message: "Login Successful", 
      token: await userExist.generateToken(), 
      userId: userExist._id.toString()
      });
    } else {
      res.status(401).json({message: "Invalid Email or Password"});
    }

  } catch (error) {
    res.status(500).json({message:"Error: Internal Server Error"});
  }
}

module.exports = { home, register, login };