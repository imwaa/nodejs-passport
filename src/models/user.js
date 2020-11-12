const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const userSchema = new Schema ({
    email: String,
    password: String
})

userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10) // gensalt nous permet de chosir combien de fois on veut crypter le mdp (10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password) //true if paswords match, false if not
 }

module.exports =  mongoose.model('user', userSchema)
