import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles as SparklesIcon,
  Flame,
  Zap,
  HelpCircle,
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

// ── 3D BITBYTE MODEL WITH OFFICIAL GEEKROOM JERSEY & ATHLETIC ROBOT DESIGN ──
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
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);

  // Animation references
  const spinAngle = useRef(0);
  const blinkTimer = useRef(0);
  const eyeScaleY = useRef(1);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Digital Eye Blinking & Pupil Tracking
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.6) {
      eyeScaleY.current = 0.08;
      if (blinkTimer.current > 3.75) {
        eyeScaleY.current = 1.0;
        blinkTimer.current = 0;
      }
    } else {
      eyeScaleY.current = THREE.MathUtils.lerp(eyeScaleY.current, 1.0, 0.25);
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY.current;
      rightEyeRef.current.scale.y = eyeScaleY.current;

      const pX = THREE.MathUtils.clamp(mousePos.x * 0.04, -0.035, 0.035);
      const pY = THREE.MathUtils.clamp(-mousePos.y * 0.03, -0.025, 0.025);
      leftEyeRef.current.position.x = -0.26 + pX;
      leftEyeRef.current.position.y = 0.38 + pY;
      rightEyeRef.current.position.x = 0.26 + pX;
      rightEyeRef.current.position.y = 0.38 + pY;
    }

    // 2. Head Rotation (Cursor follow & Contextual tilts)
    if (headRef.current) {
      if (isClicked) {
        spinAngle.current += delta * 15;
        headRef.current.rotation.y = spinAngle.current;
      } else {
        spinAngle.current = 0;
        let targetRotY = mousePos.x * 0.42;
        let targetRotX = -mousePos.y * 0.28;
        let targetRotZ = 0;

        if (mood === 'thinking') {
          targetRotZ = 0.16;
          targetRotY = -0.22;
          targetRotX = -0.12;
        } else if (mood === 'wrong_answer' || mood === 'defeat') {
          targetRotX = 0.22;
          targetRotZ = Math.sin(t * 2) * 0.08;
        } else if (mood === 'excited' || mood === 'victory') {
          targetRotZ = Math.sin(t * 8) * 0.1;
          targetRotY += Math.sin(t * 6) * 0.15;
        } else if (mood === 'low_time') {
          targetRotX += (Math.random() - 0.5) * 0.08;
          targetRotY += (Math.random() - 0.5) * 0.08;
        }

        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.1);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetRotZ, 0.1);
      }
    }

    // 3. Bracket Ears Articulation
    if (leftEarRef.current && rightEarRef.current) {
      if (mood === 'excited' || mood === 'victory') {
        const flap = Math.sin(t * 14) * 0.28;
        leftEarRef.current.rotation.z = flap;
        rightEarRef.current.rotation.z = -flap;
      } else if (mood === 'thinking') {
        leftEarRef.current.rotation.z = 0.22;
        rightEarRef.current.rotation.z = -0.08;
      } else if (mood === 'wrong_answer') {
        leftEarRef.current.rotation.z = -0.3;
        rightEarRef.current.rotation.z = 0.3;
      } else {
        leftEarRef.current.rotation.z = THREE.MathUtils.lerp(leftEarRef.current.rotation.z, 0, 0.1);
        rightEarRef.current.rotation.z = THREE.MathUtils.lerp(rightEarRef.current.rotation.z, 0, 0.1);
      }
    }

    // 4. Top Antenna Pulse & Wiggle
    if (antennaRef.current) {
      const wiggleSpeed = mood === 'excited' || mood === 'speed_mode' ? 12 : 3;
      antennaRef.current.rotation.z = Math.sin(t * wiggleSpeed) * 0.12;
    }

    // 5. Arm & Hand Kinematics (Waving, fist pump, chin tap)
    if (leftArmRef.current && rightArmRef.current) {
      let lRotX = 0;
      let rRotX = 0;
      let lRotZ = 0.1;
      let rRotZ = -0.1;
      let lPosY = -0.18;
      let rPosY = -0.18;

      if (mood === 'welcome') {
        // Right hand waves high!
        rRotX = -Math.PI / 1.3;
        rRotZ = -0.3 + Math.sin(t * 8) * 0.45;
        rPosY = -0.05;
      } else if (mood === 'excited' || mood === 'victory') {
        // Double athletic victory pump!
        lRotX = -Math.PI / 1.35 + Math.sin(t * 10) * 0.25;
        rRotX = -Math.PI / 1.35 + Math.cos(t * 10) * 0.25;
        lRotZ = 0.35;
        rRotZ = -0.35;
        lPosY = 0.05;
        rPosY = 0.05;
      } else if (mood === 'thinking') {
        // Right hand at chin pondering
        rRotX = -Math.PI / 1.6;
        rRotZ = -0.45;
        rPosY = -0.05;
      } else if (mood === 'wrong_answer' || mood === 'defeat') {
        // Dejected limp arm drop
        lRotZ = 0.05;
        rRotZ = -0.05;
        lPosY = -0.28;
        rPosY = -0.28;
      } else if (mood === 'speed_mode') {
        // Running athletic arms
        lRotX = Math.sin(t * 12) * 0.6;
        rRotX = -Math.sin(t * 12) * 0.6;
      } else if (mood === 'low_time') {
        // Jittery nervous arm tremor
        lRotX = -0.3 + (Math.random() - 0.5) * 0.2;
        rRotX = -0.3 + (Math.random() - 0.5) * 0.2;
      } else {
        // Idle gentle breathing sway
        lRotZ = 0.12 + Math.sin(t * 2) * 0.04;
        rRotZ = -0.12 - Math.sin(t * 2) * 0.04;
      }

      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, lRotX, 0.14);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, rRotX, 0.14);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, lRotZ, 0.14);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, rRotZ, 0.14);
      leftArmRef.current.position.y = THREE.MathUtils.lerp(leftArmRef.current.position.y, lPosY, 0.14);
      rightArmRef.current.position.y = THREE.MathUtils.lerp(rightArmRef.current.position.y, rPosY, 0.14);
    }

    // 6. Cute Leg / Shoe Motion
    if (leftLegRef.current && rightLegRef.current) {
      if (mood === 'excited' || mood === 'speed_mode') {
        leftLegRef.current.rotation.x = Math.sin(t * 10) * 0.25;
        rightLegRef.current.rotation.x = -Math.sin(t * 10) * 0.25;
      } else {
        leftLegRef.current.rotation.x = Math.sin(t * 2) * 0.05;
        rightLegRef.current.rotation.x = -Math.sin(t * 2) * 0.05;
      }
    }

    // 7. Overall Hover Stance
    if (rootRef.current) {
      let fSpeed = 2.4;
      let fAmp = 0.06;
      if (mood === 'excited' || mood === 'victory') {
        fSpeed = 7.0;
        fAmp = 0.15;
      }
      rootRef.current.position.y = -0.05 + Math.sin(t * fSpeed) * fAmp;
    }
  });

  // Eye color depending on mood
  const eyeColor = useMemo(() => {
    switch (mood) {
      case 'tough':
      case 'low_time':
        return '#FF0055'; // Intense warning red / crimson
      case 'speed_mode':
        return '#00F0FF'; // Hyper cyan
      case 'excited':
      case 'victory':
        return '#00FF9D'; // Neon emerald victory
      case 'wrong_answer':
        return '#38BDF8'; // Soft sky blue
      default:
        return '#FFFFFF'; // Bright pure white
    }
  }, [mood]);

  return (
    <group ref={rootRef} position={[0, -0.05, 0]}>
      {/* Interactive Main Mascot Click Target */}
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
        {/* ── 1. HEAD & CUTE MONITOR VISOR (WITH GLOWING CYAN BEZEL) ── */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          {/* Main Helmet / Outer Chassis (Slate-Navy Metallic #1A243B) */}
          <RoundedBox args={[1.28, 1.1, 0.96]} radius={0.24} smoothness={4} position={[0, 0.36, 0]}>
            <meshStandardMaterial
              color="#1A243B"
              roughness={0.25}
              metalness={0.65}
              envMapIntensity={1.5}
            />
          </RoundedBox>

          {/* Prominent Glowing Cyan Screen Frame Bezel (From Image 1 reference) */}
          <RoundedBox args={[1.08, 0.9, 0.05]} radius={0.16} smoothness={4} position={[0, 0.36, 0.47]}>
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={1.8}
            />
          </RoundedBox>

          {/* Deep Visor Screen Face */}
          <RoundedBox args={[0.98, 0.8, 0.04]} radius={0.12} smoothness={4} position={[0, 0.36, 0.50]}>
            <meshStandardMaterial
              color="#060913"
              roughness={0.08}
              metalness={0.95}
            />
          </RoundedBox>

          {/* Big Luminous Left Circular Eye */}
          <mesh ref={leftEyeRef} position={[-0.26, 0.38, 0.53]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={3.2}
              toneMapped={false}
            />
          </mesh>

          {/* Big Luminous Right Circular Eye */}
          <mesh ref={rightEyeRef} position={[0.26, 0.38, 0.53]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={3.2}
              toneMapped={false}
            />
          </mesh>

          {/* Left Bracket Ear (<) with glowing cyan edge */}
          <group ref={leftEarRef} position={[-0.8, 0.36, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.34, 0.08, 0.16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.34, 0.08, 0.16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
          </group>

          {/* Right Bracket Ear (>) with glowing cyan edge */}
          <group ref={rightEarRef} position={[0.8, 0.36, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.34, 0.08, 0.16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.34, 0.08, 0.16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
          </group>

          {/* Top Geekroom Orange Antenna (/ with ball) */}
          <group ref={antennaRef} position={[0, 1.0, 0]}>
            <mesh rotation={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.03, 0.04, 0.28, 16]} />
              <meshStandardMaterial color="#FF6B00" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0.04, 0.18, 0]}>
              <sphereGeometry args={[0.08, 20, 20]} />
              <meshStandardMaterial
                color="#FF6B00"
                emissive="#FF6B00"
                emissiveIntensity={3.0}
                toneMapped={false}
              />
            </mesh>
          </group>

          {/* Cyber Neck Collar */}
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.32, 0.38, 0.12, 24]} />
            <meshStandardMaterial color="#22304E" metalness={0.8} />
          </mesh>
        </group>

        {/* ── 2. TORSO WEARING OFFICIAL GEEKROOM JERSEY (IMAGES 1 & 2) ── */}
        <group position={[0, -0.16, 0]}>
          {/* Main Jersey Body (Athletic Deep Midnight Fabric #101626) */}
          <RoundedBox args={[1.08, 0.82, 0.76]} radius={0.16} smoothness={4}>
            <meshStandardMaterial color="#101626" roughness={0.65} metalness={0.15} />
          </RoundedBox>

          {/* Cyan V-Neck Collar Trim */}
          <mesh position={[0, 0.37, 0.36]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.18, 0.04, 0.06]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
          </mesh>
          <mesh position={[0, 0.37, 0.36]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.18, 0.04, 0.06]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
          </mesh>
          {/* Orange Back Neck Notch from Jersey */}
          <mesh position={[0, 0.39, -0.36]}>
            <boxGeometry args={[0.08, 0.06, 0.04]} />
            <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.0} />
          </mesh>

          {/* Front Chest Official Geekroom Emblem (< / >) */}
          <group position={[0, 0.08, 0.39]}>
            {/* Center Orange Slash / */}
            <mesh rotation={[0, 0, -0.25]}>
              <boxGeometry args={[0.06, 0.34, 0.02]} />
              <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.8} />
            </mesh>
            {/* Left Cyan Bracket < */}
            <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.04, 0.16, 0.02]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
            <mesh position={[-0.18, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.04, 0.16, 0.02]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
            {/* Right Cyan Bracket > */}
            <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.04, 0.16, 0.02]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
            <mesh position={[0.18, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.04, 0.16, 0.02]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
            </mesh>
          </group>

          {/* Sweeping Athletic Jersey Stripes: Cyan & Orange Flanks (Image 2) */}
          {/* Left Flank Swooshes */}
          <mesh position={[-0.48, -0.06, 0.32]} rotation={[0, 0, -0.45]}>
            <boxGeometry args={[0.05, 0.52, 0.02]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[-0.52, -0.14, 0.28]} rotation={[0, 0, -0.45]}>
            <boxGeometry args={[0.04, 0.38, 0.02]} />
            <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.2} />
          </mesh>

          {/* Right Flank Swooshes */}
          <mesh position={[0.48, -0.06, 0.32]} rotation={[0, 0, 0.45]}>
            <boxGeometry args={[0.05, 0.52, 0.02]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[0.52, -0.14, 0.28]} rotation={[0, 0, 0.45]}>
            <boxGeometry args={[0.04, 0.38, 0.02]} />
            <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2.2} />
          </mesh>

          {/* Lower Jersey Hem with Cyan Piping */}
          <mesh position={[0, -0.38, 0]}>
            <boxGeometry args={[1.09, 0.05, 0.77]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.4} />
          </mesh>
        </group>

        {/* ── 3. VISIBLE ARMS & CUTE ARTICULATED HANDS (WHITE/SILVER WITH CYAN JOINTS) ── */}
        {/* Left Arm & Hand */}
        <group ref={leftArmRef} position={[-0.68, -0.18, 0]}>
          {/* Jersey Shoulder Sleeve */}
          <RoundedBox args={[0.3, 0.32, 0.3]} radius={0.08} smoothness={3} position={[0, 0.12, 0]}>
            <meshStandardMaterial color="#101626" roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.155, 0.155, 0.03, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
          </mesh>

          {/* Visible Cyber Forearm (Bright Silver-Cyan #CBD5E1) */}
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.11, 0.12, 0.26, 16]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Cute White/Silver Hand with Cyan Repulsor Palm */}
          <group position={[0, -0.42, 0]}>
            {/* Hand Mitt/Palm */}
            <RoundedBox args={[0.22, 0.2, 0.14]} radius={0.06} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.4} />
            </RoundedBox>
            {/* Thumb */}
            <mesh position={[0.1, 0.04, 0.04]} rotation={[0, 0, 0.4]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Glowing Cyan Palm Node */}
            <mesh position={[0, -0.02, 0.07]}>
              <circleGeometry args={[0.04, 16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.5} />
            </mesh>
          </group>
        </group>

        {/* Right Arm & Hand */}
        <group ref={rightArmRef} position={[0.68, -0.18, 0]}>
          {/* Jersey Shoulder Sleeve */}
          <RoundedBox args={[0.3, 0.32, 0.3]} radius={0.08} smoothness={3} position={[0, 0.12, 0]}>
            <meshStandardMaterial color="#101626" roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.155, 0.155, 0.03, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
          </mesh>

          {/* Visible Cyber Forearm (Bright Silver-Cyan #CBD5E1) */}
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.11, 0.12, 0.26, 16]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Cute White/Silver Hand with Cyan Repulsor Palm */}
          <group position={[0, -0.42, 0]}>
            {/* Hand Mitt/Palm */}
            <RoundedBox args={[0.22, 0.2, 0.14]} radius={0.06} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.4} />
            </RoundedBox>
            {/* Thumb */}
            <mesh position={[-0.1, 0.04, 0.04]} rotation={[0, 0, -0.4]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Glowing Cyan Palm Node */}
            <mesh position={[0, -0.02, 0.07]}>
              <circleGeometry args={[0.04, 16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.5} />
            </mesh>
          </group>
        </group>

        {/* ── 4. LEGS & ATHLETIC SNEAKERS (FROM IMAGE 1) ── */}
        {/* Left Leg & Shoe */}
        <group ref={leftLegRef} position={[-0.26, -0.65, 0]}>
          {/* Athletic Shorts Thigh */}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.14, 0.15, 0.2, 16]} />
            <meshStandardMaterial color="#101626" />
          </mesh>
          {/* Cyan Stripe on shorts */}
          <mesh position={[-0.14, -0.08, 0]}>
            <boxGeometry args={[0.02, 0.18, 0.05]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
          </mesh>
          {/* Cyber Shin (Silver Alloy #94A3B8) */}
          <mesh position={[0, -0.26, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Cyan Ankle Cuff */}
          <mesh position={[0, -0.36, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
          </mesh>
          {/* Athletic Sneaker */}
          <group position={[0, -0.43, 0.06]}>
            <RoundedBox args={[0.22, 0.12, 0.34]} radius={0.05} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </RoundedBox>
            {/* Orange Sole */}
            <mesh position={[0, -0.065, 0]}>
              <boxGeometry args={[0.23, 0.03, 0.35]} />
              <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={1.5} />
            </mesh>
          </group>
        </group>

        {/* Right Leg & Shoe */}
        <group ref={rightLegRef} position={[0.26, -0.65, 0]}>
          {/* Athletic Shorts Thigh */}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.14, 0.15, 0.2, 16]} />
            <meshStandardMaterial color="#101626" />
          </mesh>
          {/* Cyan Stripe on shorts */}
          <mesh position={[0.14, -0.08, 0]}>
            <boxGeometry args={[0.02, 0.18, 0.05]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
          </mesh>
          {/* Cyber Shin (Silver Alloy #94A3B8) */}
          <mesh position={[0, -0.26, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Cyan Ankle Cuff */}
          <mesh position={[0, -0.36, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.0} />
          </mesh>
          {/* Athletic Sneaker */}
          <group position={[0, -0.43, 0.06]}>
            <RoundedBox args={[0.22, 0.12, 0.34]} radius={0.05} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </RoundedBox>
            {/* Orange Sole */}
            <mesh position={[0, -0.065, 0]}>
              <boxGeometry args={[0.23, 0.03, 0.35]} />
              <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={1.5} />
            </mesh>
          </group>
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

  // Check WebGL availability and track mouse/touch
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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
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

    const newLine = clickCount % 2 === 1 ? getRandomClickDialogue() : getBitByteDialogue(mood);
    setDialogue(newLine);

    if (onMascotClick) {
      onMascotClick();
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 850);
  };

  // Mobile-optimized responsive dimensions
  const containerDimensions = {
    hero: 'w-full h-[290px] xs:h-[340px] sm:h-[400px] md:h-[460px]',
    companion: 'w-full h-[210px] sm:h-[240px]',
    mini: 'w-28 h-28 sm:w-36 sm:h-36',
  }[size];

  const cameraFov = size === 'hero' ? 36 : size === 'companion' ? 34 : 40;
  const cameraZ = size === 'hero' ? 4.6 : size === 'companion' ? 4.9 : 4.4;

  // Mood Badge Icon
  const moodBadge = useMemo(() => {
    switch (mood) {
      case 'excited':
      case 'victory':
        return { label: 'CELEBRATING!', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> };
      case 'speed_mode':
        return { label: 'SPEED BOOST', icon: <Zap className="w-3.5 h-3.5 text-cyan-400" /> };
      case 'low_time':
        return { label: 'CRITICAL TIME', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> };
      case 'thinking':
        return { label: 'ANALYZING', icon: <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> };
      case 'leaderboard':
        return { label: 'LEADERBOARD HOST', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> };
      default:
        return { label: 'BITBYTE // GKR-01', icon: <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" /> };
    }
  }, [mood]);

  // Fallback if WebGL unavailable
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
      <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
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
              className="z-10 mb-2 cursor-pointer group pointer-events-auto px-2"
              title="Click to interact with BitByte!"
            >
              <div className="relative px-4 py-2 rounded-2xl bg-[#090E20]/95 border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,240,255,0.3)] backdrop-blur-md max-w-xs sm:max-w-sm text-center transition-all group-hover:border-cyan-400 group-hover:shadow-[0_0_35px_rgba(0,240,255,0.5)]">
                {/* Speech tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#090E20] border-r-2 border-b-2 border-cyan-400/50 transform rotate-45" />

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold mb-0.5 text-cyan-300">
                  {moodBadge.icon}
                  <span>{moodBadge.label}</span>
                </div>

                <p className="text-xs sm:text-sm font-display font-bold text-white tracking-wide leading-snug">
                  “{dialogue}”
                </p>

                <div className="text-[9px] font-mono text-cyan-400/80 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  [click to interact]
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 3D Canvas Container with High-Contrast Background Spotlight */}
        <div className={`relative ${containerDimensions} flex items-center justify-center`}>
          {/* Subtle Contrast Radial Glow Behind BitByte so he pops out from the dark background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15)_0%,rgba(139,92,246,0.08)_45%,transparent_75%)] pointer-events-none rounded-full blur-xl" />

          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.1, cameraZ], fov: cameraFov }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Brighter Studio Lighting Setup so BitByte's colors & jersey are 100% visible */}
            <ambientLight intensity={1.25} />
            <directionalLight position={[3, 5, 4]} intensity={2.4} color="#FFFFFF" />
            <pointLight position={[-3.5, 2, 2.5]} intensity={4.0} color="#00F0FF" />
            <pointLight position={[3.5, -1, 2.5]} intensity={3.5} color="#FF6B00" />
            <pointLight position={[0, 4, -3]} intensity={2.0} color="#FFFFFF" />
            <pointLight position={[0, -3, 2]} intensity={1.8} color="#00F0FF" />

            {/* Neon floating cyber dust particles */}
            <Sparkles
              count={20}
              scale={3.2}
              size={1.6}
              speed={0.35}
              color={mood === 'tough' ? '#FF0055' : '#00F0FF'}
            />

            <Float speed={2.0} rotationIntensity={0.15} floatIntensity={0.25}>
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
