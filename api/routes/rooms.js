import express from 'express';
import { createRoom, updateRoom, deleteRoom, getARoom, getRooms, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:hotelid', verifyAdmin, createRoom);
//UPADTE
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);
//DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);
//GET
router.get('/:id', getARoom);
//GET ALL
router.get('/', getRooms);

export default router;
