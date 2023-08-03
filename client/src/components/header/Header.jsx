import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
	const [destination, setDestination] = useState('');
	const [openDate, setOpenDate] = useState(false);
	const [dates, setDates] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,
	});

	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const handleOption = (name, operation) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
			};
		});
	};

	const { dispatch } = useContext(SearchContext);

	const handleSearch = () => {
		dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
		navigate(`/hotels`, { state: { destination, dates, options } });
	};

	return (
		<div className="header">
			<div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
				{type !== 'list' && (
					<>
						<h1 className="headerTitle">Giảm giá bất tận? Quá tuyệt vời.</h1>
						<p className="headerDesc">Nhận thưởng cho hành trình du lịch của bạn - mở khóa tiết kiệm ngay 10% hoặc nhiều hơn với một tài khoản Booking miễn phí.</p>
						{!user && (
							<>
								<Link to="/register">
									<button className="headerBtn">Đăng ký</button>
								</Link>
							</>
						)}
						<div className="headerSearch">
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faBed} className="headerIcon" />
								<input type="text" placeholder="Bạn muốn đi đâu?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} />
							</div>
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
								<span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
								{openDate && <DateRange editableDateInputs={true} onChange={(item) => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} className="date" minDate={new Date()} />}
							</div>
							<div className="headerSearchItem">
								<FontAwesomeIcon icon={faPerson} className="headerIcon" />
								<span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} người lớn · ${options.children} trẻ em · ${options.room} phòng`}</span>
								{openOptions && (
									<div className="options">
										<div className="optionItem">
											<span className="optionText">Người lớn</span>
											<div className="optionCounter">
												<button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption('adult', 'd')}>
													-
												</button>
												<span className="optionCounterNumber">{options.adult}</span>
												<button className="optionCounterButton" onClick={() => handleOption('adult', 'i')}>
													+
												</button>
											</div>
										</div>
										<div className="optionItem">
											<span className="optionText">Trẻ em</span>
											<div className="optionCounter">
												<button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption('children', 'd')}>
													-
												</button>
												<span className="optionCounterNumber">{options.children}</span>
												<button className="optionCounterButton" onClick={() => handleOption('children', 'i')}>
													+
												</button>
											</div>
										</div>
										<div className="optionItem">
											<span className="optionText">Số phòng</span>
											<div className="optionCounter">
												<button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption('room', 'd')}>
													-
												</button>
												<span className="optionCounterNumber">{options.room}</span>
												<button className="optionCounterButton" onClick={() => handleOption('room', 'i')}>
													+
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="headerSearchItem">
								<button className="headerBtn" onClick={handleSearch}>
									Tìm kiếm
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
