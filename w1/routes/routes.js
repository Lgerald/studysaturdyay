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

let tests = [
	{id: 0, subject: 'Physics', score: 99, studentId: 0},
	{id: 1, subject: 'English', score: 78, studentId: 1},
	{id: 2, subject: 'Math', score: 90, studentId: 3},
	{id: 3, subject: 'English', score: 55, studentId: 3},
	{id: 4, subject: 'Physics', score: 88, studentId: 4},
]

// Get Students
router.get('/', function(req, res, next) {
  res.json({students})
})

// Get Student by Id
router.get('/:id', function(req, res, next) {
  //console.log(typeof req.params.id)
  //remember: when the :id comes in its a string so u gotta type coerce that
  let student = students.filter(person => person.id === +req.params.id)[0]
  res.json({student})
})

// Add Student
router.post('/', function(req, res, next) {
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
  res.json({students})
})

// Delete Student
router.delete('/:id', function(req, res, next) {
  let newClass = students.filter(person => person.id != req.params.id)
  students = newClass;
  res.json({students})
})

// Update Student
router.put('/:id', function(req, res, next) {
  let updatedStudent = students.map(person => {
    if (person.id === +req.params.id) {
      person.name = req.body.name
      return person
    } else {
      return person
    }
  })
  res.json({updatedStudent})
})

//THIS IS THE END OF W2


// Get Tests
router.get('/tests', function(req, res, next) {
  res.json({tests})
})

// Get Test by Id
router.get('/tests/:id', function(req, res, next) {
  let test = tests.filter(test => test.id === req.params.id);
  res.json({test})
})

// Add Score
router.post('/tests', function(req, res, next) {
  let newId = tests.length + 1;
  let test = {
  	id: newId,
  	score: req.body.score,
  	studentId: req.body.studentId,
  	subject: req.body.subject
  }
  tests.push(test)
  res.json({tests})
})

// Delete Score
router.delete('/tests/:id', function(req, res, next) {
  let newScores = tests.filter(score => score.id != req.params.id)
  tests = newScores;
  res.json({tests})
})

// Update Score
router.put('/tests/:id', function(req, res, next) {
  let updatedScore = tests.filter(score => score.id === req.params.id)[0];
  updatedScore.score = req.body.score;
  updatedScore.studentId = req.body.studentId;
  updatedScore.subject = req.body.subject;
  tests[req.params.id] = updatedScore;
  res.json({tests})
})

// Get Mean Score for Student
router.get('/:id/mean', function(req, res, next) {
 	let studentTests = tests.filter(test => test.studentId === req.params.id)
 	let total = studentTests.reduce((acc, test, idx) => {
 		return acc + test.score
 	}, 0);
 	let mean = total / (studentTests.length + 1);
 	res.json({mean})
})


// Get Top Scoring Student
router.get('/top', function(req, res, next) {
	// reduce array of tests
 	let topScore = tests.reduce((prev, current, idx) => {
 		return (prev.score > current.score) ? prev : current
 	});
 	// find assoc student
 	let validictorian = students.filter(student => student.id === topScore.studentId);

 	res.json({validictorian})
})


module.exports = router
