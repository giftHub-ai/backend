const user2 = require('../models/recevireScehma')
const user = require('../models/userAuthSchema')
const validator = require('validator')



exports.addToDatabase = async (req, res) => {
    try {
        const { SenderName, SenderEmail, RecipientEmail, Gift, Link, ImageLink } = req.body;

        console.log(SenderName);
        if (!SenderName ||!SenderEmail || !RecipientEmail || !Gift || !Link || !ImageLink) {
           return res.status(400).json("All field are required")
        }
        if (!validator.isEmail(RecipientEmail)) {
           return  res.status(400).json("Email should be valid")
        }
      
        const name = SenderName;
        const senderEmail = SenderEmail;
        const recevierEmail = RecipientEmail;
        const giftName = Gift;
        const giftLink = Link;
        const giftImage = ImageLink;

       let User = new user2({name, senderEmail,recevierEmail,giftName,giftLink,giftImage })

        await User.save();


        res.status(200).json("User added")




    } catch (error) {
        console.log(error);
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





