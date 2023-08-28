const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const{ Authentication,login,AuthenticateUser } =require('../Auth');

router.post('/new',userController.registerUser);

router.get("/PublicRoute",userController.GetPublicRoute);

router.get('/PrivateRoute',Authentication,AuthenticateUser,userController.GetPrivateRoute);

module.exports = router;
