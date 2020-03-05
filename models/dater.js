const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  from: String,
  content: String,
  date: Date,
})
const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  content: String,
  date: Date,
})

const daterSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: {type:String,enum: ['Male','Female','Other']},
  googleId: String,
  interestedIn: { type: [String], enum: ['Male','Female','Other']},
  location: { type: String, enum: ['DT Los Angeles','Denver','Santa Monica','San Diego','Austin','Dallas']},
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
  messages: [messageSchema],
  profilePic: {type: String, default: ''},
  registered: {type: Number, min:0, max:1},
  compatibilityToCurrUser: {type: Number},

},{
    timestamps: true
  });

module.exports = mongoose.model('Dater', daterSchema);