import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── The Levitating God Particle Core with Accretion Disk ──
const GodParticleMesh: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Points>(null);
  const ringRef2 = useRef<THREE.Points>(null);
  const ringRef3 = useRef<THREE.Points>(null);

  // Generate particle accretion disk
  const [particles1, particles2] = useMemo(() => {
    const count1 = 1200;
    const pos1 = new Float32Array(count1 * 3);
    for (let i = 0; i < count1; i++) {
      const theta = (i / count1) * Math.PI * 2 + Math.random() * 0.1;
      const radius = 2.2 + Math.random() * 1.6;
      pos1[i * 3] = Math.cos(theta) * radius;
      pos1[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos1[i * 3 + 2] = Math.sin(theta) * radius;
    }

    const count2 = 800;
    const pos2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      const theta = (i / count2) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 2.8;
      pos2[i * 3] = Math.cos(theta) * radius;
      pos2[i * 3 + 1] = Math.sin(theta) * radius;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    return [pos1, pos2];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
      const scale = 1 + Math.sin(t * 2.5) * 0.04;
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.y += delta * 0.6;
      ringRef1.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z += delta * 0.4;
      ringRef2.current.rotation.y = Math.cos(t * 0.4) * 0.25;
    }

    if (ringRef3.current) {
      ringRef3.current.rotation.x += delta * 0.5;
      ringRef3.current.rotation.z = Math.sin(t * 0.6) * 0.2;
    }
  });

  return (
    <group>
      {/* ── Central Black Hole / Dark Matter Sphere ── */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshStandardMaterial
          color="#010403"
          roughness={0.2}
          metalness={0.9}
          emissive="#064e3b"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* ── Outer Event Horizon Glow Sphere ── */}
      <mesh>
        <sphereGeometry args={[1.22, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── Primary Horizontal Accretion Disk (Emerald / Cyan) ── */}
      <points ref={ringRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles1, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#34d399"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Secondary Vertical Distortion Ring (Electric Blue) ── */}
      <points ref={ringRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles2, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Ambient Lights ── */}
      <pointLight position={[0, 0, 0]} color="#10b981" intensity={3} distance={8} />
      <pointLight position={[3, 3, 3]} color="#38bdf8" intensity={1.5} />
      <pointLight position={[-3, -3, -3]} color="#f59e0b" intensity={0.8} />
    </group>
  );
};

export const DarkGodParticle3D: React.FC = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#020b08] via-[#041912] to-[#010604] border-2 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.25)]">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <GodParticleMesh />
      </Canvas>

      {/* Atmospheric Vignette & Scanlines */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>GOTTESPARTIKEL // 2052 CESIUM-137 ANOMALY</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-right font-mono text-[10px] text-emerald-400/80">
        <span>STABILIZATION: 99.8% • 33-YEAR WORMHOLE ACTIVE</span>
      </div>
    </div>
  );
};
