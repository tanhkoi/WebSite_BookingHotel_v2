import './searchItem.css';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
	return (
		<div className="searchItem">
			<img src={item.photos[0]} alt="" className="siImg" />
			<div className="siDesc">
				<h1 className="siTitle">{item.name}</h1>
				<span className="siDistance">{item.distance}m từ trung tâm</span>
				<span className="siTaxiOp">Đưa đón miễn phí từ sân bay</span>
				<span className="siSubtitle">Căn hộ Studio với điều hòa không khí</span>
				<span className="siFeatures">{item.desc}</span>
				<span className="siCancelOp">Hủy miễn phí </span>
				<span className="siCancelOpSubtitle">Bạn có thể hủy sau, hãy giữ giá tốt này ngay hôm nay!</span>
			</div>
			<div className="siDetails">
				{item.rating && (
					<div className="siRating">
						<span>Tuyệt vời</span>
						<button>{item.rating}</button>
					</div>
				)}
				<div className="siDetailTexts">
					<span className="siPrice">${item.cheapestPrice}</span>
					<span className="siTaxOp">Bao gồm thuế và phí</span>
					<Link to={`/hotels/${item._id}`}>
						<button className="siCheckButton">Xem sẵn có</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchItem;
