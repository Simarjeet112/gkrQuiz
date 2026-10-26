import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { GeekroomMascotReaction } from './GeekroomMascotReaction';
import { sounds } from '../../utils/soundEffects';

function BitByte3DModel({
  mousePos,
  isSpinning,
  onTriggerSpin,
}: {
  mousePos: { x: number; y: number };
  isSpinning: boolean;
  onTriggerSpin: () => void;
}) {
  const headRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const spinAngle = useRef(0);

  useFrame((_, delta) => {
    // Holographic orbital rings
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.45;
      ringRef.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.35;
      ring2Ref.current.rotation.z -= delta * 0.25;
    }

    // Interactive mouse follow & click spin
    if (headRef.current) {
      if (isSpinning) {
        spinAngle.current += delta * 12;
        headRef.current.rotation.y = spinAngle.current;
      } else {
        spinAngle.current = 0;
        const targetRotY = mousePos.x * 0.55;
        const targetRotX = -mousePos.y * 0.4;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
      }
    }
  });

  return (
    <group position={[0, -0.15, 0]}>
      {/* Outer Holographic Tech Orbit Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.55} wireframe />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.015, 16, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.45} wireframe />
      </mesh>

      {/* Robot Character (Clickable) */}
      <group
        ref={headRef}
        onClick={(e) => {
          e.stopPropagation();
          onTriggerSpin();
        }}
      >
        {/* Head Helmet Shell */}
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[1.5, 1.25, 1.15]} />
          <meshStandardMaterial color="#090D17" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Dark Visor Screen */}
        <mesh position={[0, 0.36, 0.59]}>
          <boxGeometry args={[1.28, 0.78, 0.05]} />
          <meshStandardMaterial color="#020408" roughness={0.1} metalness={0.95} />
        </mesh>

        {/* Left Glowing White Eye (Logo Style) */}
        <mesh position={[-0.34, 0.38, 0.63]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Right Glowing White Eye (Logo Style) */}
        <mesh position={[0.34, 0.38, 0.63]}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Left Geekroom Cyan < Bracket Ear */}
        <mesh position={[-0.92, 0.38, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.42, 0.09, 0.16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[-0.92, 0.38, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.42, 0.09, 0.16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
        </mesh>

        {/* Right Geekroom Cyan > Bracket Ear */}
        <mesh position={[0.92, 0.38, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.42, 0.09, 0.16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[0.92, 0.38, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.42, 0.09, 0.16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
        </mesh>

        {/* Center Orange Keyboard Slash on Top Antenna */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.035, 0.045, 0.35, 12]} />
          <meshStandardMaterial color="#FF6B00" metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.5} />
        </mesh>

        {/* Cyber Neck Collar */}
        <mesh position={[0, -0.34, 0]}>
          <cylinderGeometry args={[0.38, 0.44, 0.18, 24]} />
          <meshStandardMaterial color="#161F36" metalness={0.7} />
        </mesh>

        {/* Robot Chassis / Upper Torso */}
        <mesh position={[0, -0.78, 0]}>
          <boxGeometry args={[1.35, 0.7, 0.95]} />
          <meshStandardMaterial color="#090D17" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Center Orange Keyboard Slash Stripe across Chest */}
        <mesh position={[0, -0.75, 0.49]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.08, 0.5, 0.03]} />
          <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.2} />
        </mesh>

        {/* Left Core Cyan Bracket */}
        <mesh position={[-0.24, -0.75, 0.49]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.06, 0.22, 0.03]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
        </mesh>

        {/* Right Core Cyan Bracket */}
        <mesh position={[0.24, -0.75, 0.49]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.06, 0.22, 0.03]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
}

// Error Boundary for WebGL fallback
class ThreeErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export const Geekroom3DMascot: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTriggerSpin = () => {
    if (isSpinning) return;
    sounds.playSelect();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 900);
  };

  const fallback2D = (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <GeekroomMascotReaction
        size="lg"
        mood="welcome"
        message="I'm BitByte, your Code Arena companion! Let's conquer the challenge!"
      />
    </div>
  );

  if (!webGLSupported) {
    return fallback2D;
  }

  return (
    <ThreeErrorBoundary fallback={fallback2D}>
      <div className={`relative w-full h-80 sm:h-96 md:h-[430px] select-none ${className}`}>
        <Canvas
          camera={{ position: [0, 0.4, 4.3], fov: 40 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 6, 4]} intensity={1.8} color="#FFFFFF" />
          <pointLight position={[-4, 2, 2]} intensity={2.8} color="#00F0FF" />
          <pointLight position={[4, -2, 2]} intensity={2.5} color="#FF6B00" />
          <pointLight position={[0, -3, -2]} intensity={1.5} color="#8B5CF6" />

          <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.45}>
            <BitByte3DModel
              mousePos={mousePos}
              isSpinning={isSpinning}
              onTriggerSpin={handleTriggerSpin}
            />
          </Float>
        </Canvas>

        {/* Mascot Interactive HUD pill */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={handleTriggerSpin}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080B12]/90 border border-arena-cyan/30 backdrop-blur-md text-[11px] font-mono text-arena-cyan hover:border-arena-cyan hover:scale-105 transition-all shadow-glow-cyan"
            title="Click BitByte to interact!"
          >
            <span className="w-2 h-2 rounded-full bg-arena-cyan animate-pulse" />
            <span>BITBYTE // GKR-01 (CLICK TO SPIN)</span>
          </button>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
};
