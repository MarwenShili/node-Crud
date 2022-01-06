const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();
router.param('id', tourController.checkId);
router.route('/').get(tourController.getAllTours).post(tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.DeleteTour);

module.exports = router;
