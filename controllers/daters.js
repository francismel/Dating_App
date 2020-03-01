const Dater = require('../models/dater');

module.exports = {
  index,
  create,
  getLightning,
  postLightningQuestions,
  personal,
  
  basics,
};



function index(req, res, next) {
  let user = {
    user: req.user,
    name: req.query.name,
  }

  res.render('daters/index',{user});

}

function basics(req,res,next){

  req.user.interestedIn = req.body.interestedIn;
  req.user.location = req.body.location;
  req.user.gender = req.body.gender;
  req.user.age = req.body.age;
  req.user.profileURL = req.body.profileURL;

  res.redirect('/daters/new/Lightning')

}

function create(req,res,next){

  res.render('daters/newBasics')

}


function getLightning(req,res,next){
  res.render('daters/newLightning')
}

function postLightningQuestions(req,res,next){
  
  if(req.params.id === "music"){
    if(!(req.user.musicalGenres.includes(req.body[req.params.id]))){
      req.user.musicalGenres.push(req.body[req.params.id]);
    }
  }else{
    req.user[req.params.id] = req.body[req.params.id];
  }
  req.user.save()

  
}

function personal(req,res,next){
  res.render('daters/newPersonal')
}




