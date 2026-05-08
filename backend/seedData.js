const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const Subject = require('./models/Subject');
dotenv.config();
const Names = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyaansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith', 'Aaryan', 'Dhruv', 'Kabir', 'Ritik', 'Darsh',
  'Ahaan', 'Aakash', 'Jay', 'Meet', 'Vatsal', 'Neel', 'Yash', 'Rahul', 'Rohan', 'Amit', 'Sunil',
  'Sanjay', 'Kiran', 'Prakash', 'Rajesh', 'Suresh', 'Ramesh', 'Ravi', 'Anil', 'Nitin', 'Vijay',
  'Gaurav', 'Manish', 'Vikram', 'Praveen', 'Sandeep', 'Deepak', 'Tarun', 'Naveen', 'Ashish',
  'Pooja', 'Neha', 'Priya', 'Aditi', 'Anjali', 'Kavya', 'Sneha', 'Shruti', 'Swati', 'Megha',
  'Nisha', 'Aarti', 'Kirti', 'Ritu', 'Shikha', 'Jyoti', 'Divya', 'Deepika', 'Preeti', 'Priyanka'
];
const Surnames = [
  'Patel', 'Sharma', 'Singh', 'Kumar', 'Joshi', 'Desai', 'Mehta', 'Reddy', 'Rao', 'Gupta',
  'Trivedi', 'Shah', 'Agarwal', 'Mishra', 'Yadav', 'Das', 'Thakur', 'Chauhan', 'Verma', 'Goswami'
];
const courseSubjectsMap = {
  'BCA': ['C Programming', 'Data Structures', 'Database Management Systems', 'Web Development', 'Computer Networks'],
  'MCA': ['Advanced Java', 'Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Data Science'],
  'BBA': ['Principles of Management', 'Financial Accounting', 'Marketing Management', 'Human Resource Management', 'Business Economics'],
  'MBA': ['Strategic Management', 'Corporate Finance', 'International Business', 'Operations Management', 'Organizational Behavior']
};
const getRandomName = () => Names[Math.floor(Math.random() * Names.length)];
const getRandomSurname = () => Surnames[Math.floor(Math.random() * Surnames.length)];
const getFullName = () => `${getRandomName()} ${getRandomSurname()}`;
const generateEnrollmentNumber = () => Math.floor(100000000000 + Math.random() * 900000000000).toString();
const generatePhoneNumber = () => '9' + Math.floor(100000000 + Math.random() * 900000000).toString();
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('password123', salt);
    const coursesData = [
      { name: 'BCA', duration: '3', count: 7, desc: 'Bachelor of Computer Applications' },
      { name: 'MCA', duration: '2', count: 8, desc: 'Master of Computer Applications' },
      { name: 'BBA', duration: '3', count: 8, desc: 'Bachelor of Business Administrations' },
      { name: 'MBA', duration: '2', count: 10, desc: 'Master of Business Administrations' }
    ];
    for (const data of coursesData) {
      let course = await Course.findOne({ name: data.name });
      if (!course) {
        course = new Course({ name: data.name, description: data.desc, duration: data.duration });
        await course.save();
        console.log(`Created course: ${data.name}`);
      }
      for (let i = 0; i < data.count; i++) {
        const studentName = getFullName();
        const studentEmail = `${studentName.toLowerCase()}${Math.floor(Math.random() * 10000)}@student.com`;
        const student = new User({
          name: studentName,
          email: studentEmail,
          password: defaultPassword,
          role: 'Student',
          enrolledCourse: course._id,
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          enrollmentNumber: generateEnrollmentNumber(),
          mobileNumber: generatePhoneNumber(),
          category: 'General',
          year: '1st Year',
          admissionDate: new Date()
        });
        await student.save();
      }
      console.log(`Added ${data.count} students to ${data.name}`);
      for (let i = 0; i < 2; i++) {
        const profName = getFullName();
        const profEmail = `prof.${profName.split(' ')[0].toLowerCase()}${Math.floor(Math.random() * 1000)}@university.com`;
        const prof = new User({
          name: profName,
          email: profEmail,
          password: defaultPassword,
          role: 'Professor',
          assignedCourses: [course._id]
        });
        await prof.save();
      }
      console.log(`Added 2 professors for ${data.name}`);
      const subjectsToCreate = courseSubjectsMap[data.name] || [];
      const theProf = await User.findOne({ role: 'Professor', assignedCourses: course._id });
      for (const subName of subjectsToCreate) {
        const subject = new Subject({
          name: subName,
          course: course._id,
          professor: theProf ? theProf._id : null
        });
        await subject.save();
      }
      console.log(`Added ${subjectsToCreate.length} subjects for ${data.name}`);
    }
    console.log('Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};
seedData();
