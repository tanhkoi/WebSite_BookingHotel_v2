import { useContext } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
	const { user, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	return (
		<div className="navbar">
			<div className="navContainer">
				<Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
					<span className="logo">Booking</span>
				</Link>
				{user ? (
					<>
						<p>{user.username}</p>
						<button className="navButton" onClick={handleLogout}>
							Đăng xuất
						</button>
					</>
				) : (
					<div className="navItems">
						<Link to="/register">
							<button className="navButton">Đăng ký</button>
						</Link>
						<Link to="/login">
							<button className="navButton">Đăng nhập</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
