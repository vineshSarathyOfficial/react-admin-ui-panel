import React, { useEffect, useState } from 'react';
import UserTable from './userTable';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const fetchUser = () => {
    fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    )
      .then((res) => res.json())
      .then((res) => setUsers(res));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <UserTable users={users} setUsers={setUsers} />
    </div>
  );
}
