const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcriypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Name can\'t be empty'
        },
        email: {
            type: String,
            required: 'Email can\'t be empty',
            unique: true
        },
        password: {
            type: String,
            minLength: [4,'password must be at least 4 character long'],
            required: 'password can\'t be empty'
        },
    }
);

userSchema.methods.verifyPassword = function(password){
  return bcriypt.compareSync(password,this.password);
};

userSchema.methods.generateJwt = function(){
    return jwt.sign({_id:this._id , name: this.name },
        'SECRET#123',
        {
            expiresIn: "2m"
        }
    );
};

module.exports = mongoose.model('User', userSchema);
