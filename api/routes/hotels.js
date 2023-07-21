import express from 'express';
import { createHotel, updateHotel, deleteHotel, getAHotel, getHotels, countByType, countByCity } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);
//UPADTE
router.put('/:id', verifyAdmin, updateHotel);
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);
//GET
router.get('/find/:id', getAHotel);
//GET ALL
router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

export default router;
