const fs = require("fs");

const express = require("express");
const app = express();

// middleware - function that can modifyy the incoming request
app.use(express.json());

// data
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      message: "Invaild ID",
    });
  }

  const tour = tours.filter((el) => el.id === id);

  res.status(200).json({
    status: "success",
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
      results: tours.length,
      data: {
        newTour,
      },
    });
  });
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      message: "Invaild ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
}
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      message: "Invaild ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
}

// GET
app.get("/api/v1/tours", getAllTours);
// GET /:id
app.get("/api/v1/tours/:id", getTour);
// POST
app.post("/api/v1/tours", postTour);
// PATCH
app.patch("/api/v1/tours/:id", updateTour);
// DELETE
app.delete("/api/v1/tours/:id", deleteTour);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
