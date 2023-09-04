import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

const UsersWidget = ({ searchName }) => {
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    const response = await fetch(
      `http://localhost:3001/users/searchfriends/${searchName}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    searchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {users.map(
        ({
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        }) => (
          <WidgetWrapper m="2rem 0" 
          key={_id}>
            <Friend
              friendId={_id}
              subtitle={occupation}
              name={`${firstName} ${lastName}`}
              userPicturePath={picturePath}
            />
          </WidgetWrapper>
        )
      )}
    </>
  );
};

export default UsersWidget;
