import useFetch from '../../hooks/useFetch';
import './featured.css';

const Featured = () => {
	const { data, loading, error } = useFetch('/hotels/countByCity?cities=saigon,hanoi,danang');
	return (
		<div className="featured">
			{loading ? (
				'Loading, please wait ...'
			) : (
				<>
					{' '}
					<div className="featuredItem">
						<img src="https://img.freepik.com/free-photo/dusk-business-night-sea-architecture_1417-55.jpg?size=626&ext=jpg&ga=GA1.2.1289487096.1690981427&semt=sph" alt="" className="featuredImg" />
						<div className="featuredTitles">
							<h1>Sai gon</h1>
							<h2>Hiện có {data[0]} địa điểm</h2>
						</div>
					</div>
					<div className="featuredItem">
						<img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f7/12/caption.jpg?w=700&h=-1&s=1" alt="" className="featuredImg" />
						<div className="featuredTitles">
							<h1>Ha noi</h1>
							<h2>Hiện có {data[1]} địa điểm</h2>
						</div>
					</div>
					<div className="featuredItem">
						<img src="https://img.freepik.com/premium-photo/aerial-view-golden-bridge-is-lifted-by-two-giant-hands-two-rows-vietnamese-flags-ba-na-hill-danang-vietnam-travel-landscape-concept_479694-1347.jpg?size=626&ext=jpg&ga=GA1.1.1289487096.1690981427&semt=ais" alt="" className="featuredImg" />
						<div className="featuredTitles">
							<h1>Da nang</h1>
							<h2>Hiện có {data[2]} địa điểm</h2>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Featured;
