// Express routes
const router = require('express').Router()

// Create Student Models
let students = [
  { id: 0, name: 'Dan' },
  { id: 1, name: 'Rohan' },
  { id: 2, name: 'Sol' },
  { id: 3, name: 'Ella' },
  { id: 4, name: 'Michael' },
  { id: 5, name: 'Karen' },
];

let tests = [
  { id: 0, subject: 'Physics', score: 99, studentId: 0 },
  { id: 1, subject: 'English', score: 78, studentId: 1 },
  { id: 2, subject: 'Math', score: 90, studentId: 3 },
  { id: 3, subject: 'English', score: 55, studentId: 3 },
  { id: 4, subject: 'Physics', score: 88, studentId: 4 },
]

// Get Students
router.get('/', function (req, res, next) {
  res.json({ students })
})

// Get Student by Id
router.get('/:id', function (req, res, next) {
  //console.log(typeof req.params.id)
  //remember: when the :id comes in its a string so u gotta type coerce that
  let student = students.filter(person => person.id === +req.params.id)[0]
  res.json({ student })
})

// Add Student
router.post('/', function (req, res, next) {
  /*
    lets destructure more, but this is what it would look like without that
    let newId = students.length + 1
    let student = {
      id: newId,
      name: req.body.name
    }
  */
  let id = students.length + 1;
  const { name } = req.body
  let student = { id, name }
  students.push(student)
  res.json({ students })
})

// Delete Student
router.delete('/:id', function (req, res, next) {
  let newClass = students.filter(person => person.id != req.params.id)
  students = newClass;
  res.json({ students })
})

// Update Student
router.put('/:id', function (req, res, next) {
  let updatedStudent = students.map(person => {
    if (person.id === +req.params.id) {
      person.name = req.body.name
      return person
    } else {
      return person
    }
  })
  res.json({ updatedStudent })
})

module.exports = router
