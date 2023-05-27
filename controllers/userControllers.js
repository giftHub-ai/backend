const user = require("../models/userAuthSchema")
const validator = require('validator')



exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
      

        if (!email || !name || !password) {
           return  res.status(400).json("All field are required")
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json("Email should be valid")
        }
        let User = await user.findOne({email});
        if (User) {
           return  res.status(400).json({ "message": "User alerdy exist" })
        }

        User = new user({ name, email, password })

        await User.save();

        const token = await User.getJWTToken()

        res.status(200).json({ "token": token,"User":User })




    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        if (!email || !password) {
           return  res.status(400).json("All field are required")
        }
        let User = await user.findOne({ email })

        if (!User) {
            return res.status(400).json("No user exist")
        }
        const isMatch = await User.matchPassword(password);

        if (!isMatch) {
           return  res.status(400).json("Invalid Creditails")
        }

        
        const token = await User.getJWTToken()
        res.status(200).json({ "user": User, "token": token })


    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }



}



