import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
   const MOCK_USERS = [
      {
         id: 'u1',
         name: 'Jane Doe',
         image:
         'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png',
         places: 3
      }
   ];

   return <UsersList items={MOCK_USERS} />;
};

export default Users;
