import { useInterval } from "usehooks-ts";
import { useEffect, useState } from "react";

export const Timer = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div
      data-testid="timer widget"
      className="text-5xl font-futura text-white font-bold h-full flex justify-center items-center"
    >
      {time}
    </div>
  );
};

export const RandomPokemon = () => {
  const [imgSource, setImgSource] = useState();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const randomPokemon =
          data.results[Math.floor(Math.random() * data.results.length)];

        return window.fetch(randomPokemon.url);
      })
      .then((response) => response.json())
      .then((data) => {
        const sprite = data.sprites.front_default;
        setImgSource(sprite);
      });
  }, []);

  return (
    <img
      data-testid="pokemon widget"
      src={imgSource}
      alt="random pokemon"
      className="object-contain w-full h-full"
    />
  );
};

export const RandomImage = () => {
  return (
    <img
      data-testid="random image widget"
      src="https://picsum.photos/600/300"
      alt="random pokemon"
      className="w-full h-full"
    />
  );
};
