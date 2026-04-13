"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function MoonScene() {
  const [moonTexture, moonDisplacement] = useTexture([
    "/textures/moon/moon2k.jpg",
    "/textures/moon/moon_displacement.jpg"
  ]);

  useEffect(() => {
    if (moonTexture) {
      moonTexture.wrapS = THREE.RepeatWrapping;
      moonTexture.wrapT = THREE.ClampToEdgeWrapping;
      moonTexture.anisotropy = 16;
      moonTexture.needsUpdate = true;
    }
    if (moonDisplacement) {
      moonDisplacement.wrapS = THREE.RepeatWrapping;
      moonDisplacement.wrapT = THREE.ClampToEdgeWrapping;
      moonDisplacement.anisotropy = 16;
      moonDisplacement.needsUpdate = true;
    }
  }, [moonTexture, moonDisplacement]);

  const rotationRef = useRef<THREE.Group>(null);
  const parallaxRef = useRef<THREE.Group>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Tracking del mouse normalizado a [-1, 1]
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (rotationRef.current) {
      // Rotación Y constante
      rotationRef.current.rotation.y += 0.0006;
    }

    if (parallaxRef.current) {
      // Lerp suave hacia posición del mouse
      const targetX = -mousePos.y * 0.5;
      const targetY = mousePos.x * 0.6;
      parallaxRef.current.rotation.x +=
        (targetX - parallaxRef.current.rotation.x) * 0.04;
      parallaxRef.current.rotation.y +=
        (targetY - parallaxRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight position={[5, 2, 3]} intensity={2.5} color="#ffffff" />


      <group ref={parallaxRef} position={[0.8, 0, 0]}>
        <group ref={rotationRef}>
          {/* Luna principal */}
          <mesh>
            <sphereGeometry args={[1.5, 256, 256]} />
            <meshStandardMaterial
              map={moonTexture}
              displacementMap={moonDisplacement}
              displacementScale={0.04}
              displacementBias={-0.02}
              roughness={1}
              metalness={0}
            />
          </mesh>

        </group>
      </group>
    </>
  );
}

export default function SceneCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <MoonScene />
      </Canvas>
    </div>
  );
}
