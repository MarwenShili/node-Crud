const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    msg: 'this route is not difined yet',
  });
};
exports.createUser = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    msg: 'this route is not difined yet',
  });
};
exports.getUserById = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    msg: 'this route is not difined yet',
  });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    msg: 'this route is not difined yet',
  });
};
exports.DeleteUser = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    msg: 'this route is not difined yet',
  });
};
