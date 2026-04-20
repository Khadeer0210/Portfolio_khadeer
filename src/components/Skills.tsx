import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float, Trail, Line } from '@react-three/drei';
import * as THREE from 'three';

// Skill data with proficiency levels
const SKILL_NODES = [
  // Core Hub
  { id: 'core', name: 'CORE', category: 'hub', level: 100, position: [0, 0, 0], color: '#ffffff' },
  
  // Languages
  { id: 'js', name: 'JavaScript', category: 'language', level: 95, position: [-4, 2, 1], color: '#f7df1e' },
  { id: 'py', name: 'Python', category: 'language', level: 85, position: [-3, 3, -1], color: '#3776ab' },
  { id: 'cpp', name: 'C++', category: 'language', level: 70, position: [-5, 1, -1], color: '#00599c' },
  { id: 'java', name: 'Java', category: 'language', level: 65, position: [-4, 0, 2], color: '#ed8b00' },
  { id: 'ts', name: 'TypeScript', category: 'language', level: 90, position: [-3, -1, 1], color: '#3178c6' },
  
  // Frameworks
  { id: 'react', name: 'React', category: 'framework', level: 95, position: [4, 2, 1], color: '#61dafb' },
  { id: 'next', name: 'Next.js', category: 'framework', level: 90, position: [5, 3, -1], color: '#ffffff' },
  { id: 'three', name: 'Three.js', category: 'framework', level: 80, position: [3, 3, -1], color: '#000000' },
  { id: 'node', name: 'Node.js', category: 'framework', level: 80, position: [5, 1, -1], color: '#339933' },
  { id: 'tf', name: 'TensorFlow', category: 'framework', level: 75, position: [4, 0, 2], color: '#ff6f00' },
  
  // Tools
  { id: 'git', name: 'Git', category: 'tool', level: 90, position: [0, -3, 2], color: '#f05032' },
  { id: 'vscode', name: 'VS Code', category: 'tool', level: 95, position: [2, -4, 0], color: '#007acc' },
  { id: 'notion', name: 'Notion', category: 'tool', level: 85, position: [-2, -4, 0], color: '#ffffff' },
  { id: 'figma', name: 'Figma', category: 'tool', level: 88, position: [1, -5, -1], color: '#f24e1e' },
  
  // Design
  { id: 'uiux', name: 'UI/UX', category: 'design', level: 92, position: [0, 4, 1], color: '#ff6b9d' },
  { id: 'graphic', name: 'Graphic Design', category: 'design', level: 80, position: [-2, 5, -1], color: '#9d4edd' },
  { id: 'motion', name: 'Motion Design', category: 'design', level: 85, position: [2, 5, -1], color: '#00d4aa' },
];

// Connections between related skills
const CONNECTIONS = [
  // Languages to Core
  ['js', 'core'], ['py', 'core'], ['cpp', 'core'], ['java', 'core'], ['ts', 'core'],
  // Frameworks to Core
  ['react', 'core'], ['next', 'core'], ['three', 'core'], ['node', 'core'], ['tf', 'core'],
  // Tools to Core
  ['git', 'core'], ['vscode', 'core'], ['notion', 'core'], ['figma', 'core'],
  // Design to Core
  ['uiux', 'core'], ['graphic', 'core'], ['motion', 'core'],
  // Cross-connections
  ['js', 'react'], ['ts', 'react'], ['react', 'next'], ['js', 'node'],
  ['three', 'react'], ['uiux', 'figma'], ['graphic', 'figma'],
];

