import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNext = () => {
    if (loading) return;

    setLoading(true);

    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${nextPage}/20`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(users, nextPage);
        setUsers([...users, ...data.list]);
        setNextPage(nextPage + 1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <UserList
      fetchNext={fetchNext}
      users={users}
      onClick={(user) => navigate(`user/${user.id}`)}
    />
  );
}

export default Users;
