const fs = require("fs");

const express = require("express");
const app = express();

// middleware - function that can modifyy the incoming request
app.use(express.json());

// data
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));

// GET
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
// GET /:id
app.get("/api/v1/tours/:id", (req, res) => {
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
});
// POST
app.post("/api/v1/tours", (req, res) => {
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
});
// PATCH
app.patch("/api/v1/tours/:id", (req, res) => {
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
});
// DELETE
app.delete("/api/v1/tours/:id", (req, res) => {
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
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
