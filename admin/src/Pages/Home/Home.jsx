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
      <h2>Vous pouvez ajouter, supprimer des utilisateurs</h2>
      <h2>Vous pouvez ajouter, supprimer des livreurs</h2>
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
      {/* <div className="configuration-admin">
        <h3>Configuration de l'administration</h3>
        <p>Vous pouvez modifier les informations de l'administration</p>
        <p>Vous pouvez ajouter, supprimer des produits</p>
        <p>Vous pouvez ajouter, supprimer des livreurs</p>
        <p>Vous pouvez ajouter, supprimer des utilisateurs</p>
        <hr />
      </div> */}
      <hr />
      {/* <div className="home-admin-footer">
        <p>
          Site crée par <span>Bee Coders</span>
        </p>
        <p>2024</p>
        <p>Tous droits réservés</p>
        <p>Contact : XXXXXXXXXXXXXXXX</p>
        <p>Tel : 065645656</p>
        <p>Adresse : Rue de la paix, Ariana</p>
        <p>Code postal : 75015</p>
        <p>Ville : Ariana</p>
        <p>Pays : Tunis</p>
        <p>Site web : www.beecoders.com</p>
        <p>Facebook : facebook.com/beecodres</p>
        <p>Instagram : instagram.com/beecoders</p>
        <p>Twitter : twitter.com/beecoders</p>
        <p>Linkedin : linkedin.com/beecoders</p>
        <p>Youtube : youtube.com/beecoders</p> 
        <p>Tiktok : tiktok.com/beecoders</p>
      </div> */}
    </div>
  );
};

export default Home;
