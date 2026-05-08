const Notice = require('../models/Notice');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');
const StudyMaterial = require('../models/StudyMaterial');
const User = require('../models/User');
const Course = require('../models/Course');
const getDashboardStats = async (req, res) => {
  try {
    const profId = req.user._id;
    const assignedCourses = req.user.assignedCourses;
    const studentsCount = await User.countDocuments({ role: 'Student', enrolledCourse: { $in: assignedCourses } });
    const noticesCount = await Notice.countDocuments({ audience: { $in: ['All', 'Professor'] } });
    const leavesCount = await Leave.countDocuments({
      student: { $in: await User.find({ enrolledCourse: { $in: assignedCourses } }).distinct('_id') },
      status: 'Pending'
    });
    res.json({ studentsCount, noticesCount, leavesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyStudents = async (req, res) => {
  try {
    const students = await User.find({
      role: 'Student',
      enrolledCourse: { $in: req.user.assignedCourses }
    }).select('-password').populate('enrolledCourse');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ audience: { $in: ['All', 'Professor'] } }).populate('createdBy', 'name');
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudentLeaves = async (req, res) => {
  try {
    const studentIds = await User.find({ enrolledCourse: { $in: req.user.assignedCourses } }).distinct('_id');
    const leaves = await Leave.find({ student: { $in: studentIds } }).populate({
      path: 'student',
      select: 'name email enrolledCourse',
      populate: { path: 'enrolledCourse', select: 'name' }
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const respondToLeave = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    leave.status = status;
    leave.approvedBy = req.user._id;
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addAttendance = async (req, res) => {
  try {
    const records = req.body.records;
    const savedRecords = [];
    for (let record of records) {
      const existing = await Attendance.findOne({
        student: record.student,
        course: record.course,
        date: new Date(record.date)
      });
      if (existing) {
        existing.status = record.status;
        existing.markedBy = req.user._id;
        await existing.save();
        savedRecords.push(existing);
      } else {
        const newRecord = new Attendance({
          student: record.student,
          course: record.course,
          date: record.date,
          status: record.status,
          markedBy: req.user._id
        });
        await newRecord.save();
        savedRecords.push(newRecord);
      }
    }
    res.status(201).json(savedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const uploadStudyMaterial = async (req, res) => {
  try {
    const { title, description, course } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Please upload a file' });
    const material = new StudyMaterial({
      title,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      course,
      uploadedBy: req.user._id
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ uploadedBy: req.user._id }).populate('course');
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if(material && material.uploadedBy.toString() === req.user._id.toString()){
      await material.deleteOne();
      res.json({ message: 'Study material deleted' });
    } else {
      res.status(401).json({ message: 'Not authorized or not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyAssignedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ _id: { $in: req.user.assignedCourses } });
    res.json(courses);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  getDashboardStats, getMyStudents, getNotices,
  getStudentLeaves, respondToLeave, addAttendance,
  uploadStudyMaterial, getStudyMaterials, deleteStudyMaterial, getMyAssignedCourses
};
