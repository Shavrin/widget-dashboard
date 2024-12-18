import { v4 as uuid } from "uuid";

export const Timer = {
  id: uuid(),
  script: `
    <html style="height: 100%">
        <body style="height: 100%;margin: 0;">
            <div id='root' style="font-size: 3rem; font-family: monospace; font-weight: bold; color: white; height: 100%; display: flex; justify-content: center; align-items: center;"></div>
        </body>
        <script>
            const el = document.getElementById("root");

            (function counter() {
                el.innerHTML = new Date().toLocaleTimeString();
                setTimeout(counter, 1000);
            })()
            
        </script>
    </html>`,
};

export const RandomPokemon = {
  id: uuid(),
  script: `
    <html style="height: 100%">
        <body style="overflow: hidden; margin: 0; height: 100%;">
            <div id='root' style="height: 100%"></div>
            <script>
                window.fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
                .then(response => response.json())
                .then((data) =>{
                    const randomPokemon =data.results[Math.floor(Math.random()*data.results.length)];
                    
                    window.fetch(randomPokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            const sprite = data.sprites.front_default;
                            document.getElementById("root").innerHTML = "<img style='height: 100%; width: 100%; object-fit: contain;' src='"  + sprite + "'/>" 
                    })
                })
                    
            </script>
        </body>
<html/>`,
};

export const RandomImage = {
  id: uuid(),
  script: `<html style="height: 100%">
   <body style="overflow: hidden; margin: 0; height: 100%;">
      <div id="root" style="height: 100%"></div>
      <script>
         window.fetch("https://picsum.photos/600/300").then(data =>{  
             document.getElementById("root").innerHTML = "<img style='height: 100%; width: 100%;' src='"  + data.url + "'/>"; })
      </script>
   </body>
<html/>`,
};
