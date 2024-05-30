import { Hero } from "../Components/Hero/Hero";
import { Popular } from "../Components/Popular/Popular";
import { Offers } from "../Components/Offers/Offers";
import { NewCollections } from "../Components/NewCollections/NewCollections";
import { NewsLetter } from "../Components/NewsLetter/NewsLetter";

export const Shop = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};
