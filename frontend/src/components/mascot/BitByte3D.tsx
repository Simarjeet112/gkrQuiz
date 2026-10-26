import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles as SparklesIcon,
  MessageSquare,
  Volume2,
  VolumeX,
  Zap,
  HelpCircle,
  Flame,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { BitByteMood, getBitByteDialogue, getRandomClickDialogue } from './bitbyteDialogue';
import { soundEffects } from '../../utils/soundEffects';

interface BitByte3DProps {
  mood?: BitByteMood;
  customMessage?: string;
  size?: 'hero' | 'companion' | 'mini';
  className?: string;
  showSpeech?: boolean;
  onMascotClick?: () => void;
  interactive?: boolean;
}

// Inner 3D Robot Mascot Model
function BitByteModel({
  mood,
  mousePos,
  isClicked,
  onTriggerClick,
}: {
  mood: BitByteMood;
  mousePos: { x: number; y: number };
  isClicked: boolean;
  onTriggerClick: () => void;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Group>(null);
  const rightEarRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Animation state references
  const spinAngle = useRef(0);
  const blinkTimer = useRef(0);
  const eyeScaleY = useRef(1);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Orbital Ring Rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }

    // 2. Eye Blinking System (blinks every 3.5s for 0.12s)
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.5) {
      eyeScaleY.current = 0.08;
      if (blinkTimer.current > 3.65) {
        eyeScaleY.current = 1.0;
        blinkTimer.current = 0;
      }
    } else {
      eyeScaleY.current = THREE.MathUtils.lerp(eyeScaleY.current, 1.0, 0.2);
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY.current;
      rightEyeRef.current.scale.y = eyeScaleY.current;

      // Subtle pupil tracking on cursor
      const pupilX = THREE.MathUtils.clamp(mousePos.x * 0.05, -0.04, 0.04);
      const pupilY = THREE.MathUtils.clamp(-mousePos.y * 0.04, -0.03, 0.03);
      leftEyeRef.current.position.x = -0.34 + pupilX;
      leftEyeRef.current.position.y = 0.38 + pupilY;
      rightEyeRef.current.position.x = 0.34 + pupilX;
      rightEyeRef.current.position.y = 0.38 + pupilY;
    }

    // 3. Head & Torso Rotation (Cursor tracking & State behaviors)
    if (headRef.current) {
      if (isClicked) {
        spinAngle.current += delta * 14;
        headRef.current.rotation.y = spinAngle.current;
      } else {
        spinAngle.current = 0;
        let targetRotY = mousePos.x * 0.45;
        let targetRotX = -mousePos.y * 0.3;
        let targetRotZ = 0;

        // Contextual head tilts
        if (mood === 'thinking') {
          targetRotZ = 0.18; // Pensive sideways head tilt
          targetRotY = -0.25;
          targetRotX = -0.15;
        } else if (mood === 'wrong_answer' || mood === 'defeat') {
          targetRotX = 0.25; // Drooping head
          targetRotZ = Math.sin(t * 2) * 0.08;
        } else if (mood === 'excited' || mood === 'victory') {
          targetRotZ = Math.sin(t * 8) * 0.12;
          targetRotY += Math.sin(t * 6) * 0.2;
        } else if (mood === 'low_time') {
          // Nervous jitter
          targetRotX += (Math.random() - 0.5) * 0.1;
          targetRotY += (Math.random() - 0.5) * 0.1;
        }

        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetRotZ, 0.08);
      }
    }

    // 4. Bracket Ears Articulation
    if (leftEarRef.current && rightEarRef.current) {
      if (mood === 'excited' || mood === 'victory') {
        const flap = Math.sin(t * 12) * 0.25;
        leftEarRef.current.rotation.z = flap;
        rightEarRef.current.rotation.z = -flap;
      } else if (mood === 'thinking') {
        leftEarRef.current.rotation.z = 0.2;
        rightEarRef.current.rotation.z = -0.05;
      } else if (mood === 'wrong_answer') {
        leftEarRef.current.rotation.z = -0.25; // Droop
        rightEarRef.current.rotation.z = 0.25;
      } else {
        leftEarRef.current.rotation.z = THREE.MathUtils.lerp(leftEarRef.current.rotation.z, 0, 0.1);
        rightEarRef.current.rotation.z = THREE.MathUtils.lerp(rightEarRef.current.rotation.z, 0, 0.1);
      }
    }

    // 5. Antenna Wiggle
    if (antennaRef.current) {
      const wiggleSpeed = mood === 'excited' || mood === 'speed_mode' ? 14 : 3;
      antennaRef.current.rotation.z = Math.sin(t * wiggleSpeed) * 0.1;
    }

    // 6. Floating Hands Kinematics
    if (leftHandRef.current && rightHandRef.current) {
      let lY = -0.65 + Math.sin(t * 2.5 + 1) * 0.04;
      let rY = -0.65 + Math.sin(t * 2.5) * 0.04;
      let lZ = 0.15;
      let rZ = 0.15;
      let rRotZ = 0;
      let lRotZ = 0;

      if (mood === 'welcome') {
        // Right hand wave!
        rY = 0.2 + Math.sin(t * 6) * 0.15;
        rZ = 0.45;
        rRotZ = Math.sin(t * 8) * 0.4 - 0.3;
      } else if (mood === 'excited' || mood === 'victory') {
        // Double fist-pumps up in the air!
        lY = 0.25 + Math.sin(t * 10) * 0.15;
        rY = 0.25 + Math.cos(t * 10) * 0.15;
        lZ = 0.4;
        rZ = 0.4;
      } else if (mood === 'thinking') {
        // Right hand pondering at chin
        rY = 0.05;
        rZ = 0.6;
        rRotZ = -0.4;
      } else if (mood === 'wrong_answer' || mood === 'defeat') {
        // Hands limp and drooping low
        lY = -0.9;
        rY = -0.9;
        lRotZ = -0.2;
        rRotZ = 0.2;
      } else if (mood === 'low_time') {
        // Hands trembling frantically near head
        lY = 0.05 + (Math.random() - 0.5) * 0.08;
        rY = 0.05 + (Math.random() - 0.5) * 0.08;
        lZ = 0.45;
        rZ = 0.45;
      } else if (mood === 'speed_mode') {
        // Hands swept back like rocket boosters
        lZ = -0.35;
        rZ = -0.35;
        lY = -0.55;
        rY = -0.55;
      }

      leftHandRef.current.position.y = THREE.MathUtils.lerp(leftHandRef.current.position.y, lY, 0.12);
      rightHandRef.current.position.y = THREE.MathUtils.lerp(rightHandRef.current.position.y, rY, 0.12);
      leftHandRef.current.position.z = THREE.MathUtils.lerp(leftHandRef.current.position.z, lZ, 0.12);
      rightHandRef.current.position.z = THREE.MathUtils.lerp(rightHandRef.current.position.z, rZ, 0.12);
      leftHandRef.current.rotation.z = THREE.MathUtils.lerp(leftHandRef.current.rotation.z, lRotZ, 0.12);
      rightHandRef.current.rotation.z = THREE.MathUtils.lerp(rightHandRef.current.rotation.z, rRotZ, 0.12);
    }

    // 7. Overall Hover Bounce
    if (rootRef.current) {
      let floatSpeed = 2.2;
      let floatHeight = 0.08;
      if (mood === 'excited' || mood === 'speed_mode') {
        floatSpeed = 7.0;
        floatHeight = 0.18;
      } else if (mood === 'low_time') {
        floatSpeed = 12.0;
        floatHeight = 0.04;
      }
      rootRef.current.position.y = Math.sin(t * floatSpeed) * floatHeight;
    }
  });

  // Dynamic eye colors depending on mood
  const eyeColor = useMemo(() => {
    switch (mood) {
      case 'tough':
      case 'low_time':
        return '#FF0055'; // Intense warning red / crimson
      case 'speed_mode':
        return '#00F0FF'; // Hyper cyan
      case 'excited':
      case 'victory':
        return '#10B981'; // Celebratory neon emerald
      case 'wrong_answer':
        return '#38BDF8'; // Soft desaturated cyan
      default:
        return '#FFFFFF'; // Crisp luminous white (official Geekroom eye color)
    }
  }, [mood]);

  return (
    <group ref={rootRef} position={[0, -0.05, 0]}>
      {/* Outer Holographic Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={mood === 'tough' ? '#FF0055' : mood === 'speed_mode' ? '#00F0FF' : '#8B5CF6'}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>

      {/* Main Clickable Character Group */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onTriggerClick();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* HEAD & VISOR GROUP */}
        <group ref={headRef}>
          {/* Main Rounded Helmet Chassis */}
          <RoundedBox args={[1.42, 1.18, 1.1]} radius={0.25} smoothness={4} position={[0, 0.38, 0]}>
            <meshStandardMaterial
              color="#0A0F1D"
              roughness={0.2}
              metalness={0.85}
              envMapIntensity={1.2}
            />
          </RoundedBox>

          {/* Recessed Dark Visor Plate */}
          <RoundedBox args={[1.22, 0.76, 0.08]} radius={0.16} smoothness={4} position={[0, 0.36, 0.54]}>
            <meshStandardMaterial
              color="#020307"
              roughness={0.08}
              metalness={0.95}
            />
          </RoundedBox>

          {/* Dynamic Digital Left Eye */}
          <mesh ref={leftEyeRef} position={[-0.34, 0.38, 0.59]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={2.8}
              toneMapped={false}
            />
          </mesh>

          {/* Dynamic Digital Right Eye */}
          <mesh ref={rightEyeRef} position={[0.34, 0.38, 0.59]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={2.8}
              toneMapped={false}
            />
          </mesh>

          {/* Geekroom < Left Bracket Ear */}
          <group ref={leftEarRef} position={[-0.88, 0.38, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.38, 0.08, 0.15]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.38, 0.08, 0.15]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
            </mesh>
          </group>

          {/* Geekroom > Right Bracket Ear */}
          <group ref={rightEarRef} position={[0.88, 0.38, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.38, 0.08, 0.15]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.38, 0.08, 0.15]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
            </mesh>
          </group>

          {/* Geekroom Orange / Keyboard Slash Antenna */}
          <group ref={antennaRef} position={[0, 1.05, 0]}>
            <mesh rotation={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.035, 0.045, 0.32, 16]} />
              <meshStandardMaterial color="#FF6B00" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0.04, 0.22, 0]}>
              <sphereGeometry args={[0.08, 20, 20]} />
              <meshStandardMaterial
                color="#FF6B00"
                emissive="#FF6B00"
                emissiveIntensity={3.0}
                toneMapped={false}
              />
            </mesh>
          </group>

          {/* Sleek Cyber Collar Ring */}
          <mesh position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.36, 0.44, 0.16, 24]} />
            <meshStandardMaterial color="#17223B" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* TORSO & CHASSIS */}
        <group position={[0, -0.72, 0]}>
          <RoundedBox args={[1.15, 0.65, 0.88]} radius={0.18} smoothness={4}>
            <meshStandardMaterial color="#0A0F1D" metalness={0.8} roughness={0.25} />
          </RoundedBox>

          {/* Geekroom Chest Emblem (< / >) */}
          <mesh position={[0, 0.02, 0.45]} rotation={[0, 0, -0.15]}>
            <boxGeometry args={[0.07, 0.4, 0.02]} />
            <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.2} />
          </mesh>
          <mesh position={[-0.2, 0.02, 0.45]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.05, 0.18, 0.02]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
          </mesh>
          <mesh position={[0.2, 0.02, 0.45]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[0.05, 0.18, 0.02]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
          </mesh>

          {/* Lower Floating Thruster Ring */}
          <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.34, 0.05, 16, 32]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* FLOATING CUTE HANDS */}
        {/* Left Hand */}
        <group ref={leftHandRef} position={[-0.85, -0.65, 0.15]}>
          <RoundedBox args={[0.24, 0.4, 0.22]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color="#16223B" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* Right Hand */}
        <group ref={rightHandRef} position={[0.85, -0.65, 0.15]}>
          <RoundedBox args={[0.24, 0.4, 0.22]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color="#16223B" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Error Boundary for WebGL Fallback
class BitByteErrorBoundary extends React.Component<
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

export const BitByte3D: React.FC<BitByte3DProps> = ({
  mood = 'idle',
  customMessage,
  size = 'companion',
  className = '',
  showSpeech = true,
  onMascotClick,
  interactive = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [dialogue, setDialogue] = useState<string>('');
  const [clickCount, setClickCount] = useState(0);

  // Check WebGL availability
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

  // Sync Dialogue on Mood or Custom Message Change
  useEffect(() => {
    if (customMessage) {
      setDialogue(customMessage);
    } else {
      setDialogue(getBitByteDialogue(mood));
    }
  }, [mood, customMessage]);

  const handleMascotClick = () => {
    if (!interactive) return;
    soundEffects.playSelect();
    setIsClicked(true);
    setClickCount((c) => c + 1);

    // Pick a fun Easter egg line occasionally
    const newLine = clickCount % 2 === 1 ? getRandomClickDialogue() : getBitByteDialogue(mood);
    setDialogue(newLine);

    if (onMascotClick) {
      onMascotClick();
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 850);
  };

  // Dimensions based on size
  const containerDimensions = {
    hero: 'w-full h-[360px] sm:h-[420px] md:h-[480px]',
    companion: 'w-full h-[220px] sm:h-[260px]',
    mini: 'w-36 h-36',
  }[size];

  const cameraFov = size === 'hero' ? 38 : size === 'companion' ? 36 : 42;
  const cameraZ = size === 'hero' ? 4.3 : size === 'companion' ? 4.5 : 4.0;

  // Mood Badge Icon
  const moodBadge = useMemo(() => {
    switch (mood) {
      case 'excited':
      case 'victory':
        return { label: 'CELEBRATING!', icon: <Flame className="w-3.5 h-3.5 text-amber-400" />, color: 'border-amber-400/50 text-amber-300' };
      case 'speed_mode':
        return { label: 'SPEED BOOST', icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />, color: 'border-cyan-400/50 text-cyan-300' };
      case 'low_time':
        return { label: 'CRITICAL TIME', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />, color: 'border-rose-500/50 text-rose-300' };
      case 'thinking':
        return { label: 'ANALYZING', icon: <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />, color: 'border-emerald-400/50 text-emerald-300' };
      case 'leaderboard':
        return { label: 'LEADERBOARD', icon: <Award className="w-3.5 h-3.5 text-amber-400" />, color: 'border-amber-400/50 text-amber-300' };
      default:
        return { label: 'BITBYTE ONLINE', icon: <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" />, color: 'border-cyan-400/40 text-cyan-300' };
    }
  }, [mood]);

  // Graceful 2D Fallback if WebGL unavailable
  const fallback2D = (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="w-24 h-24 rounded-2xl bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
        <SparklesIcon className="w-10 h-10 animate-pulse" />
      </div>
      <p className="text-xs font-mono text-cyan-300 mt-2 font-bold">{dialogue}</p>
    </div>
  );

  if (!webGLSupported) {
    return fallback2D;
  }

  return (
    <BitByteErrorBoundary fallback={fallback2D}>
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        {/* Dynamic Contextual Speech Bubble */}
        {showSpeech && (
          <AnimatePresence mode="wait">
            <motion.div
              key={dialogue}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={handleMascotClick}
              className="z-10 mb-2 cursor-pointer group pointer-events-auto"
              title="Click to hear another reaction!"
            >
              <div className="relative px-4 py-2.5 rounded-2xl bg-[#090E1D]/90 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-md max-w-xs sm:max-w-sm text-center transition-all group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                {/* Speech tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#090E1D] border-r border-b border-cyan-400/40 transform rotate-45" />

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold mb-0.5 text-cyan-400">
                  {moodBadge.icon}
                  <span>{moodBadge.label}</span>
                </div>

                <p className="text-xs sm:text-sm font-display font-semibold text-white tracking-wide leading-snug">
                  “{dialogue}”
                </p>

                <div className="text-[9px] font-mono text-slate-400 mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  [click BitByte or speech to interact]
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 3D Canvas Container */}
        <div className={`relative ${containerDimensions}`}>
          <Canvas
            camera={{ position: [0, 0.25, cameraZ], fov: cameraFov }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.75} />
            <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFFFF" />
            <pointLight position={[-4, 2, 3]} intensity={3.0} color="#00F0FF" />
            <pointLight position={[4, -2, 3]} intensity={2.6} color="#FF6B00" />
            <pointLight position={[0, -3, -2]} intensity={2.0} color="#8B5CF6" />

            {/* Subtle atmospheric neon sparkles */}
            <Sparkles
              count={25}
              scale={3.5}
              size={1.8}
              speed={0.4}
              color={mood === 'tough' ? '#FF0055' : '#00F0FF'}
            />

            <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.35}>
              <BitByteModel
                mood={mood}
                mousePos={mousePos}
                isClicked={isClicked}
                onTriggerClick={handleMascotClick}
              />
            </Float>
          </Canvas>
        </div>
      </div>
    </BitByteErrorBoundary>
  );
};
