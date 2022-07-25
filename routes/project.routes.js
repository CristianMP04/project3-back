const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.model')
const Foods = require('../models/Food.model');

const dict = {
	1: "Netflix & Chill",
	2: "Con Amigos",
	3: "Ulala sra./sr. sofisticad@, hoy triunfas."
}

//  POST /api/projects  -  Creates a new project
router.post('/foods/favorites/:id_food', (req, res, next) => {
	const { id_food } = req.params; // parametros de url
	const id_user = req.payload._id // magia negra
	console.log(id_food + " ASDADAD " + id_user)
// req.body info añadida en formularios post
	User.findByIdAndUpdate(
		{ 
			_id: id_user
		},
		{
			$addToSet: {favorites:id_food} // El addToSet es un comando de mongodb que comprueba que no esté repetido. 
		},
		{                        
			$push: { favorites: id_food }},
		).then(() => console.log(""))
})
	//Foods.create({ title, description, tasks: [] })
	//	.then((response) => res.json(response))
	//	.catch((err) => res.json(err));


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

router.get('/tinder/:filterByType', (req,res,next) => {
	const {filterByType} = req.params;
	
	const type = dict[filterByType]
	Foods.find({type: type})
	.then((foodList) => {
		console.log(foodList)
		res.json(foodList)
	})
	.catch((error) => res.json(error))

})
router.get("/favorites", (req, res, next) =>{

	User.findOne({_id: req.payload._id})
	.populate('favorites')
	.then((user) => {
		console.log(user)
		res.json(user)
	})
	.catch((error) => res.json(error))
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
router.delete('/favorites/:foodId', (req, res, next) => {
	const { foodId } = req.params;
	console.log(foodId)
	const id_user = req.payload._id // magia negra
	console.log(id_user)

	if (!mongoose.Types.ObjectId.isValid(foodId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}
	User.findByIdAndUpdate(id_user,{$pull : {favorites : foodId}}).then(() =>{
	
	
			res.json({
				message: `favorite with ${foodId} is removed successfully.`
			})

	
	})
	.catch((error) => res.json(error));
});

module.exports = router;
