import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { GeekroomMascotReaction } from './GeekroomMascotReaction';

// Mascot 3D Mesh Component
function RobotModel({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Gentle floating and subtle rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.3;
      ring2Ref.current.rotation.z -= delta * 0.2;
    }

    // Interactive head tracking towards mouse position
    if (headRef.current) {
      const targetRotY = mousePos.x * 0.45;
      const targetRotX = -mousePos.y * 0.35;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Outer Hologram Orbiting Tech Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} wireframe />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.015, 16, 64]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} wireframe />
      </mesh>

      {/* Robot Head and Body */}
      <group ref={headRef}>
        {/* Helmet / Head Shell */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.5, 1.25, 1.2]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Visor Screen */}
        <mesh position={[0, 0.38, 0.61]}>
          <boxGeometry args={[1.25, 0.75, 0.05]} />
          <meshStandardMaterial
            color="#020617"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Left Glowing Neon Eye */}
        <mesh position={[-0.32, 0.4, 0.65]}>
          <capsuleGeometry args={[0.09, 0.14, 8, 16]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={2.8}
            toneMapped={false}
          />
        </mesh>

        {/* Right Glowing Neon Eye */}
        <mesh position={[0.32, 0.4, 0.65]}>
          <capsuleGeometry args={[0.09, 0.14, 8, 16]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={2.8}
            toneMapped={false}
          />
        </mesh>

        {/* Left Cyber Ear / Headphone */}
        <mesh position={[-0.82, 0.4, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[-0.92, 0.4, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
        </mesh>

        {/* Right Cyber Ear / Headphone */}
        <mesh position={[0.82, 0.4, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0.92, 0.4, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
        </mesh>

        {/* Top Antenna */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.35, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={3} />
        </mesh>

        {/* Cyber Neck Collar */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 0.18, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} />
        </mesh>

        {/* Robot Chassis / Upper Torso */}
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[1.3, 0.65, 0.9]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Torso Center Core Emblem */}
        <mesh position={[0, -0.72, 0.46]}>
          <cylinderGeometry args={[0.16, 0.16, 0.05, 6]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2.5} />
        </mesh>
      </group>
    </group>
  );
}

// Error Boundary Wrapper for WebGL failure
class ThreeErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn('[3D Mascot] WebGL unavailable, using 2D fallback', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const Geekroom3DMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to [-1, 1] relative to viewport center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webGLSupported) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <GeekroomMascotReaction
          size="lg"
          mood="welcome"
          message="Ready to dominate the Code Arena? Let's go!"
        />
      </div>
    );
  }

  return (
    <ThreeErrorBoundary
      fallback={
        <div className={`flex flex-col items-center justify-center ${className}`}>
          <GeekroomMascotReaction
            size="lg"
            mood="welcome"
            message="Welcome to Geekroom GTBIT Code Arena!"
          />
        </div>
      }
    >
      <div className={`relative w-full h-80 sm:h-96 md:h-[420px] select-none ${className}`}>
        <Canvas
          camera={{ position: [0, 0.4, 4.2], fov: 42 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Lights */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, 2, 2]} intensity={2.5} color="#8b5cf6" />
          <pointLight position={[4, -2, 2]} intensity={2.5} color="#00ff88" />
          <pointLight position={[0, -3, -2]} intensity={1.0} color="#06b6d4" />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
            <RobotModel mousePos={mousePos} />
          </Float>
        </Canvas>

        {/* Mascot Status Badge Underneath */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-arena-card/80 border border-arena-border backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-arena-greenNeon animate-pulse" />
            <span>GKR-01 // BOT COMPANION ONLINE</span>
          </div>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
};
