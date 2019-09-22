let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const UserController = require('../controllers/user');
const jwtCheck  = require('../helpers/jwtCheck');



//post
router.post('/new',UserController.userRegister);
router.post('/login',UserController.userLogin);

//get
router.get('/profile', jwtCheck.veryfyToken , UserController.userPrifile);


module.exports = router;
