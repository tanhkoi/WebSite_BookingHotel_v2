import express from 'express';
import { createHotel, updateHotel,deleteHotel, getAHotel, getHotels } from '../controllers/hotel.js';

const router = express.Router();

//CREATE
router.post('/', createHotel);
//UPADTE
router.put('/:id', updateHotel);
//DELETE
router.delete('/:id', deleteHotel);
//GET
router.get('/:id', getAHotel);
//GET ALL
router.get('/', getHotels);

export default router;
