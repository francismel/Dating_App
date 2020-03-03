var array = require('lodash/array');
var object = require('lodash/fp/object');
const Dater = require('../models/dater');


module.exports = {
  index,
  create,
  getLightning,
  postLightningQuestions,
  personal,
  basics,
  postComment,
  home,
  deleteComment,
};



function index(req, res, next) {
   let user = req.user;
  if(!user){
    res.render('daters/signInPage');
  }else if(user.registered === 0){
    res.render('daters/newAccount',{user});
  }else{
    res.render('daters/welcomeBack',{user});
  }
} 

function basics(req,res,next){

  Dater.findById(req.user._id,function(error,currUser){
    currUser.interestedIn = req.body.interestedIn;
    currUser.location = req.body.location;
    currUser.gender = req.body.gender;
    currUser.age = req.body.age;
    currUser.registered = 1;
    currUser.save();
  });


  res.redirect('/daters/new/Lightning')

}

function postComment(req,res,next){

  Dater.findById(req.user._id,function(error,poster){
    let posterName = poster.name;

    let commentInfo = {
      content:req.body.comment,
      from:posterName,
      date: new Date(),
    }

    Dater.findById(req.user._id,function(error,reciever){
      reciever.comments.push(commentInfo);
      reciever.save();
      console.log(posterName+" just pushed "+commentInfo.content+" to "+reciever.name);
      res.redirect('/daters/home');
    });

  });
}

function deleteComment(req,res,next){


  console.log("this is the comment id 2 delete ",req.params.id);
  console.log("this is the id of the current user ",req.user.id);
  Dater.findById(req.user._id,function(error,currUser){
    currUser.comments.pull({_id: req.params.id});
    currUser.save();
    console.log(" i think i just deleted comment ",req.params.id);
    console.log("from person ",req.user.id);
    res.redirect('/daters/home');
  });
};


    

  

function create(req,res,next){


  res.render('daters/newBasicsExperiment')

}


function getLightning(req,res,next){
  res.render('daters/newLightning')
}

function postLightningQuestions(req,res,next){

  Dater.findById(req.user._id,function(error,currUser){

    if(req.params.id === "music"){
      if(!(currUser.musicalGenres.includes(req.body[req.params.id]))){
        currUser.musicalGenres.push(req.body[req.params.id]);
      }
    }else{
          currUser[req.params.id] = req.body[req.params.id];
    }
    console.log("here is the currUser",currUser);
    currUser.save();

    if(req.params.id === "bio"){  

      res.redirect('/daters/home');
    }
  });
  
  
}

function personal(req,res,next){
  res.render('daters/newPersonal')
}
function profilePic(req,res,next){

}

function home(req,res,next){

  Dater.findById(req.user._id,function(error,currUser){

    res.render('daters/home',{currUser});
  });
  
}

function compatibiltyCalculator(currDater,currProspect){
  
  let ageDiff = Math.abs(currDater.age - currProspect.age);
  let extrovertDiff = Math.abs(currDater.extroverted - currProspect.extroverted);
  let musicIntersection = Math.min(3,array.intersection(currDater.musicalGenres,currProspect.musicalGenres).length);
  let messDiff = Math.abs(currDater.messyness - currProspect.messyness);
  let bookDiff = currDater.book === currProspect.book;
  let locDiff = currDater.location === currProspect.location;
  let tayDiff = currDater.taylorSwift === currProspect.taylorSwift;

  
  let compatibility = (250 - (250/60)*ageDiff) + (200 - (200/9)*extrovertDiff) + 
      (Math.min(3,musicIntersection)*50) + (100 - (100/9)*messDiff) + 
      100*bookDiff + 100*locDiff + 100*tayDiff;
  return compatibility/1000; 
 
}





