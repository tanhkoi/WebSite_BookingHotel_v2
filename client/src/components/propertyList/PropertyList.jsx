import useFetch from '../../hooks/useFetch';
import './propertyList.css';

const PropertyList = () => {
	const { data, loading, error } = useFetch('/hotels/countByType');

	const images = ['https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?size=626&ext=jpg&ga=GA1.1.1289487096.1690981427&semt=sph', 'https://img.freepik.com/free-photo/empty-modern-room-with-furniture_23-2149178335.jpg?size=626&ext=jpg&ga=GA1.1.1289487096.1690981427&semt=sph', 'https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?size=626&ext=jpg&ga=GA1.2.1289487096.1690981427&semt=sph', 'https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?size=626&ext=jpg&ga=GA1.1.1289487096.1690981427&semt=sph', 'https://img.freepik.com/free-photo/beautiful-landscape-with-wooden-cabins-green-trees_181624-18862.jpg?size=626&ext=jpg&ga=GA1.1.1289487096.1690981427&semt=sph'];
	return (
		<div className="pList">
			{loading ? (
				'loading'
			) : (
				<>
					{data &&
						images.map((img, i) => (
							<div className="pListItem" key={i}>
								<img src={img} alt="" className="pListImg" />
								<div className="pListTitles">
									<h1>{data[i]?.type}</h1>
									<h2>
										{data[i]?.count} {data[i]?.type}
									</h2>
								</div>
							</div>
						))}
				</>
			)}
		</div>
	);
};

export default PropertyList;
