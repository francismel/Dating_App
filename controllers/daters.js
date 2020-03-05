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
  postOwnComment,
  postOtherComment,
  home,
  deleteComment,
  seeAllMembers,
  loadPage,
  setUpMessage,
  sendMessage,
  showAllMessages,
  imageTest,
  messagePage,
  basicsEdit,
};

function imageTest(req,res,next){

  res.render('daters/imageTest');

}


function showAllMessages(req,res,next){

  Dater.findById(req.user._id,function(error,currUser){
    Dater.findById(req.params.id,function(error,otherUser){
      let messagesToShow = [];

      currUser.messages.forEach(message =>{
          if(message.to === otherUser.name || message.from === otherUser.name){
            messagesToShow.push(message);
          }
      })
      res.render('daters/messages',{ currUser: currUser, otherUser: otherUser, messagesToShow: messagesToShow});
    });
    
  });
}


function index(req, res, next) {
   let user = req.user;
  if(!user){
    res.render('daters/signInPage');
  }else if(user.registered === 0){
    res.render('daters/newAccount',{user});
  }else{
    res.redirect('/daters/home');
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

function loadPage(req,res,next){

  if(req.params.id === req.user.id){
    res.redirect('/daters/home');
  }else{

    Dater.findById(req.params.id,function(error,personImStalking){
      Dater.findById(req.user.id,function(error,currUser){
        res.render('daters/viewProfile',{personImStalking:personImStalking,userName: currUser.name, messageSent:0});
      });
    });

  }

}
function sendMessage(req,res,next){

  Dater.findById(req.user._id,function(error,messageSender){
    console.log("the sender is ",messageSender.name);

    Dater.findById(req.params.id,function(error, messageReciever){
      console.log("the reciever is ",messageReciever.name);
      console.log("the content is ",req.body.content);

      let message = {
        to: messageReciever.name,
        from: messageSender.name,
        content: req.body.content,
        date: new Date(),
      }
      messageReciever.messages.push(message);
      messageReciever.save();

      messageSender.messages.push(message);
      messageSender.save();
      
      res.render('daters/viewProfile',{personImStalking:messageReciever,userName: messageSender.name, messageSent: 1});
      
    })

  });
}




function messagePage(req,res,next){

  Dater.findById(req.user._id,function(error,messageSender){
    console.log("Page user is",messageSender.name);

    Dater.findById(req.params.id,function(error, messageReciever){
      console.log("the page reciever is ",messageReciever.name);
      console.log("the page content is ",req.body.content);

      let message = {
        to: messageReciever.name,
        from: messageSender.name,
        content: req.body.content,
        date: new Date(),
      }
      messageReciever.messages.push(message);
      messageReciever.save();

      messageSender.messages.push(message);
      messageSender.save();
      
      res.redirect('/daters/show/messages/'+req.params.id);
      
    })

  });
}


function setUpMessage(req,res,next){
  
}

function seeAllMembers(req,res,next){

  Dater.find({},function(error,allDaters){

    Dater.findById(req.user.id,function(error,currUser){
      let yourId = currUser._id;
      res.render('daters/allMembers',{allDaters:allDaters,yourId: yourId, yourInterests: currUser.interestedIn, yourName:currUser.name})
      });
    })
}


function postOwnComment(req,res,next){

  Dater.findById(req.user._id,function(error,poster){
    let posterName = poster.name;

    let commentInfo = {
      content:req.body.comment,
      from:posterName,
      date: new Date(),
    }

    Dater.findById(req.user.id,function(error,reciever){
      reciever.comments.push(commentInfo);
      reciever.save();
      console.log(posterName+" just pushed "+commentInfo.content+" to "+reciever.name);
      res.redirect('/daters/home');
    });

  });
}


function postOtherComment(req,res,next){

  Dater.findById(req.user._id,function(error,poster){
    let posterName = poster.name;

    let commentInfo = {
      content:req.body.comment,
      from:posterName,
      date: new Date(),
    }

    Dater.findById(req.params.id,function(error,reciever){
      reciever.comments.push(commentInfo);
      reciever.save();
      console.log(posterName+" just pushed "+commentInfo.content+" to "+reciever.name);
      res.render('daters/viewProfile',{personImStalking:reciever,userName: posterName, messageSent:0});
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

  res.render('daters/newBasicsExperiment');
}


function basicsEdit(req,res,next){
  console.log('basics edit');

  res.render('daters/newBasicsEdit');
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

  Dater.find({},function(error,allDaters){
    Dater.findById(req.user.id,function(error,currUser){
      allDaters.forEach(currProspect =>{
        compatibiltyCalculator(currUser,currProspect);
      });
      res.render('daters/home',{currUser});
    })
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

      let compatibility = (250 - (250/60)*ageDiff) + (250 - (250/9)*extrovertDiff) + 
      (Math.min(3,musicIntersection)*50) + (50 - (50/9)*messDiff) + 
      100*bookDiff + 100*locDiff + 100*tayDiff;

      let finalCompatibility = compatibility/1000; 

      currProspect.compatibilityToCurrUser = finalCompatibility;
      currProspect.save(function (err) {
        if (err) console.log('saved');
        
      });
      
  }
  







