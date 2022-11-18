import { useEffect, useRef } from "react";

type SquareSolid = {
  w: number;
  h: number;
};

type CircleSolid = {
  r: number;
};

type SolidType = "square" | "circle";

type Solid<T extends SolidType> = {
  type: SolidType;
  rect: T extends "square" ? SquareSolid : CircleSolid;
  x: number;
  y: number;
};

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const OFFSET = 120;
const INITIAL = (HEIGHT - OFFSET) / 2 - 1;
const FPS_60 = 1000 / 60;

const solids: Solid<any>[] = [
  {
    type: "circle",
    x: 200,
    y: 300,
    rect: {
      r: 40,
    },
  },
  {
    type: "circle",
    x: 300,
    y: 150,
    rect: {
      r: 20,
    },
  },
  {
    type: "square",
    x: 300,
    y: 150,
    rect: {
      w: 10,
      h: 100,
    },
  },
];

const Collision = () => {
  const position = useRef(INITIAL);
  const backgroundCanvas = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  function getSquareLimit(solid: Solid<"square">, position: number) {
    return solid.x + solid.rect.w;
  }

  function getCircleLimit(solid: Solid<"circle">, position: number) {
    const c = Math.abs(solid.y - position) * Math.abs(solid.y - position);
    const h = solid.rect.r * solid.rect.r;
    const a = Math.sqrt(h - c);

    return solid.x + a;
  }

  function getStartX(position: number) {
    for (const solid of solids) {
      if (position > solid.y && position < solid.y + solid.rect.h) {
        return getSquareLimit(solid, position);
      } else if (
        position > solid.y - solid.rect.r &&
        position < solid.y + solid.rect.r
      ) {
        return getCircleLimit(solid, position);
      }
    }

    return 0;
  }

  function drawBackground(backgroundCanvas: CanvasRenderingContext2D) {
    solids.forEach((solid) => {
      if (solid.type === "square") {
        backgroundCanvas.fillStyle = "rgb(0,0,200)";
        backgroundCanvas.fillRect(solid.x, solid.y, solid.rect.w, solid.rect.h);
      }

      if (solid.type === "circle") {
        backgroundCanvas.fillStyle = "rgb(0,100,200)";
        backgroundCanvas.arc(solid.x, solid.y, solid.rect.r, 0, 2 * Math.PI);
        backgroundCanvas.fill();
      }
    });
  }

  function draw(canvas: CanvasRenderingContext2D, y: number = INITIAL) {
    canvas.clearRect(0, 0, WIDTH, HEIGHT);

    const position = y - OFFSET / 2;
    canvas.fillStyle = "rgb(200, 0, 0)";
    canvas.fillRect(getStartX(position), y - OFFSET / 2, WIDTH, 3);
  }

  useEffect(() => {
    const backgroundContext = backgroundCanvas.current?.getContext("2d");
    const context = canvas.current?.getContext("2d");

    if (backgroundContext) {
      drawBackground(backgroundContext);
    }

    if (context) {
      document.addEventListener("mousemove", (event) => {
        position.current = event.clientY;
      });

      setInterval(() => {
        console.time("draw");
        draw(context, position.current);
        console.timeEnd("draw");
      }, FPS_60);
    }
  }, [canvas.current]);

  return (
    <div
      style={{
        position: "relative",
        width: `${WIDTH - OFFSET}px`,
        height: `${HEIGHT - OFFSET}px`,
      }}
    >
      <canvas
        ref={backgroundCanvas}
        style={{
          position: "absolute",
          inset: 0,
          margin: `${OFFSET / 2}PX`,
        }}
        width={WIDTH - OFFSET}
        height={HEIGHT - OFFSET}
      ></canvas>
      <canvas
        ref={canvas}
        style={{
          position: "absolute",
          inset: 0,
          margin: `${OFFSET / 2}PX`,
        }}
        width={WIDTH - OFFSET}
        height={HEIGHT - OFFSET}
      ></canvas>
    </div>
  );
};

export default Collision;
