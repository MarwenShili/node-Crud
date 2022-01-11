const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const Tour = require('../../models/tourModel');
//CONNECT DATABASE
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  //local Database
  // .connect(process.env.DATABASE_LOCAL)
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db Connection successfuly ');
  });

// read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
// import function
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfuly loaded ');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfuly deleted ');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
