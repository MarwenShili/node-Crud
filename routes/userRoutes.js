const express = require('express');
const userController = require('../controllers/userController');

// handle USERS ROUTES

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.DeleteUser);

module.exports = router;
