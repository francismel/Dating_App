var router = require('express').Router();
var datersCtrl = require('../controllers/daters');

// GET /students
router.get('/', datersCtrl.index);
router.get('/new/Basics',datersCtrl.create)
router.post('/new/Basics',datersCtrl.basics)
router.get('/new/Lightning',datersCtrl.getLightning)
router.post('/new/:id',datersCtrl.postLightningQuestions)
router.get('/new/Personal',datersCtrl.personal)



function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
