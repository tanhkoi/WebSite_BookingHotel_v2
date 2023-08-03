import './mailList.css';

const MailList = () => {
	return (
		<div className="mail">
			<h1 className="mailTitle">Tiết kiệm thời gian, tiết kiệm tiền!</h1>
			<span className="mailDesc">Đăng ký nhận ngay ưu đãi</span>
			<div className="mailInputContainer">
				<input type="text" placeholder="Nhập email của bạn" />
				<button>Đăng ký</button>
			</div>
		</div>
	);
};

export default MailList;
