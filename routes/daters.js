var router = require('express').Router();
const Dater = require('../models/dater');
var datersCtrl = require('../controllers/daters');
const multer = require('multer');
require('../config/passport');


const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
    cb(null,new Date().toISOString()+file.originalname)
  }
});

const upload = multer({storage: storage});

// GET /students
router.get('/', datersCtrl.index);
router.get('/new/Basics',datersCtrl.create)
router.get('/home',datersCtrl.home);
router.post('/new/Basics',datersCtrl.basics)
router.get('/new/Lightning',datersCtrl.getLightning)
router.post('/new/:id',datersCtrl.postLightningQuestions)
router.get('/new/Personal',datersCtrl.personal)
router.post('/profilePic',upload.single('profilePic'),(req,res,next) =>{

  Dater.findById(req.user._id,function(error,currUser){
   currUser.profilePic =req.file.path;
    currUser.save();
  });
});
router.get('/comment/delete/:id',datersCtrl.deleteComment);
router.post('/comments',datersCtrl.postOwnComment);
router.post('/comments/:id',datersCtrl.postOtherComment);
router.get('/allMembers',datersCtrl.seeAllMembers);
router.get('/loadPage/:id',datersCtrl.loadPage);
router.get('/messages/:id',datersCtrl.setUpMessage);
router.post('/messages/:id',datersCtrl.sendMessage);
router.get('/show/messages/:id',datersCtrl.showAllMessages);



function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
