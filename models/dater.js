const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  from: String,
  content: String,
  date: Date,
})

const daterSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: {type:String,enum: ['Male','Female','Other']},
  googleId: String,
  interestedIn: { type: [String], enum: ['Men','Women','Other']},
  location: { type: String, enum: ['DT Los Angeles','Denver','Santa Monica']},
  messyness: {type:Number, min: 1, max:10},
  extroverted: {type:Number, min: 1, max:10},
  book:Boolean,
  taylorSwift: {type:Number, min: 1, max:3},
  dogs: {type: String, enum: ['dogs','cats']},
  bio:{type: String, minLength:0, maxLength:300},
  musicalGenres: {
    type: [String],  
    enum: ["Rap", "Hip-Hop", "Classical", "Rock-n-Roll","R&B",
    "Country", "Reggae", "Jazz", "Heavy Metal","Alternative"],
  },
  comments: [commentSchema],

  profilePic: {type: String},
  registered: {type: Number, min:0, max:1},

},{
    timestamps: true
  });

module.exports = mongoose.model('Dater', daterSchema);