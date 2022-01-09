const fs = require('fs');
const router = require('../routes/tourRoutes');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`the id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: 'id is not valid',
    });
  }
  next();
};
//chek body middleware 
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      data: 'invalid name or price ',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.addTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  tours[id] = { ...tours[id], ...req.body };
  res.status(200).json({
    status: 'success',
    data: tours[id],
  });
};

exports.DeleteTour = (req, res) => {
  const id = req.params.id * 1;
  delete tours[id];
  res.status(200).json({
    status: 'success',
    data: { tours },
  });
};
