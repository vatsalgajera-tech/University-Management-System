const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Subject = require('../models/Subject');
const Notice = require('../models/Notice');
const Leave = require('../models/Leave');
const bcrypt = require('bcrypt');
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'Student' });
    const totalProfessors = await User.countDocuments({ role: 'Professor' });
    const totalCourses = await Course.countDocuments();
    res.json({ totalStudents, totalProfessors, totalCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const role = req.query.role;
    const query = role ? { role } : { role: { $ne: 'Admin' } };
    const users = await User.find(query).populate('enrolledCourse assignedCourses').select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const {
      name, email, password, role, enrolledCourse, assignedCourses
    } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let studentData = {};
    if (role === 'Student') {
      const course = await Course.findById(enrolledCourse);
      const enrollmentNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
      const admissionDate = new Date();
      const startYear = admissionDate.getFullYear();
      let durationYears = 1;
      if (course && course.duration) {
        const match = course.duration.match(/(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
          if (course.duration.toLowerCase().includes('semester')) {
            durationYears = Math.ceil(num / 2);
          } else {
            durationYears = num;
          }
        }
      }
      const endYear = startYear + durationYears;
      const yearStr = `${startYear} - ${endYear}`;
      studentData = {
        enrolledCourse,
        enrollmentNumber, admissionDate, year: yearStr
      };
    }
    const newUser = new User({
      name, email, password: hashedPassword, role,
      assignedCourses: role === 'Professor' ? assignedCourses : [],
      ...studentData
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    if (user.role === 'Student') {
      if (req.body.enrolledCourse !== undefined) user.enrolledCourse = req.body.enrolledCourse;
      if (!user.enrollmentNumber) {
        const course = await Course.findById(user.enrolledCourse);
        if (!user.enrollmentNumber) {
          user.enrollmentNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        }
        if (!user.admissionDate) {
          user.admissionDate = new Date();
        }
        if (!user.year) {
          const startYear = (user.admissionDate || new Date()).getFullYear();
          let durationYears = 1;
          if (course && course.duration) {
            const match = course.duration.match(/(\d+)/);
            if (match) {
              const num = parseInt(match[1]);
              durationYears = course.duration.toLowerCase().includes('semester') ? Math.ceil(num / 2) : num;
            }
          }
          user.year = `${startYear} - ${startYear + durationYears}`;
        }
      }
    }
    if (user.role === 'Professor' && req.body.assignedCourses) {
      user.assignedCourses = req.body.assignedCourses;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('course').populate('professor', 'name email');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    const createdSubject = await subject.save();
    res.status(201).json(createdSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().populate('createdBy', 'name');
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createNotice = async (req, res) => {
  try {
    const notice = new Notice({
      ...req.body,
      createdBy: req.user._id
    });
    const createdNotice = await notice.save();
    res.status(201).json(createdNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notice removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
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
    if (leave) {
      leave.status = status;
      leave.approvedBy = req.user._id;
      const updatedLeave = await leave.save();
      res.json(updatedLeave);
    } else {
      res.status(404).json({ message: 'Leave not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getDashboardStats,
  getUsers, createUser, updateUser, deleteUser,
  getCourses, createCourse, updateCourse, deleteCourse,
  getSubjects, createSubject, updateSubject, deleteSubject,
  getNotices, createNotice, deleteNotice,
  getAllLeaves, respondToLeave, deleteLeave
};
