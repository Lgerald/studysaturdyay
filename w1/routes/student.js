// Express routes
const router = require('express').Router()

// Create Student Models
let students = [
	{ id: 0, name: 'Dan'},
	{ id: 1, name: 'Rohan'},
	{ id: 2, name: 'Sol'},
	{ id: 3, name: 'Ella'},
	{ id: 4, name: 'Michael'},
	{ id: 5, name: 'Karen'},
];

// Get Students
router.get('/', function(req, res ,next) {
  res.json({students})
})

// Get Student by Id
router.get('/:id', function(req, res, next) {
  let student = students.find(person => person.id === +req.params.id);
  console.log('student', student)
  res.json(student)
})

// Add Student
router.post('/', function(req, res ,next) {
  let newId = students.length + 1;
  let student = {
  	id: newId,
  	name: req.body.name
  }
  students.push(student)
  res.json({students})
})

// Delete Student
router.delete('/:id', function(req, res ,next) {
  let newClass = students.filter(person => person.id != req.params.id)
  students = newClass;
  res.json({students})
})

// Update Student
router.put('/:id', function(req, res ,next) {
  let updatedStudent = students.filter(person => person.id === req.params.id);
  updatedStudent.name = req.body.name;
  students[req.params.id] = updatedStudent;
  res.json({students})
})

module.exports = router