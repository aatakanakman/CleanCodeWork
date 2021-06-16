const User = require('../models/User')
const bcrypt = require('bcrypt');



exports.createUser = async (req, res) => {

 
    
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status : "success",
            user
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        })
    }
}


exports.loginUser = async (req, res) => {

    console.log("object")

    try {
        //requestten gelen email ve pass i alıyoruz.
        const {email , password} = req.body;
        //email yoksa hatayı varsa emaile kayıtlı user ı alıyoruz.
        await User.findOne({email}, (err,user) => {
            //user varsa
            if(user){
                //hashlenmiş olan şifreyi compare ederek eşleşiyorsa  yeni bir user session oluşturuyoruz.
                bcrypt.compare(password,user.password,(err,same)=>{
                        if(same){
                        //USER SESSION
                        res.status(200).send("You are logged in")
                        }else{
                            console.log(err)
                        }
                });
            }
        })

    } catch (err) {
          res.status(400).json({
              status: 'fail',
              err
          })
      }
  }