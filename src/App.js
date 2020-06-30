import React, { useState, useCallback, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import { AuthContext } from './shared/context/auth-context';
import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(null);


	const login = useCallback((uid, token) => {
		setToken(token);
		localStorage.setItem('userData', JSON.stringify({userId: uid, token}));
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('userData')
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token) {
			login(storedData.userId, storedData.token);
		}
	}, [login])

	let routes;

	if(token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/new" exact>
					<NewPlace />
				</Route>
				<Route path="/places/:placeId" exact>
					<UpdatePlace />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/auth" exact>
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider 
			value={{
				isLoggedIn: !!token, 
				token,
				userId,
				login, 
				logout
			}}>
			<Router>
				<MainNavigation />
				<main>
					{routes}
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
