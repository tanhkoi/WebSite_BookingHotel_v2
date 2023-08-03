import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
};
export const updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
		res.status(200).json(updatedHotel);
	} catch (err) {
		next(err);
	}
};
export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json('Hotel has been deleted.');
	} catch (err) {
		next(err);
	}
};
export const getHotel = async (req, res, next) => {
	console.log(req.method);

	try {
		const hotel = await Hotel.findById(req.params.id);
		console.log(hotel, req.params);
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};

export const getHotels = async (req, res, next) => {
	console.log(req.method);

	const { min, max, limit,...others } = req.query;
	try {
		const hotels = await Hotel.find({
			...others,
			cheapestPrice: { $gt: min | 1, $lt: max || 999999999 },
		}).limit(limit);

		console.log(min, max, limit, others , hotels, req.query);
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

// export const getHotels = async (req, res, next) => {
// 	console.log(req.method);
// 	const { min, max, limit, ...others } = req.query;
// 	const parsedLimit = parseInt(limit);
// 	const parsedMin = parseInt(min);
// 	const parsedMax = parseInt(max);
// 	const cheapestPriceMax = !isNaN(parsedMax) && parsedMax > 0 ? parsedMax : 999;
// 	const cheapestPriceMin = !isNaN(parsedMin) && parsedMin >= 0 ? parsedMin : 1;

// 	try {
// 		const hotels = await Hotel.find({
// 			...others,
// 			cheapestPrice: { $gt: cheapestPriceMin, $lt: cheapestPriceMax },
// 		}).limit(parsedLimit);
// 		console.log(hotels);
// 		res.status(200).json(hotels);
// 	} catch (err) {
// 		next(err);
// 	}
// };

export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(',');
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
export const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
		const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
		const resortCount = await Hotel.countDocuments({ type: 'resort' });
		const villaCount = await Hotel.countDocuments({ type: 'villa' });
		const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

		res.status(200).json([
			{ type: 'hotel', count: hotelCount },
			{ type: 'apartments', count: apartmentCount },
			{ type: 'resorts', count: resortCount },
			{ type: 'villas', count: villaCount },
			{ type: 'cabins', count: cabinCount },
		]);
	} catch (err) {
		next(err);
	}
};

export const getHotelRooms = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
