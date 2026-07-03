"use client";

import { Html, OrbitControls, Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
const MODEL_PATH = "/images/field.glb";

type Hotspot = {
  id: string;
  label: string;
  href: string;
  position: [number, number, number];
};

const HOTSPOT: Hotspot[] = [
  {
    id: "Comunidade",
    label: "Comunidade",
    href: "/manifesto",
    position: [0, 0.1, 0],
  },
  {
    id: "circle numbers",
    label: "Circle Numbers",
    href: "/circle-numbers",
    position: [4.15, 0.1, 0],
  },
  {
    id: "contato",
    label: "Contato",
    href: "/contact",
    position: [5.2, 0.1, -3.3],
  },
  {
    id: "pesquisa",
    label: "Pesquisa",
    href: "/research",
    position: [-2, 0.1, -3],
  },
  {
    id: "Campo",
    label: "campo",
    href: "/campo",
    position: [-5, 0.1, 0],
  },
];

function PitchModel() {
  const { scene } = useGLTF(MODEL_PATH);

  return (
    <group>
      <Center>
        <primitive object={scene} scale={0.1} />
      </Center>
    </group>
  );
}

function HotspotMarker({ label, href, position }: Hotspot) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetY = position[1] + (isHovered ? 0.22 : 0);
    const targetScale = isHovered ? 1.08 : 1;

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.12,
    );

    const nextScale = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.12,
    );

    groupRef.current.scale.setScalar(nextScale);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial
          color={isHovered ? "#f4c000" : "#f8f8f8"}
          emissive={isHovered ? "#f4c000" : "#f8f8f8"}
          emissiveIntensity={isHovered ? 0.8 : 0.18}
        />
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.28, 12]} />
        <meshStandardMaterial
          color={isHovered ? "#f4c000" : "#f8f8f8"}
          opacity={isHovered ? 0.95 : 0.45}
          transparent
        />
      </mesh>

      <Html position={[0, 0.48, 0]} center distanceFactor={8}>
        <button
          type="button"
          onClick={() => router.push(href)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group min-w-[118px] bg-transparent px-1 py-2 text-center text-color-arnecke-white outline-none transition duration-300"
        >
          <span className="block font-systemia text-[13px] font-bold uppercase tracking-[-0.03em]">
            {label}
          </span>
          <span className="mx-auto mt-2 block h-px w-full bg-color-arnecke-white/30 transition-all duration-300 group-hover:w-2/3" />
        </button>
      </Html>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.7} />
      <directionalLight position={[6, 8, 6]} intensity={2.1} />
      <directionalLight position={[-6, 4, -3]} intensity={0.7} />

      <PitchModel />

      {HOTSPOT.map((hotspot) => (
        <HotspotMarker key={hotspot.id} {...hotspot} />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.95}
        maxPolarAngle={1.25}
        autoRotate
        autoRotateSpeed={0.45}
      />
    </>
  );
}

export function PitchNavigationPage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-color-arnecke-blue text-color-arnecke-white">
      <Canvas camera={{ position: [0, 7.2, 8.8], fov: 40 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </main>
  );
}

useGLTF.preload(MODEL_PATH);
