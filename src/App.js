import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import Login from './containers/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import About from './containers/About/About';
import NotFound from './containers/NotFound/NotFound';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // 'Logout' Button functionality

	return (
		<AuthProvider>
			<BrowserRouter>
				<Header
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
				/>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/login'
						element={<Login
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route
						path='/about'
						element={<About />}
					/>
					<Route
						path='/admin'
						element={
							<RequireAuth loginPath={'/login'}>
								<Admin />
							</RequireAuth>} />
					<Route
						path='/*'
						element={<NotFound />}
					/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</AuthProvider>
	)
};


export default App;