function SkillNode({ node, isHovered, onHover }: { node: typeof SKILL_NODES[0]; isHovered: boolean; onHover: (id: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const scale = node.category === 'hub' ? 1.5 : (hovered || isHovered ? 1.3 : 1);
  const size = node.category === 'hub' ? 0.4 : 0.25 + (node.level / 100) * 0.15;

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={node.position as [number, number, number]}>
        {/* Glow effect */}
        <Sphere args={[size * 1.5, 16, 16]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.1} />
        </Sphere>
        
        {/* Main sphere */}
        <mesh
          ref={meshRef}
          scale={scale}
          onPointerOver={() => { setHovered(true); onHover(node.id); }}
          onPointerOut={() => { setHovered(false); onHover(null); }}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered || isHovered ? 0.8 : 0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Label */}
        {node.category !== 'hub' && (
          <Text
            position={[0, size + 0.3, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="bottom"
            font="/fonts/Inter-Bold.woff"
          >
            {node.name}
          </Text>
        )}
        
        {/* Level indicator */}
        {node.category !== 'hub' && (
          <Text
            position={[0, -size - 0.2, 0]}
            fontSize={0.1}
            color={node.color}
            anchorX="center"
            anchorY="top"
          >
            {node.level}%
          </Text>
        )}
      </group>
    </Float>
  );
}

function ConnectionLine({ start, end, isActive }: { start: number[]; end: number[]; isActive: boolean }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  
  return (
    <Line
      points={points}
      color={isActive ? '#00ffff' : '#ffffff'}
      lineWidth={isActive ? 3 : 1}
      transparent
      opacity={isActive ? 0.8 : 0.2}
    />
  );
}

function Constellation({ hoveredNode, setHoveredNode }: { hoveredNode: string | null; setHoveredNode: (id: string | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Get active connections
  const activeConnections = hoveredNode 
    ? CONNECTIONS.filter(([a, b]) => a === hoveredNode || b === hoveredNode)
    : [];

  return (
    <group ref={groupRef}>
      {/* Render connections */}
      {CONNECTIONS.map(([a, b], idx) => {
        const nodeA = SKILL_NODES.find(n => n.id === a);
        const nodeB = SKILL_NODES.find(n => n.id === b);
        if (!nodeA || !nodeB) return null;
        
        const isActive = activeConnections.some(([ca, cb]) => 
          (ca === a && cb === b) || (ca === b && cb === a)
        );
        
        return (
          <ConnectionLine
            key={idx}
            start={nodeA.position}
            end={nodeB.position}
            isActive={isActive}
          />
        );
      })}
      
      {/* Render nodes */}
      {SKILL_NODES.map(node => (
        <SkillNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          onHover={setHoveredNode}
        />
      ))}
    </group>
  );
}

function Scene({ hoveredNode, setHoveredNode }: { hoveredNode: string | null; setHoveredNode: (id: string | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
      <Constellation hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export const Skills = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'language', name: 'Languages', color: '#f7df1e' },
    { id: 'framework', name: 'Frameworks', color: '#61dafb' },
    { id: 'tool', name: 'Tools', color: '#f05032' },
    { id: 'design', name: 'Design', color: '#ff6b9d' },
  ];

  const hoveredSkill = SKILL_NODES.find(n => n.id === hoveredNode);

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center relative z-10 px-6 md:px-24 w-full py-20">
      
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase neon-text">Neural Network</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-white/50 to-transparent" />
      </div>

      <p className="text-white/60 font-mono text-sm mb-8 max-w-2xl">
        Interactive 3D visualization of my technical capabilities. 
        Hover over nodes to explore connections. Drag to rotate, scroll to zoom.
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
              selectedCategory === cat.id 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-white/60 border-white/30 hover:border-white/60'
            }`}
            style={selectedCategory === cat.id ? {} : { borderColor: `${cat.color}50` }}
          >
            <span className="mr-2" style={{ color: cat.color }}>●</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="h-[500px] w-full relative hud-border bg-black/50">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <Scene hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
        </Canvas>
        
        {/* Info Panel */}
        <motion.div 
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 p-4 bg-black/80 backdrop-blur-md hud-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hoveredNode ? 1 : 0, y: hoveredNode ? 0 : 20 }}
        >
          {hoveredSkill && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: hoveredSkill.color, boxShadow: `0 0 10px ${hoveredSkill.color}` }}
                />
                <span className="font-mono text-sm text-white font-bold">{hoveredSkill.name}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>Proficiency</span>
                  <span>{hoveredSkill.level}%</span>
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ backgroundColor: hoveredSkill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${hoveredSkill.level}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-[10px] font-mono text-white/40 uppercase mt-2">
                  Category: {hoveredSkill.category}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Legend */}
        <div className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-sm border border-white/20">
          <div className="text-[10px] font-mono text-white/40 uppercase mb-2">Legend</div>
          <div className="space-y-1">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-xs font-mono text-white/60">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Details Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {categories.map((cat, idx) => {
          const catSkills = SKILL_NODES.filter(n => n.category === cat.id);
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="hud-border p-4 bg-black/40 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <h3 className="font-mono text-sm font-bold text-white/90 uppercase tracking-wider">{cat.name}</h3>
              </div>
              <div className="space-y-2">
                {catSkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between group">
                    <span className="text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/40 w-6">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

