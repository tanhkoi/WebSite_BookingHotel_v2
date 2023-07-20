import express from 'express';
import { createHotel, updateHotel, deleteHotel, getAHotel, getHotels } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);
//UPADTE
router.put('/:id', verifyAdmin, updateHotel);
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);
//GET
router.get('/:id', getAHotel);
//GET ALL
router.get('/', getHotels);

export default router;
