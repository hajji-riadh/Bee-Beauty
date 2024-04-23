import "./Home.css";
import banner_makeup from "../../assets/banner_makeup.gif";
import banner_visage from "../../assets/pnk.png";
import banner_champoin from "../../assets/banner_douche.gif";
import banner_parfum from "../../assets/banner_parfum.gif";

const Home = () => {
  return (
    <div className="home-admin">
      <h1>Bienvenue sur le site de l'administration</h1>
      <h2>Vous pouvez ajouter, supprimer des produits</h2>  
      <h2>Vous pouvez ajouter, modifier et supprimer des utilisateurs</h2>
      <h2>Vous pouvez ajouter, modifier et supprimer des livreurs</h2>
      <hr />
      <div className="homeadmin-banner">
        <h3>Maquillage de bannière dans le site</h3>
        <img src={banner_makeup} alt="" />
        <hr />
        <h3>Visage de bannière dans le site</h3>
        <img src={banner_visage} alt="" width={500} />
        <hr />
        <h3>Champoin de bannière dans le site</h3>
        <img src={banner_champoin} alt="" width={500} />
        <hr />
        <h3>Parfun de bannière dans le site</h3>
        <img src={banner_parfum} alt="" width={500} />
      </div>
    </div>
  );
};

export default Home;
