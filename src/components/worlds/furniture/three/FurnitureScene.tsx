"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import WorkTable from "./WorkTable";

export default function FurnitureScene({ finish, onReady }: { finish: string; onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0.2, 1.6, 8.6], fov: 28 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.55, 0)}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        {/* Studio rig: warm key, cool rim, soft fill — tuned for stained wood on a light page */}
        <ambientLight intensity={0.55} />
        <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#cfd3dc" />
        <directionalLight position={[4, 6, 4]} intensity={2.1} color="#fff4e6" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 3, -3]} intensity={0.9} color="#a5b4fc" />
        <pointLight position={[-3, 2, 4]} intensity={14} color="#e0f2fe" />
        <spotLight position={[0, 6, 5]} angle={0.45} penumbra={1} intensity={1.4} />

        <WorkTable finish={finish} onReady={onReady} />

        <ContactShadows position={[0, -1.72, 0]} opacity={0.4} scale={10} blur={2.4} far={3.2} color="#1a1410" />
      </Suspense>
    </Canvas>
  );
}
