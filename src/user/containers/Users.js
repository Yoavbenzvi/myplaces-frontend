import React from 'react';
import UsersList from '../components/UsersList/UsersList';

const Users = () => {
	const MOCK_USERS = [
		{id: 'u1', name: 'Jane Doe', places: 3, image:'https://vignette.wikia.nocookie.net/blindspot/images/c/cc/Janeportrait1.png/revision/latest/top-crop/width/360/height/360?cb=20170328005601'}
	]

	return( 
		<UsersList items={MOCK_USERS}/>
	);
};

export default Users;
