import { v4 as uuid } from "uuid";

export const Timer = {
  id: uuid(),
  script: `
    <html style="height: 100%">
        <body style="height: 100%;margin: 0;">
            <div id='root' style="font-size: 3rem; font-family: sans-serif; font-weight: bold; color: white; height: 100%; display: flex; justify-content: center; align-items: center;"></div>
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

export const CanvasPattern = {
  id: uuid(),
  script: `
        <body style="overflow: hidden; margin: 0">
            <canvas id='drawing'></canvas>
            <script>
            const {clientHeight, clientWidth} = document.body
            const w = clientWidth;
            const h = clientHeight;
          
            const size = 20;
            const radius = 3*size;
          
            const columns = w / size;
            const rows = h / size;
          
            const canvas = document.getElementById("drawing");
            canvas.width = w;
            canvas.height = h;
          
            const ctx = canvas.getContext("2d");
            
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,canvas.width, canvas.height);
          
            for (let c = 0; c < columns; c++) {
              for (let r = 0; r < rows; r++) {
                ctx.beginPath();
                ctx.ellipse(
                  (c + 0.5) * size, // centre of grid column
                  (r + 0.5) * size, // centre of grid row
                  radius,
                  radius,
                  0,
                  0,
                  2 * Math.PI
                );
                ctx.stroke();
              }
            }
            </script>
        </body>`,
};
