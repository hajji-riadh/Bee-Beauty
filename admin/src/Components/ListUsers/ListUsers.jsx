import "./ListUsers.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const remove_user = async (email) => {
    await fetch("http://localhost:4000/removeuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-users">
      <h1>Liste de tous les utilisateurs</h1>
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
              <div key={i} className="listusers-format">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.password}</p>
                <p>{user.phone}</p>
                <div className="removeuser">
                  <button
                    className="btn-removeuser"
                    onClick={() => remove_user(user.email)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
      <div className="adduser">
        <h3>Pour ajouter un nouvelle utilisateur :</h3>
        <Link to={"/adduser"} style={{ textDecoration: "none" }}>
          <button className="btn-adduser">Ajouter</button>
        </Link>
      </div>
      <div className="updateuser">
        <h3>Pour modifier un utilisateur :</h3>
        <Link to={"/updateuser"} style={{ textDecoration: "none" }}>
          <button className="btn-updateuser">Modifier</button>
        </Link>
      </div>
    </div>
  );
};

export default ListUsers;
