const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Foods = require('../models/Food.model');

//  POST /api/projects  -  Creates a new project
router.post('/foods/favorites/:id_user/:id_food', (req, res, next) => {
	const { id_user, id_food } = req.params;
	console.log(id_food , id_user)
	console.log(req.payload)
	//Foods.create({ title, description, tasks: [] })
	//	.then((response) => res.json(response))
	//	.catch((err) => res.json(err));
});

//  GET /api/projects -  Retrieves all of the projects
router.get('/projects', (req, res, next) => {
	Foods.find().then((allProjects) => res.json(allProjects)).catch((err) => res.json(err));
});

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/projects/:projectId', (req, res, next) => {
	const { projectId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(projectId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	// Each Project document has `tasks` array holding `_id`s of Task documents
	// We use .populate() method to get swap the `_id`s for the actual Task documents
	Foods.findById(projectId)
		.populate('tasks')
		.then((project) => res.status(200).json(project))
		.catch((error) => res.json(error));
});
router.get("/favorites", (req, res, next) =>{

	User.findById(req.session.currentUser._id)
	.populate('favorites')
	.then((user) => {
	  res.render("recipes/favorites", {favorites: user.favorites});
	  
	})
   
  
  })

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/projects/:projectId', (req, res, next) => {
	const { projectId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(projectId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Foods.findByIdAndUpdate(projectId, req.body, { new: true })
		.then((updatedProject) => res.json(updatedProject))
		.catch((error) => res.json(error));
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete('/projects/:projectId', (req, res, next) => {
	const { projectId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(projectId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Foods.findByIdAndRemove(projectId)
		.then(() =>
			res.json({
				message: `Project with ${projectId} is removed successfully.`
			})
		)
		.catch((error) => res.json(error));
});

module.exports = router;
