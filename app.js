const fs = require("fs");

const express = require("express");
const app = express();

// middleware - function that can modifyy the incoming request
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// data
const tours = JSON.parse(fs.readFileSync("./data/tours-simple.json"));

// Route handlers(controllers) - Tours
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
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      requestedAt: req.requestTime,
      message: "Invaild ID",
    });
  }

  const tour = tours.filter((el) => el.id === id);

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
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      requestedAt: req.requestTime,
      message: "Invaild ID",
    });
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "not found",
      requestedAt: req.requestTime,
      message: "Invaild ID",
    });
  }
  res.status(204).json({
    status: "success",
    requestedAt: req.requestTime,
    data: null,
  });
};
// Route handlers(controllers) - Users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "This route is not yet defined!",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "This route is not yet defined!",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "This route is not yet defined!",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "This route is not yet defined!",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "This route is not yet defined!",
  });
};

const tourRouter = express.Router()
const userRouter = express.Router()

/* TOURS routes*/
tourRouter
  .route('/')
  .get(getAllTours)
  .post(postTour)
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

/* USERS routes*/
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
