const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('hello from the middleware');
//   next();
// });
// app.use((req, res, next) => {
//   req.requestTime = new next();
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};
const getTourById = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      data: 'id is not valid',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};
const addTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          newTours,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: 'id is not valid',
    });
  } else {
    const id = req.params.id * 1;
    // const index = tours.findIndex((el) => el.id === id);
    // console.log(index);
    tours[id] = { ...tours[id], ...req.body };
    res.status(200).json({
      status: 'success',
      data: tours[id],
    });
  }
};
const DeleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: 'id is not valid',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
//get tours
// app.get('/api/v1/tours', getAllTours);
//get tours by id
// app.get('/api/v1/tours/:id', getTourById);
//add tours
// app.post('/api/v1/tours', addTour);
//updata tour by id
// app.put('/api/v1/tours/:id', updateTour);
// delete by id
app.delete('/api/v1/tours/:id', DeleteTour);
app.route('/api/v1/tours').get(getAllTours).post(addTour);
app.route('/api/v1/tours/:id').get(getTourById).patch(updateTour);

//////// port server /////////////
const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
