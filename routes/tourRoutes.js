const express = require("express");
const router = express.Router();
// import controllers
const {
  getAllTours,
  getTour,
  postTour,
  updateTour,
  deleteTour,
} = require("../controller/tourController");

router.route("/").get(getAllTours).post(postTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
