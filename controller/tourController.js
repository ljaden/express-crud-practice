const fs = require("fs");

// data
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));

// Route controllers - Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const tour = tours.filter((el) => el.id === req.params.id);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};
const postTour = (req, res) => {
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile("./data/tours-simple.json", JSON.stringify(tours), (err) => {
    if (err) throw err;
    res.status(201).json({
      status: "created",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        newTour,
      },
    });
  });
};
const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    requestedAt: req.requestTime,
    data: null,
  });
};
const checkId = (req, res, next, val) => {
  console.log(`TourID: ${val}`);
  const id = val * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      requestedAt: req.requestTime,
      message: "Invaild ID",
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      requestedAt: req.requestTime,
      message: "Missing name and/or price",
    });
  }
  next();
};

module.exports = {
  getAllTours: getAllTours,
  getTour: getTour,
  postTour: postTour,
  updateTour: updateTour,
  deleteTour: deleteTour,
  checkId: checkId,
  checkBody: checkBody,
};
