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
	const { min, max, limit, ...others } = req.query;
	const parsedLimit = parseInt(limit);
	const parsedMin = parseInt(min);
	const parsedMax = parseInt(max);
	const cheapestPriceMax = !isNaN(parsedMax) && parsedMax > 0 ? parsedMax : 999;
	const cheapestPriceMin = !isNaN(parsedMin) && parsedMin >= 0 ? parsedMin : 1;

	try {
		const hotels = await Hotel.find({
			...others,
			cheapestPrice: { $gt: cheapestPriceMin, $lt: cheapestPriceMax },
		}).limit(parsedLimit);
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
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

export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(',');
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (error) {
		next(error);
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
