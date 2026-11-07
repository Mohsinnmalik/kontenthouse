import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Sculpture() {
  const grp = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((state, delta) => {
    if (!grp.current) return;
    // Ambient rotation
    grp.current.rotation.y += delta * 0.22;
    // Interactive mouse lerping
    grp.current.rotation.x = THREE.MathUtils.lerp(grp.current.rotation.x, target.current.y * 0.45, 0.05);
    grp.current.rotation.z = THREE.MathUtils.lerp(grp.current.rotation.z, target.current.x * 0.35, 0.05);
  });

  return (
    <group ref={grp}>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Outer acid wireframe icosahedron */}
        <mesh>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#D4FF00" wireframe transparent opacity={0.75} />
        </mesh>

        {/* Inner liquid distorting obsidian core */}
        <mesh scale={0.82}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#141418"
            distort={0.48}
            speed={2.4}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        {/* Satellite Amber Torus */}
        <mesh position={[2.7, 1.4, -1]} scale={0.36}>
          <torusGeometry args={[1, 0.35, 16, 48]} />
          <meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.6} />
        </mesh>

        {/* Satellite Acid Octahedron */}
        <mesh position={[-2.5, -1.7, -0.6]} scale={0.25}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#D4FF00" wireframe transparent opacity={0.7} />
        </mesh>

        {/* Cyber ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]} scale={2.4}>
          <ringGeometry args={[0.98, 1, 64]} />
          <meshBasicMaterial color="#D4FF00" wireframe transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 3, 4]} intensity={90} color="#D4FF00" />
        <pointLight position={[-4, -2, 2]} intensity={40} color="#F59E0B" />
        <Sculpture />
        <Sparkles count={90} scale={[8, 5, 4]} size={2.2} speed={0.4} color="#D4FF00" opacity={0.6} />
      </Canvas>
    </div>
  );
}

