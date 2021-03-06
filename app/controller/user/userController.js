const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../validation/user/userValidator');
const Response = require('../../../utils/response');
const bcrypt = require('bcrypt');
const userModule = require('../../model/user/user');


// get all users
router.get('/', async (req, res) => {
	const response = new Response(res);
	
	try {
		const getAll = await userModule.paginate(req, 1);	
		return response.content(getAll);
	} catch (error) {
		return response.internalServerError(error);
	}
})

//find user by id
router.get('/:id', async (req, res) => {
	const response = new Response(res);
	const id = req.params.id;

	try {
		const user = await userModule.find(id);
		return response.content(user)
	} catch (error) {
		return response.internalServerError(error);
	}
})

//create user
router.post('/', async (req, res) => {
  const response = new Response(res)

  try {
	const {data, error} = validateRequest (req, 'create');

	if(error) return response.badRequest(error);

	const {name, email, phone, password} = data;

	const passwordHash = bcrypt.hashSync(password, 10);

	const user = await userModule.store(name, email, phone, passwordHash)

	return response.created(user);
	
  } catch (error) {
	const message = error.message ? error.message : 'Server error';
    response.internalServerError({ message });
  }
})

// update user by id
router.put('/update/:id', async (req, res) => {
	const response = new Response(res);
	const id = req.params.id;

	try {
		const {data , error } =  validateRequest(req, 'update');

		if (error) return response.badRequest(error);

		const {name, email, phone} = data;

		const user = await userModule.find(id);

		if (user.length == 0) return response.notFound('user not found')

	    const update = await userModule.update(id ,name, email, phone);

		return response.ok(update);

	} catch (error) {
		return response.internalServerError(error);
	}
})

router.delete('/:id', async (req, res) => {
	const response = new Response(res);
	const id = req.params.id;
	
	try {
		const user = await userModule.find(id);

		if (user.length == 0) return response.notFound('user not found');
		
		const destroy = await userModule.destroy(id);

		return response.ok(destroy);
	} catch (error) {
		return response.internalServerError(error);
	}

})


// require your models here


// sample post method
// router.post('/', async (req, res) => {
//   const response = new Response(res);
//   try {
//     validate request to check user input errors
//     call model methods
//     send response to client
//   } catch (error) {
//     send error response to client
//   }
// });

module.exports = router;