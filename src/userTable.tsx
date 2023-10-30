import React, { useState } from 'react';
import './style.css';
const UserTable = ({ users, setUsers }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const handleCheckboxClick = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((userId) => userId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => !selected.includes(user.id));
    setUsers(updatedUsers);
    setSelected([]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setSelected(selected.filter((userId) => userId !== id));
  };
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const startIdx = page * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const usersToDisplay = filteredUsers.slice(startIdx, endIdx);

  return (
    <div className="UserTable">
      <input
        type="text"
        placeholder="Search users \ email \ role.."
        value={search}
        onChange={handleSearchChange}
      />

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === usersToDisplay.length}
                onChange={() => {
                  if (selected.length === usersToDisplay.length) {
                    setSelected([]);
                  } else {
                    setSelected(usersToDisplay.map((user) => user.id));
                  }
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay?.length === 0 ? (
            <tr>
              <td colSpan="4">Nothing to show</td>
            </tr>
          ) : (
            usersToDisplay.map((user) => (
              <tr
                key={user.id}
                className={selected.includes(user.id) ? 'selected' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(user.id)}
                    onChange={() => handleCheckboxClick(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                  <button onClick={() => console.log(user.id)}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div>
        <button onClick={() => setSelected([])}>Clear Selection</button>
        <button onClick={handleDeleteSelected}>Delete Selection</button>
      </div>

      <div className="pagination">
        <div>
          <button onClick={() => handlePageChange(0)} disabled={page === 0}>
            First
          </button>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={page === pageNumber}
              className={page === pageNumber ? 'current' : ''}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={endIdx >= filteredUsers.length}
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={page === totalPages - 1}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
