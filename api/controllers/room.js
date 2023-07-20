import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const createRoom = async (req, res, next) => {
	const hotelID = req.params.hotelid;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelID, { $push: { rooms: savedRoom._id } });
		} catch (err) {
			next(err);
		}
		res.status(200).json(savedRoom);
	} catch (error) {
		next(error);
	}
};
export const updateRoom = async (req, res, next) => {
	try {
		const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
		res.status(200).json(updateRoom);
	} catch (error) {
		next(error);
	}
};
export const getARoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (error) {
		next(error);
	}
};
export const getRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find(req.params.id);
		res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
};
export const deleteRoom = async (req, res, next) => {
	const hotelID = req.params.hotelid;

	try {
		await Room.findByIdAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelID, { $pull: { rooms: req.params.id } });
		} catch (err) {
			next(err);
		}
		res.status(200).json('Room has been deleted');
	} catch (error) {
		next(error);
	}
};
