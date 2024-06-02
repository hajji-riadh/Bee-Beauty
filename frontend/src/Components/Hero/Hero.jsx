import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import hero_image from "../Assets/hero_banner.jpg";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NOUVEAUTÉS UNIQUEMENT</h2>
        <div>
          <div className="hero-hand-icon">
            <p>neuf</p>
            <img src={hand_icon} alt="" width={20} />
          </div>
          <p>collections</p>
          <p>pour tout le monde</p>
        </div>
        <div className="hero-latest-btn">
          <div>Dernière collection</div>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" width={200} />
        <img src={hero_image} alt="" width={200} />
      </div>
    </div>
  );
};
