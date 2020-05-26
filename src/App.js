import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
//added
import Authenticate from "./user/pages/Authenticate";
//added
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route path="/" exact>
						<Users />
					</Route>
					<Route path="/:userId/places" exact>
						<UserPlaces />
					</Route>
				{/*added*/}
					<Route path="/auth" exact>
						<Authenticate />
					</Route>
				{/*added*/}
					<Route path="/places/new" exact>
						<NewPlace />
					</Route>
					<Route path="/places/:placeId" exact>
						<UpdatePlace />
					</Route>
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
};

export default App;
