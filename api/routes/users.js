import express from 'express';
import { updateUser, deleteUser, getAUser, getUsers } from '../controllers/user.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/checkauthentication', verifyToken, (req, res, next) => {
	res.send('hello user, you are logged in');
});
router.get('/checkuser/:id', verifyUser, (req, res, next) => {
	res.send('hello user, you are ');
});
//UPADTE
router.put('/:id', updateUser);
//DELETE
router.delete('/:id', deleteUser);
//GET
router.get('/:id', getAUser);
//GET ALL
router.get('/', getUsers);

export default router;
