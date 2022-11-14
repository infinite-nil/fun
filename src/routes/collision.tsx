import { useRef } from "react";

const Collision = () => {
  const canvas = useRef(null);

  return (
    <canvas
      ref={canvas}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Collision;
