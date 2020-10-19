import React from "react";
import useUsers from "./UserUsers";

function Users() {
  const { users, searching } = useUsers();

  return (
    <>
      users
      <ul>
        {searching
          ? "Searching..."
          : users.map((user) => <li key={user.userId}>{user.userId},{user.firstName},{user.lastName},{user.email},</li>
          )}
      </ul>
    </>
  );
}

export default Users;