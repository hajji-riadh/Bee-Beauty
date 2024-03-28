import "./ListUsers.css";
import { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";

const ListUsers = () => {
  const [allusers, setAllUsers] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allusers")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_user = async (id) => {
    await fetch("http://localhost:4000/removeuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  
  return (
    <div className="list-users">
      <h1>Liste de tous les utilisareurs</h1>
      <div className="listusers-format-main">
        <p>Nom</p>
        <p>Email</p>
        <p>Mot de passe</p>
        <p>Numéro</p>
        <p>Retirer</p>
      </div>
      <div className="listusers-allusers">
        <hr />
        {allusers.map((user, i) => {
          return (
            <>
              <div key={i} className="listusers-format-main listusers-format">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.password}</p>
                <p>{user.phone}</p>
                <img
                  onClick={() => {
                    remove_user(user.id);
                  }}
                  src={cross_icon}
                  alt=""
                  className="listusers-remove-icon"
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListUsers;
