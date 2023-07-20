import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const saveHotel = await newHotel.save();
		res.status(200).json(saveHotel);
	} catch (error) {
		next(error);
	}
};
export const updateHotel = async (req, res, next) => {
	try {
		const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
		res.status(200).json(updateHotel);
	} catch (error) {
		next(error);
	}
};
export const getAHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};
export const getHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find(req.params.id);
		res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
};
export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json('Hotel has been deleted');
	} catch (error) {
		next(error);
	}
};
