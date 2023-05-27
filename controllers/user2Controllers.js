const user2 = require('../models/recevireScehma')
const user = require('../models/userAuthSchema')
const validator = require('validator')



exports.addToDatabase = async (req, res) => {
    try {
        const { name, senderEmail, recevierEmail, giftName, giftLink, giftImage } = req.body;


        if (!senderEmail || !recevierEmail || !giftName || !giftLink || !giftImage) {
           return res.status(400).json("All field are required")
        }
        if (!validator.isEmail(recevierEmail)) {
           return  res.status(400).json("Email should be valid")
        }
      

       let User = new user2({name, senderEmail,recevierEmail,giftName,giftLink,giftImage })

        await User.save();


        res.status(200).json("User added")




    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getAllGift = async (req, res) => {
    try {
        const id = req.params._id;
  
        let User = await user.findById(id)

        let Data = await user2.find({"recevierEmail":User.email})

       
        res.status(200).json(Data)


    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }



}





