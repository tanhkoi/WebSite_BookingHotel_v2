import './style/dark.scss';
import New from './pages/new/New';
import List from './pages/list/List';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NewRoom from './pages/newRooms/NewRoom';
import NewHotel from './pages/newHotels/NewHotel';
import { useContext } from 'react';
import { userInputs } from './formSource';
import { AuthContext } from './context/AuthContext';
import { DarkModeContext } from './context/darkModeContext';
import { hotelColumns, roomColumns, userColumns } from './datatablesource';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
	const { darkMode } = useContext(DarkModeContext);

	const ProtectedRoute = ({ children }) => {
		const { user } = useContext(AuthContext);

		if (!user) {
			return <Navigate to="/login" />;
		}

		return children;
	};

	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route path="login" element={<Login />} />
						<Route
							index
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path="users">
							<Route
								index
								element={
									<ProtectedRoute>
										<List columns={userColumns} />
									</ProtectedRoute>
								}
							/>
							<Route path=":userId" element={<ProtectedRoute></ProtectedRoute>} />
							<Route
								path="new"
								element={
									<ProtectedRoute>
										<New inputs={userInputs} title="Add New User" />
									</ProtectedRoute>
								}
							/>
						</Route>
						<Route path="hotels">
							<Route
								index
								element={
									<ProtectedRoute>
										<List columns={hotelColumns} />
									</ProtectedRoute>
								}
							/>
							<Route path=":productId" element={<ProtectedRoute></ProtectedRoute>} />
							<Route
								path="new"
								element={
									<ProtectedRoute>
										<NewHotel />
									</ProtectedRoute>
								}
							/>
						</Route>
						<Route path="rooms">
							<Route
								index
								element={
									<ProtectedRoute>
										<List columns={roomColumns} />
									</ProtectedRoute>
								}
							/>
							<Route path=":productId" element={<ProtectedRoute></ProtectedRoute>} />
							<Route
								path="new"
								element={
									<ProtectedRoute>
										<NewRoom />
									</ProtectedRoute>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
