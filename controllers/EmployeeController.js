const { response } = require("express");
const Employee = require("../modles/Employee");

const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured: " + error,
        });
      });
  } else {
    Employee.find()

      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured: " + error,
        });
      });
  }
};

const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};

const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });

  employee
    .save()
    .then((response) => {
      employee
        .save()
        .then(() => {
          res.json({
            message: "Employee added successfully",
          });
        })
        .catch((error) => {
          res.json({
            message: "An error occurred while saving the file!",
          });
        });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred while saving the employee!",
      });
    });
};

const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData }, { new: true })
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
      res.json({
        message: "Employee updated successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred",
      });
    });
};

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Employ deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
