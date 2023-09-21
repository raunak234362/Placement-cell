// Importing required modules and models
const Student = require("../models/student");
const fs = require("fs");
const path = require("path");

// Defining a function to handle CSV report download
module.exports.downloadCSVReport = async function (req, res) {
  try {
     // Fetch all students from the database
    const allStudents = await Student.find({});
    // Defining the initial header row for the CSV report
    let report =
      "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
    let studentData1 = " ";

    for (let student of allStudents) {
      studentData1 =
        student.id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.placement_status +
        "," +
        student.dsa_score +
        "," +
        student.webdev_score +
        "," +
        student.react_score;
      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          let studentData2 = "";
          studentData2 +=
            "," +
            interview.date.toString() +
            "," +
            interview.company +
            "," +
            interview.result;
          report += "\n" + studentData1 + studentData2;
        }
      }
    }

    
    // Writing the report to a CSV file
    const csvFile = fs.writeFile(
      "uploads/studentsReport.csv",
      report,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirect("back");
        }
        req.flash("success", "Successfully downloaded CSV report!");
        return res.download("uploads/studentsReport.csv");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
