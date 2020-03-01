const mongoose = require('mongoose');



const daterSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: {
    type:String,
    enum: ['Male','Female','Other'],
    
  },
  googleId: String,
  interestedIn: { type: String, enum: ['Male','Female','Other']},
  profileURL: String,
  location: { type: String, enum: ['DT Los Angeles','Denver','Santa Monica']},
  messyness: {type:Number, min: 1, max:10},
  introvert: {type:Number, min: 1, max:10},
  book:Boolean,
  taylorSwift: {type:Number, min: 1, max:3},
  dogs: {type: String, enum: ['dogs','cats']},
  bio:{type: String, minLength:0, maxLength:300},
  musicalGenres: {
    type: [String],  
    enum: ["Rap", "Hip-Hop", "Classical", "Rock-n-Roll","R&B","Country", "Reggae", "Jazz", "Heavy Metal","Alternative"],
  },
},{
    timestamps: true
  });


module.exports = mongoose.model('Dater', daterSchema);