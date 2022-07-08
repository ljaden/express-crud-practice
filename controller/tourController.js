// data
const Tour = require("../schema/toursSchema");

// Route controllers - Tours
const getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find({});

    res.status(200).json({
      status: "success",
      results: allTours.length,
      requestedAt: req.requestTime,
      data: {
        allTours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
const postTour = async (req, res) => {
  const tour = req.body;

  try {
    const newTour = await Tour.create(tour);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete({ id: req.params.id });
    // console.log(tour);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        removed: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

module.exports = {
  getAllTours: getAllTours,
  getTour: getTour,
  postTour: postTour,
  updateTour: updateTour,
  deleteTour: deleteTour,
};
