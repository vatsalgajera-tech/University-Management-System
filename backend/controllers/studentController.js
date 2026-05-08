const User = require('../models/User');
const Notice = require('../models/Notice');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');
const StudyMaterial = require('../models/StudyMaterial');
const getDashboardStats = async (req, res) => {
  try {
    const courseId = req.user.enrolledCourse;
    const attendanceCount = await Attendance.countDocuments({ student: req.user._id, status: 'Present' });
    const totalAttendance = await Attendance.countDocuments({ student: req.user._id });
    const attendancePercentage = totalAttendance > 0 ? ((attendanceCount / totalAttendance) * 100).toFixed(2) : 0;
    const noticesCount = await Notice.countDocuments({ audience: { $in: ['All', 'Student'] } });
    const studyMaterialsCount = await StudyMaterial.countDocuments({ course: courseId });
    res.json({ attendancePercentage, noticesCount, studyMaterialsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.body.email) user.email = req.body.email;
    if (req.body.mobileNumber !== undefined) user.mobileNumber = req.body.mobileNumber;
    if (req.body.password) {
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, enrolledCourse: user.enrolledCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ audience: { $in: ['All', 'Student'] } }).populate('createdBy', 'name');
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ student: req.user._id }).sort('-createdAt');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const applyLeave = async (req, res) => {
  try {
    const { date, reason } = req.body;
    const leave = new Leave({
      student: req.user._id,
      date,
      reason
    });
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ student: req.user._id }).populate('course').populate('markedBy', 'name');
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ course: req.user.enrolledCourse }).populate('course');
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getDashboardStats, updateProfile, getNotices,
  getLeaves, applyLeave, getAttendance, getStudyMaterials
};
