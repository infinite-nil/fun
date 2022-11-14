import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Polygon(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [sides, setSides] = useState(3);
  const [speed, setSpeed] = useState(1);

  useFrame(() =>
    hovered
      ? (mesh.current.rotation.x -= 0.01 * speed)
      : (mesh.current.rotation.x += 0.01 * speed)
  );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      onClick={() => {
        setSides((current) => (current += 1));
        setSpeed((current) => (current += 0.5));
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <cylinderBufferGeometry args={[1, 1, 1, sides]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Home() {
  return (
    <Canvas style={{ width: window.innerWidth, height: window.innerHeight }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Polygon position={[-1.2, 0, 0]} />
      <Polygon position={[1.2, 0, 0]} />
    </Canvas>
  );
}

export default Home;
