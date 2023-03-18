import React, { useCallback, useEffect, useRef, useState } from "react";
import UserList from "./UserList";

function UsersFriends({ userId, onNavigate }) {
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNext = useCallback(() => {
    if (loading) return;

    setLoading(true);

    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${nextPage}/20`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, ...data.list]);
        setNextPage(nextPage + 1);
      })
      .finally(() => setLoading(false));
  }, [users, nextPage, loading, userId]);

  useEffect(() => {
    setUsers([]);
    setNextPage(1);
  }, [userId]);

  useEffect(() => {
    if (nextPage === 1) {
      fetchNext();
    }
  }, [nextPage]);

  return (
    <>
      <UserList
        fetchNext={fetchNext}
        users={users}
        onClick={(user) => onNavigate(user)}
      />
    </>
  );
}

export default UsersFriends;
