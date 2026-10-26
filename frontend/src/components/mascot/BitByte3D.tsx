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
  Crown,
  Code2,
} from 'lucide-react';
import {
  BitByteMood,
  MascotType,
  getMascotDialogue,
  getRandomClickDialogue,
} from './bitbyteDialogue';
import { soundEffects } from '../../utils/soundEffects';

export interface BitByte3DProps {
  mood?: BitByteMood;
  mascotType?: MascotType;
  customMessage?: string;
  size?: 'hero' | 'companion' | 'mini';
  className?: string;
  showSpeech?: boolean;
  onMascotClick?: () => void;
  interactive?: boolean;
}

// ── 3D MASCOT MODEL (Supports both Coder Bot & Chelsea Chess Grandmaster) ──
function BitByteModel({
  mood,
  mascotType = 'coder',
  mousePos,
  isClicked,
  onTriggerClick,
}: {
  mood: BitByteMood;
  mascotType: MascotType;
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

  const isChelsea = mascotType === 'chelsea_chess';

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

    // 3. Ears Articulation
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

    // 4. Top Crown / Antenna Pulse & Wiggle
    if (antennaRef.current) {
      const wiggleSpeed = mood === 'excited' || mood === 'speed_mode' ? 12 : 3;
      antennaRef.current.rotation.z = Math.sin(t * wiggleSpeed) * 0.1;
      if (isChelsea) {
        antennaRef.current.rotation.y = Math.sin(t * 2) * 0.15;
      }
    }

    // 5. Arm & Hand Kinematics
    if (leftArmRef.current && rightArmRef.current) {
      let lRotX = 0;
      let rRotX = 0;
      let lRotZ = 0.1;
      let rRotZ = -0.1;
      let lPosY = -0.18;
      let rPosY = -0.18;

      if (mood === 'welcome') {
        rRotX = -Math.PI / 1.3;
        rRotZ = -0.4 + Math.sin(t * 8) * 0.35;
      } else if (mood === 'excited' || mood === 'victory') {
        lRotX = -Math.PI / 1.1 + Math.sin(t * 12) * 0.25;
        rRotX = -Math.PI / 1.1 + Math.cos(t * 12) * 0.25;
        lRotZ = 0.3;
        rRotZ = -0.3;
      } else if (mood === 'thinking') {
        rRotX = -Math.PI / 1.5;
        rRotZ = -0.6;
        rPosY = -0.12;
      } else if (mood === 'wrong_answer' || mood === 'defeat') {
        lRotZ = 0.45;
        rRotZ = -0.45;
        lRotX = 0.3;
        rRotX = 0.3;
      } else {
        lRotX = Math.sin(t * 2) * 0.12;
        rRotX = -Math.sin(t * 2) * 0.12;
      }

      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, lRotX, 0.1);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, rRotX, 0.1);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, lRotZ, 0.1);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, rRotZ, 0.1);
      leftArmRef.current.position.y = THREE.MathUtils.lerp(leftArmRef.current.position.y, lPosY, 0.1);
      rightArmRef.current.position.y = THREE.MathUtils.lerp(rightArmRef.current.position.y, rPosY, 0.1);
    }

    // 6. Running / Floating Leg Motion
    if (leftLegRef.current && rightLegRef.current) {
      if (mood === 'speed_mode') {
        leftLegRef.current.rotation.x = Math.sin(t * 12) * 0.6;
        rightLegRef.current.rotation.x = -Math.sin(t * 12) * 0.6;
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

  // Eye color depending on mood and mascot identity
  const eyeColor = useMemo(() => {
    switch (mood) {
      case 'tough':
      case 'low_time':
        return '#FF0055'; // Intense warning crimson
      case 'speed_mode':
        return isChelsea ? '#FFD700' : '#00F0FF';
      case 'excited':
      case 'victory':
        return '#00FF9D'; // Neon victory emerald
      case 'wrong_answer':
        return '#38BDF8';
      default:
        return isChelsea ? '#FFE066' : '#FFFFFF'; // Chelsea GM warm gold or crisp white
    }
  }, [mood, isChelsea]);

  // Color tokens based on Mascot Identity
  const chassisColor = isChelsea ? '#052A75' : '#1A243B';
  const bezelColor = isChelsea ? '#FFD700' : '#00F0FF';
  const jerseyColor = isChelsea ? '#034694' : '#101626';
  const accentLight = isChelsea ? '#00A3FF' : '#00F0FF';
  const secondaryAccent = isChelsea ? '#FFD700' : '#FF6B00';

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
        {/* ── 1. HEAD & VISOR ── */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          {/* Main Helmet / Outer Chassis */}
          <RoundedBox args={[1.28, 1.1, 0.96]} radius={0.24} smoothness={4} position={[0, 0.36, 0]}>
            <meshStandardMaterial
              color={chassisColor}
              roughness={0.22}
              metalness={0.7}
              envMapIntensity={1.5}
            />
          </RoundedBox>

          {/* Visor Bezel (Gold for Chelsea GM, Cyan for Coder) */}
          <RoundedBox args={[1.08, 0.9, 0.05]} radius={0.16} smoothness={4} position={[0, 0.36, 0.47]}>
            <meshStandardMaterial
              color={bezelColor}
              emissive={bezelColor}
              emissiveIntensity={isChelsea ? 1.4 : 1.8}
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

          {/* Luminous Left Eye */}
          <mesh ref={leftEyeRef} position={[-0.26, 0.38, 0.53]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={3.2}
              toneMapped={false}
            />
          </mesh>

          {/* Luminous Right Eye */}
          <mesh ref={rightEyeRef} position={[0.26, 0.38, 0.53]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={eyeColor}
              emissive={eyeColor}
              emissiveIntensity={3.2}
              toneMapped={false}
            />
          </mesh>

          {/* ── EARS: CODER BRACKETS vs CHELSEA LION/ROOK WINGS ── */}
          {isChelsea ? (
            <>
              {/* Chelsea Gold Rook Wing Left Ear */}
              <group ref={leftEarRef} position={[-0.78, 0.36, 0]}>
                <mesh rotation={[0, 0, 0.2]}>
                  <boxGeometry args={[0.18, 0.42, 0.22]} />
                  <meshStandardMaterial color="#FFD700" metalness={0.85} roughness={0.2} />
                </mesh>
                <mesh position={[-0.08, 0, 0]}>
                  <boxGeometry args={[0.04, 0.32, 0.18]} />
                  <meshStandardMaterial color="#00A3FF" emissive="#00A3FF" emissiveIntensity={2.0} />
                </mesh>
              </group>

              {/* Chelsea Gold Rook Wing Right Ear */}
              <group ref={rightEarRef} position={[0.78, 0.36, 0]}>
                <mesh rotation={[0, 0, -0.2]}>
                  <boxGeometry args={[0.18, 0.42, 0.22]} />
                  <meshStandardMaterial color="#FFD700" metalness={0.85} roughness={0.2} />
                </mesh>
                <mesh position={[0.08, 0, 0]}>
                  <boxGeometry args={[0.04, 0.32, 0.18]} />
                  <meshStandardMaterial color="#00A3FF" emissive="#00A3FF" emissiveIntensity={2.0} />
                </mesh>
              </group>
            </>
          ) : (
            <>
              {/* Left Bracket Ear (<) */}
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

              {/* Right Bracket Ear (>) */}
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
            </>
          )}

          {/* ── TOP HEADPIECE: ORANGE CODER ANTENNA vs GOLDEN CHELSEA GRANDMASTER CROWN ── */}
          <group ref={antennaRef} position={[0, 0.98, 0]}>
            {isChelsea ? (
              /* Golden Grandmaster 3-Peak Crown with Center Sapphire */
              <group position={[0, 0.02, 0]}>
                {/* Crown base ring */}
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.34, 0.36, 0.1, 24]} />
                  <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
                </mesh>
                {/* Center Peak */}
                <mesh position={[0, 0.15, 0]}>
                  <coneGeometry args={[0.11, 0.24, 16]} />
                  <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
                </mesh>
                {/* Left Peak */}
                <mesh position={[-0.2, 0.1, 0]} rotation={[0, 0, 0.28]}>
                  <coneGeometry args={[0.08, 0.18, 16]} />
                  <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
                </mesh>
                {/* Right Peak */}
                <mesh position={[0.2, 0.1, 0]} rotation={[0, 0, -0.28]}>
                  <coneGeometry args={[0.08, 0.18, 16]} />
                  <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} />
                </mesh>
                {/* Glowing Chelsea Blue Crown Jewel Gem */}
                <mesh position={[0, 0.05, 0.22]}>
                  <sphereGeometry args={[0.06, 16, 16]} />
                  <meshStandardMaterial
                    color="#00A3FF"
                    emissive="#00A3FF"
                    emissiveIntensity={2.8}
                    toneMapped={false}
                  />
                </mesh>
              </group>
            ) : (
              /* Geekroom Orange Antenna (/ with ball) */
              <>
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
              </>
            )}
          </group>

          {/* Cyber Neck Collar */}
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.32, 0.38, 0.12, 24]} />
            <meshStandardMaterial color={isChelsea ? '#081D45' : '#22304E'} metalness={0.8} />
          </mesh>
        </group>

        {/* ── 2. TORSO & JERSEY ── */}
        <group position={[0, -0.16, 0]}>
          {/* Main Jersey Body */}
          <RoundedBox args={[1.08, 0.82, 0.76]} radius={0.16} smoothness={4}>
            <meshStandardMaterial
              color={jerseyColor}
              roughness={isChelsea ? 0.45 : 0.65}
              metalness={isChelsea ? 0.35 : 0.15}
            />
          </RoundedBox>

          {/* Collar Trim (White for Chelsea, Cyan for Coder) */}
          <mesh position={[0, 0.37, 0.36]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.18, 0.04, 0.06]} />
            <meshStandardMaterial
              color={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissive={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissiveIntensity={isChelsea ? 0.8 : 1.5}
            />
          </mesh>
          <mesh position={[0, 0.37, 0.36]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.18, 0.04, 0.06]} />
            <meshStandardMaterial
              color={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissive={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissiveIntensity={isChelsea ? 0.8 : 1.5}
            />
          </mesh>

          {/* ── CHEST EMBLEM: CHELSEA LION SHIELD (#26) vs GEEKROOM (< / >) ── */}
          {isChelsea ? (
            <group position={[0, 0.08, 0.39]}>
              {/* Golden Lion Crest Shield */}
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.18, 0.14, 0.03, 6]} />
                <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Rampant Lion Silhouette Bar */}
              <mesh position={[0, 0.02, 0.02]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.07, 0.2, 0.02]} />
                <meshStandardMaterial color="#034694" metalness={0.5} />
              </mesh>
              {/* Terry #26 Chest Marking */}
              <mesh position={[0.26, -0.06, 0]}>
                <boxGeometry args={[0.16, 0.12, 0.02]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1.2} />
              </mesh>
            </group>
          ) : (
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
          )}

          {/* Flank Athletic Stripes */}
          <mesh position={[-0.48, -0.06, 0.32]} rotation={[0, 0, -0.45]}>
            <boxGeometry args={[0.05, 0.52, 0.02]} />
            <meshStandardMaterial
              color={accentLight}
              emissive={accentLight}
              emissiveIntensity={isChelsea ? 1.5 : 2.0}
            />
          </mesh>
          <mesh position={[-0.52, -0.14, 0.28]} rotation={[0, 0, -0.45]}>
            <boxGeometry args={[0.04, 0.38, 0.02]} />
            <meshStandardMaterial
              color={secondaryAccent}
              emissive={secondaryAccent}
              emissiveIntensity={isChelsea ? 1.8 : 2.2}
            />
          </mesh>

          <mesh position={[0.48, -0.06, 0.32]} rotation={[0, 0, 0.45]}>
            <boxGeometry args={[0.05, 0.52, 0.02]} />
            <meshStandardMaterial
              color={accentLight}
              emissive={accentLight}
              emissiveIntensity={isChelsea ? 1.5 : 2.0}
            />
          </mesh>
          <mesh position={[0.52, -0.14, 0.28]} rotation={[0, 0, 0.45]}>
            <boxGeometry args={[0.04, 0.38, 0.02]} />
            <meshStandardMaterial
              color={secondaryAccent}
              emissive={secondaryAccent}
              emissiveIntensity={isChelsea ? 1.8 : 2.2}
            />
          </mesh>

          {/* Lower Jersey Hem */}
          <mesh position={[0, -0.38, 0]}>
            <boxGeometry args={[1.09, 0.05, 0.77]} />
            <meshStandardMaterial
              color={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissive={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissiveIntensity={isChelsea ? 0.8 : 1.4}
            />
          </mesh>
        </group>

        {/* ── 3. ARMS & HANDS ── */}
        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.68, -0.18, 0]}>
          <RoundedBox args={[0.3, 0.32, 0.3]} radius={0.08} smoothness={3} position={[0, 0.12, 0]}>
            <meshStandardMaterial color={jerseyColor} roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.155, 0.155, 0.03, 16]} />
            <meshStandardMaterial color={accentLight} emissive={accentLight} emissiveIntensity={2.0} />
          </mesh>

          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.11, 0.12, 0.26, 16]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.7} />
          </mesh>

          <group position={[0, -0.42, 0]}>
            <RoundedBox args={[0.22, 0.2, 0.14]} radius={0.06} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.4} />
            </RoundedBox>
            <mesh position={[0.1, 0.04, 0.04]} rotation={[0, 0, 0.4]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, -0.02, 0.07]}>
              <circleGeometry args={[0.04, 16]} />
              <meshStandardMaterial
                color={isChelsea ? '#FFD700' : '#00F0FF'}
                emissive={isChelsea ? '#FFD700' : '#00F0FF'}
                emissiveIntensity={2.5}
              />
            </mesh>
          </group>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.68, -0.18, 0]}>
          <RoundedBox args={[0.3, 0.32, 0.3]} radius={0.08} smoothness={3} position={[0, 0.12, 0]}>
            <meshStandardMaterial color={jerseyColor} roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.155, 0.155, 0.03, 16]} />
            <meshStandardMaterial color={accentLight} emissive={accentLight} emissiveIntensity={2.0} />
          </mesh>

          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.11, 0.12, 0.26, 16]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.3} metalness={0.7} />
          </mesh>

          <group position={[0, -0.42, 0]}>
            <RoundedBox args={[0.22, 0.2, 0.14]} radius={0.06} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.4} />
            </RoundedBox>
            <mesh position={[-0.1, 0.04, 0.04]} rotation={[0, 0, -0.4]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, -0.02, 0.07]}>
              <circleGeometry args={[0.04, 16]} />
              <meshStandardMaterial
                color={isChelsea ? '#FFD700' : '#00F0FF'}
                emissive={isChelsea ? '#FFD700' : '#00F0FF'}
                emissiveIntensity={2.5}
              />
            </mesh>
          </group>
        </group>

        {/* ── 4. LEGS & SNEAKERS ── */}
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.26, -0.65, 0]}>
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.14, 0.15, 0.2, 16]} />
            <meshStandardMaterial color={jerseyColor} />
          </mesh>
          <mesh position={[-0.14, -0.08, 0]}>
            <boxGeometry args={[0.02, 0.18, 0.05]} />
            <meshStandardMaterial
              color={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissive={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissiveIntensity={1.5}
            />
          </mesh>
          <mesh position={[0, -0.26, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.36, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
            <meshStandardMaterial color={accentLight} emissive={accentLight} emissiveIntensity={2.0} />
          </mesh>
          <group position={[0, -0.43, 0.06]}>
            <RoundedBox args={[0.22, 0.12, 0.34]} radius={0.05} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </RoundedBox>
            <mesh position={[0, -0.065, 0]}>
              <boxGeometry args={[0.23, 0.03, 0.35]} />
              <meshStandardMaterial
                color={secondaryAccent}
                emissive={secondaryAccent}
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.26, -0.65, 0]}>
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.14, 0.15, 0.2, 16]} />
            <meshStandardMaterial color={jerseyColor} />
          </mesh>
          <mesh position={[0.14, -0.08, 0]}>
            <boxGeometry args={[0.02, 0.18, 0.05]} />
            <meshStandardMaterial
              color={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissive={isChelsea ? '#FFFFFF' : '#00F0FF'}
              emissiveIntensity={1.5}
            />
          </mesh>
          <mesh position={[0, -0.26, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.36, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
            <meshStandardMaterial color={accentLight} emissive={accentLight} emissiveIntensity={2.0} />
          </mesh>
          <group position={[0, -0.43, 0.06]}>
            <RoundedBox args={[0.22, 0.12, 0.34]} radius={0.05} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </RoundedBox>
            <mesh position={[0, -0.065, 0]}>
              <boxGeometry args={[0.23, 0.03, 0.35]} />
              <meshStandardMaterial
                color={secondaryAccent}
                emissive={secondaryAccent}
                emissiveIntensity={1.5}
              />
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
  mascotType = 'coder',
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

  const isChelsea = mascotType === 'chelsea_chess';

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
      setDialogue(getMascotDialogue(mood, mascotType));
    }
  }, [mood, mascotType, customMessage]);

  const handleMascotClick = () => {
    if (!interactive) return;
    soundEffects.playSelect();
    setIsClicked(true);
    setClickCount((c) => c + 1);

    const newLine =
      clickCount % 2 === 1
        ? getRandomClickDialogue(mascotType)
        : getMascotDialogue(mood, mascotType);
    setDialogue(newLine);

    if (onMascotClick) {
      onMascotClick();
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 850);
  };

  // Dimensions
  const containerDimensions = {
    hero: 'w-full h-[290px] xs:h-[340px] sm:h-[400px] md:h-[460px]',
    companion: 'w-full h-[210px] sm:h-[240px]',
    mini: 'w-28 h-28 sm:w-36 sm:h-36',
  }[size];

  const cameraFov = size === 'hero' ? 36 : size === 'companion' ? 34 : 40;
  const cameraZ = size === 'hero' ? 4.6 : size === 'companion' ? 4.9 : 4.4;

  // Mood Badge Icon
  const moodBadge = useMemo(() => {
    if (isChelsea) {
      switch (mood) {
        case 'excited':
        case 'victory':
          return { label: 'CHAMPIONS!', icon: <Crown className="w-3.5 h-3.5 text-amber-400" /> };
        case 'speed_mode':
          return { label: 'BLITZ TACTICS', icon: <Zap className="w-3.5 h-3.5 text-blue-400" /> };
        case 'low_time':
          return { label: 'FLAG FALL IMMINENT', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> };
        case 'thinking':
          return { label: 'CALCULATING 3 MOVES', icon: <HelpCircle className="w-3.5 h-3.5 text-blue-300" /> };
        default:
          return { label: 'LEO // CFC-26 (CHELSEA GM)', icon: <span className="text-sm">🦁</span> };
      }
    } else {
      switch (mood) {
        case 'excited':
        case 'victory':
          return { label: 'CLEAN BUILD!', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> };
        case 'speed_mode':
          return { label: 'TURBO COMPILATION', icon: <Zap className="w-3.5 h-3.5 text-lime" /> };
        case 'low_time':
          return { label: 'STACK OVERFLOW', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> };
        case 'thinking':
          return { label: 'TRACING ALGORITHM', icon: <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> };
        case 'leaderboard':
          return { label: 'TELEMETRY SYNCED', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> };
        default:
          return { label: 'BITBYTE // GKR-01 (CODER)', icon: <Code2 className="w-3.5 h-3.5 text-lime" /> };
      }
    }
  }, [mood, isChelsea]);

  // Fallback if WebGL unavailable
  const fallback2D = (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className={`w-24 h-24 rounded-2xl ${isChelsea ? 'bg-blue-950/60 border border-blue-500/40 text-blue-300' : 'bg-cyan-950/40 border border-cyan-400/30 text-lime'} flex items-center justify-center`}>
        {isChelsea ? <span className="text-4xl">🦁</span> : <SparklesIcon className="w-10 h-10 animate-pulse" />}
      </div>
      <p className="text-xs font-mono text-slate-300 mt-2 font-bold">{dialogue}</p>
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
              key={`${dialogue}-${mascotType}`}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={handleMascotClick}
              className="z-10 mb-2 cursor-pointer group pointer-events-auto px-2"
              title={`Click to interact with ${isChelsea ? 'Leo #26' : 'BitByte'}!`}
            >
              <div
                className={`relative px-4 py-2 rounded-2xl border shadow-2xl backdrop-blur-md max-w-xs sm:max-w-sm text-center transition-all ${
                  isChelsea
                    ? 'bg-[#081329] border-blue-500/30 group-hover:border-amber-400/70 shadow-[0_4px_24px_rgba(3,70,148,0.35)]'
                    : 'bg-[#101522] border-white/15 group-hover:border-lime/60 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Speech tail */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 border-r border-b transform rotate-45 ${
                    isChelsea ? 'bg-[#081329] border-blue-500/30' : 'bg-[#101522] border-white/15'
                  }`}
                />

                <div
                  className={`flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold mb-0.5 ${
                    isChelsea ? 'text-amber-400' : 'text-lime'
                  }`}
                >
                  {moodBadge.icon}
                  <span>{moodBadge.label}</span>
                </div>

                <p className="text-xs sm:text-sm font-display font-bold text-white tracking-wide leading-snug">
                  “{dialogue}”
                </p>

                <div className="text-[9px] font-mono text-slate-400 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  [click to trigger voice line]
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 3D Canvas Container */}
        <div className={`relative ${containerDimensions} flex items-center justify-center`}>
          {/* Spotlight Glow */}
          <div
            className={`absolute inset-0 pointer-events-none rounded-full blur-2xl ${
              isChelsea
                ? 'bg-[radial-gradient(ellipse_at_center,rgba(3,70,148,0.25)_0%,rgba(255,215,0,0.08)_50%,transparent_75%)]'
                : 'bg-[radial-gradient(ellipse_at_center,rgba(212,255,0,0.12)_0%,rgba(255,107,0,0.06)_50%,transparent_75%)]'
            }`}
          />

          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.1, cameraZ], fov: cameraFov }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Lighting */}
            <ambientLight intensity={1.3} />
            <directionalLight position={[3, 5, 4]} intensity={2.4} color="#FFFFFF" />
            <pointLight
              position={[-3.5, 2, 2.5]}
              intensity={4.0}
              color={isChelsea ? '#00A3FF' : '#00F0FF'}
            />
            <pointLight
              position={[3.5, -1, 2.5]}
              intensity={3.5}
              color={isChelsea ? '#FFD700' : '#FF6B00'}
            />
            <pointLight position={[0, 4, -3]} intensity={2.0} color="#FFFFFF" />
            <pointLight
              position={[0, -3, 2]}
              intensity={1.8}
              color={isChelsea ? '#034694' : '#00F0FF'}
            />

            {/* Floating Particles */}
            <Sparkles
              count={22}
              scale={3.2}
              size={1.6}
              speed={0.35}
              color={isChelsea ? '#FFD700' : mood === 'tough' ? '#FF0055' : '#00F0FF'}
            />

            <Float speed={2.0} rotationIntensity={0.15} floatIntensity={0.25}>
              <BitByteModel
                mood={mood}
                mascotType={mascotType}
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
