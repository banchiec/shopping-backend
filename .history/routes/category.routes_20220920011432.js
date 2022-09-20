const router = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
let path = require('path')
const Category = require('../models/category.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require('../middleware/isLoggedIn')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images')
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
	},
})

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

let upload = multer({ storage, fileFilter })

// router.get('/', isLoggedIn, (req, res) => {
// 	try {
// 		category
// 			.find()
// 			.then((data) => {
// 				return res.status(200).json(data)
// 			})
// 			.catch((error) => console.log(error))
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

router.post('/', upload.single('photo'), async (req, res) => {
	const { name, subCategory } = req.body
	const photo = req.file.filename

	console.log(req.file.filename)

	console.log(name)
	console.log(subCategory)
	console.log(photo)
	console.log(req.file.filename)
	if (name) {
		try {
			const category = await Category.findOne({ name })
			// console.log(category)
			if (!category) {
				const newcategory = new Category({ name, subCategory, photo })
				console.log(newcategory)
				Category
					.create({name, subCategory, photo})
					.then((data) => {
						console.log(data)
						return res.status(200).json(data)
					})
					.catch((error) => {
						return res.status(500).json(error)
					})
			} else {
				return res.status(500).json('category exist')
			}
		} catch (error) {
			return res.status(500).json(error)
		}
	} else {
		res.status(422).json('name necesary')
	}
})

// router.post("/signup", isLoggedOut, (req, res) => {
//   const { username, password } = req.body;

//   if (!username) {
//     return res
//       .status(400)
//       .json({ errorMessage: "Please provide your username." });
//   }

//   if (password.length < 8) {
//     return res.status(400).json({
//       errorMessage: "Your password needs to be at least 8 characters long.",
//     });
//   }

//   //   ! This use case is using a regular expression to control for special characters and min length
//   /*
//   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

//   if (!regex.test(password)) {
//     return res.status(400).json( {
//       errorMessage:
//         "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
//     });
//   }
//   */

//   // Search the database for a user with the username submitted in the form
//   User.findOne({ username }).then((found) => {
//     // If the user is found, send the message username is taken
//     if (found) {
//       return res.status(400).json({ errorMessage: "Username already taken." });
//     }

//     // if user is not found, create a new user - start with hashing the password
//     return bcrypt
//       .genSalt(saltRounds)
//       .then((salt) => bcrypt.hash(password, salt))
//       .then((hashedPassword) => {
//         // Create a user and save it in the database
//         return User.create({
//           username,
//           password: hashedPassword,
//         });
//       })
//       .then((user) => {
//         Session.create({
//           user: user._id,
//           createdAt: Date.now(),
//         }).then((session) => {
//           res.status(201).json({ user, accessToken: session._id });
//         });
//       })
//       .catch((error) => {
//         if (error instanceof mongoose.Error.ValidationError) {
//           return res.status(400).json({ errorMessage: error.message });
//         }
//         if (error.code === 11000) {
//           return res.status(400).json({
//             errorMessage:
//               "Username need to be unique. The username you chose is already in use.",
//           });
//         }
//         return res.status(500).json({ errorMessage: error.message });
//       });
//   });
// });

// router.post("/login", isLoggedOut, (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username) {
//     return res
//       .status(400)
//       .json({ errorMessage: "Please provide your username." });
//   }

//   // Here we use the same logic as above
//   // - either length based parameters or we check the strength of a password
//   if (password.length < 8) {
//     return res.status(400).json({
//       errorMessage: "Your password needs to be at least 8 characters long.",
//     });
//   }

//   // Search the database for a user with the username submitted in the form
//   User.findOne({ username })
//     .then((user) => {
//       // If the user isn't found, send the message that user provided wrong credentials
//       if (!user) {
//         return res.status(400).json({ errorMessage: "Wrong credentials." });
//       }

//       // If user is found based on the username, check if the in putted password matches the one saved in the database
//       bcrypt.compare(password, user.password).then((isSamePassword) => {
//         if (!isSamePassword) {
//           return res.status(400).json({ errorMessage: "Wrong credentials." });
//         }
//         Session.create({ user: user._id, createdAt: Date.now() }).then(
//           (session) => {
//             return res.json({ user, accessToken: session._id });
//           }
//         );
//       });
//     })

//     .catch((err) => {
//       // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
//       // you can just as easily run the res.status that is commented out below
//       next(err);
//       // return res.status(500).render("login", { errorMessage: err.message });
//     });
// });

// router.delete("/logout", isLoggedIn, (req, res) => {
//   Session.findByIdAndDelete(req.headers.authorization)
//     .then(() => {
//       res.status(200).json({ message: "User was logged out" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ errorMessage: err.message });
//     });
// });

module.exports = router
