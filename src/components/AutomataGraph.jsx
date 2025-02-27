import React, { useCallback, useEffect, useMemo, memo, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { useTokenizer } from '../context/TokenizerContext';
import { useSpring, animated } from '@react-spring/web';
import { BsPlayFill, BsPauseFill, BsArrowCounterclockwise } from 'react-icons/bs';
import { MdSpeed } from 'react-icons/md';

// Update the INITIAL_CONFIG
const INITIAL_CONFIG = {
  minZoom: 0.5,
  maxZoom: 2,
  defaultViewport: { x: 0, y: 0, zoom: 1 },
  fitViewPadding: 50
};

// Keep the node positions
const INITIAL_STATES = {
  "0": { id: "0", name: "START", x: 1118, y: 456, type: "initial" },
  "1": { id: "1", name: "WORD_START", x: 540, y: 773 },
  "2": { id: "2", name: "VALID_WORD", x: 843, y: 176, type: "final" },
  "3": { id: "3", name: "PHRASE_START", x: 758, y: 290 },
  "4": { id: "4", name: "VALID_PHRASE", x: 633, y: 133, type: "final" },
  "5": { id: "5", name: "SENTENCE_START", x: 551, y: 202 },
  "6": { id: "6", name: "SENTENCE_BODY", x: 400, y: 437 },
  "7": { id: "7", name: "VALID_SENTENCE", x: 447, y: 597, type: "final" },
  "8": { id: "8", name: "PUNCTUATION", x: 579, y: 420, type: "final" },
  "9": { id: "9", name: "NUMBER_START", x: 776, y: 724 },
  "10": { id: "10", name: "VALID_NUMBER", x: 561, y: 640, type: "final" },
  "20": { id: "20", name: "URL_START", x: 985, y: 272 },
  "21": { id: "21", name: "URL_PROTOCOL", x: 1118, y: 194 },
  "22": { id: "22", name: "URL_DOMAIN", x: 1348, y: 138, type: "final" },
  "30": { id: "30", name: "HASHTAG_START", x: 1561, y: 226 },
  "31": { id: "31", name: "VALID_HASHTAG", x: 1472, y: 114, type: "final" },
  "40": { id: "40", name: "MENTION_START", x: 1555, y: 621 },
  "41": { id: "41", name: "VALID_MENTION", x: 1566, y: 391, type: "final" },
  "50": { id: "50", name: "EMOTICON_START", x: 1626, y: 461 },
  "51": { id: "51", name: "EMOTICON_NOSE", x: 1849, y: 567 },
  "52": { id: "52", name: "VALID_EMOTICON", x: 2014, y: 278, type: "final" },
  "60": { id: "60", name: "EMOJI_START", x: 1375, y: 748 },
  "61": { id: "61", name: "VALID_EMOJI", x: 1607, y: 720, type: "final" },
  "70": { id: "70", name: "EMAIL_START", x: 1109, y: 906 },
  "71": { id: "71", name: "EMAIL_USERNAME", x: 1397, y: 909 },
  "72": { id: "72", name: "EMAIL_AT", x: 1704, y: 900 },
  "73": { id: "73", name: "EMAIL_DOMAIN", x: 1570, y: 792 },
  "74": { id: "74", name: "EMAIL_DOT", x: 1797, y: 771 },
  "75": { id: "75", name: "VALID_EMAIL", x: 1938, y: 641, type: "final" },
  "98": { id: "98", name: "ERROR_RECOVERY", x: 757, y: 875 },
  "99": { id: "99", name: "ERROR", x: 990, y: 791, type: "final" }
};

const TRANSITIONS = {
  // Grammar transitions
  GRAMMAR: {
    // Word transitions
    "0-1": { read: "[a-z]" }, 
    "1-2": { read: "[a-z]" }, 
    "2-2": { read: "[a-z0-9]" },
    "2-3": { read: " " },
    
    // Phrase transitions
    "3-4": { read: "[a-zA-Z]" },
    "4-4": { read: "[a-zA-Z0-9]" },
    "4-3": { read: " " }, // Allow multi-word phrases
    
    // Sentence transitions
    "0-5": { read: "[A-Z]" },
    "5-6": { read: "[a-zA-Z]" },
    "5-6": { read: " " },
    "6-6": { read: "[a-zA-Z0-9 ]" },
    "6-7": { read: "[.!?]" },
    
    // Punctuation
    "0-8": { read: "[,.!?;:]" },
    "8-8": { read: "[,.!?;:]" },
    
    // Number transitions - with added support for dots
    "0-9": { read: "[0-9]" },
    "9-10": { read: "[0-9]" },
    "9-10": { read: "[a-z]" }, // NEW: Number can include letters (from JFLAP)
    "10-10": { read: "[0-9]" },
    "10-10": { read: "[a-z]" }, // NEW: Number can continue with letters
    "10-10": { read: "[.]" }, // NEW: Number can have decimal points
    "10-10": { read: "@" }, // NEW: Number can have @ symbols
  },

  // Email transitions
  EMAIL: {
    "0-70": { read: "[a-zA-Z]" },
    "0-70": { read: "[0-9]" }, // NEW: Email can start with numbers
    "70-71": { read: "[a-zA-Z0-9._-]" },
    "70-71": { read: "[0-9]" }, // Explicit handling for numbers
    "71-71": { read: "[a-zA-Z0-9._-]" },
    "71-71": { read: "[0-9]" }, // Explicit handling for numbers
    "71-72": { read: "@" },
    "72-73": { read: "[a-zA-Z0-9]" },
    "73-73": { read: "[a-zA-Z0-9-]" },
    "73-74": { read: "." },
    "74-75": { read: "[a-zA-Z]" },
    "75-75": { read: "[a-zA-Z]" },
  },

  // Web content transitions
  // Update the WEB transitions section
  WEB: {
    // URL transitions
    "0-20": { read: "h" },
    "20-21": { read: ":" },
    "21-22": { read: "[a-zA-Z]" },
    // Combined self-loops for URL protocol
    "20-20": { read: "[tps]" }, // Combines t, p, s into one transition
    "21-21": { read: "[/]" },   // Combines single and double slash
    "22-22": { read: "[a-zA-Z0-9./_-]" }, // Combined URL domain characters
    
    // Hashtag transitions
    "0-30": { read: "#" },
    "30-31": { read: "[a-zA-Z0-9#]" }, // Combined initial characters including ##
    "31-31": { read: "[a-zA-Z0-9_]" }, // Combined all allowed hashtag characters
    
    // Mention transitions
    "0-40": { read: "@" },
    "40-41": { read: "[a-zA-Z0-9@]" }, // Combined initial characters including @@
    "41-41": { read: "[a-zA-Z0-9_]" }, // Combined all allowed mention characters
  },

  // Emoticon/Emoji transitions - expanded with all specific characters
  EMOTICON: {
    // Start state to emoticon start (q0 to q50)
    "0-50": { read: "[:;]" },  // Combines ":" and ";"
    
    // Emoticon start to nose (q50 to q51)
    "50-51": { read: "[-=+.*\"~^o3]" },  // Combines all nose characters
    
    // Emoticon start to final state (q50 to q52)
    "50-52": { read: "[)(*/\\<>$'8bcsDJBCXVPS=^\\]]" },  // Combines all direct face characters
    
    // Nose to final state (q51 to q52)
    "51-52": { read: "[)(3089<>=$\\/\\VXSPDJOCB]" },  // Combines all face characters after nose
  },

  // Emoji transitions - preserved as is since they work
  EMOJI: {
    "0-60": { read: "U" },
    "60-60": { read: "+" },
    "60-61": { read: "1F1" }, // NEW: Specific patterns from JFLAP
    "60-61": { read: "1F3" },
    "60-61": { read: "1F6" },
    "61-61": { read: "[0-9A-F]" },
  },

  // Error handling
  ERROR: {
    "70-99": { read: "[^a-zA-Z0-9._-@]" },
    "73-99": { read: "[^a-zA-Z0-9.-]" },
    "20-99": { read: "[^tps:]" },
    "30-99": { read: "[^a-zA-Z0-9#]" }, // Updated to match JFLAP
    "40-99": { read: "[^a-zA-Z0-9@]" }, // Updated to match JFLAP
    "50-99": { read: "[^-()DP'*JXO3o=Cc$^]" },
    "60-99": { read: "[^+1]" },
    "99-98": { read: "[!.?@#$% ]" },
    "1-99": { read: "[^a-z ]" },
    "9-99": { read: "[^0-9a-z ]" }, // Updated to allow letters in numbers
    "5-99": { read: "[^a-zA-Z ]" },
  },

  // Return transitions
  RETURN: {
    "2-0": { read: " " },
    "4-0": { read: " " },
    "7-0": { read: " " },
    "8-0": { read: " " },
    "10-0": { read: " " },
    "22-0": { read: " " },
    "31-0": { read: " " },
    "41-0": { read: " " },
    "52-0": { read: " " },
    "61-0": { read: " " },
    "75-0": { read: " " },
    "98-0": { read: " " },
  }
};

// Update AnimationControls to remove speed option
const AnimationControls = ({ onPlay, onReset, isPlaying }) => {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#1A1F2B]/80 p-2 rounded-lg">
      <button
        onClick={onPlay}
        className="p-2 rounded-full hover:bg-[#374151] transition-colors"
      >
        {isPlaying ? <BsPauseFill size={20} /> : <BsPlayFill size={20} />}
      </button>
      <button
        onClick={onReset}
        className="p-2 rounded-full hover:bg-[#374151] transition-colors"
      >
        <BsArrowCounterclockwise size={20} />
      </button>
    </div>
  );
};

// Update the CustomNode component with better animations
const CustomNode = ({ data }) => {
  // Modify spring configuration to prevent layout shifts
  const springProps = useSpring({
    // Remove scale transform and use CSS transform instead
    borderColor: data.isActive 
      ? data.isFinal && data.isAccepted ? '#10B981'
      : data.isFinal && !data.isAccepted ? '#EF4444'
      : '#EC4899'
      : '#374151',
    boxShadow: data.isActive 
      ? '0 0 20px rgba(236, 72, 153, 0.4)'
      : '0 0 0px rgba(236, 72, 153, 0)',
    config: { 
      tension: 200,
      friction: 20,
      duration: 300
    }
  });

  return (
    <div className="relative flex flex-col items-center">
      <animated.div 
        style={{
          ...springProps,
          backgroundColor: '#1A1F2B',
        }}
        className={`
          relative w-10 h-10 rounded-full border-2 
          flex items-center justify-center
          ${data.type === 'initial' ? 'before:absolute before:-left-4 before:top-1/2 before:w-3 before:h-3 before:border-2' : ''}
          ${data.type === 'final' ? 'after:absolute after:inset-[3px] after:rounded-full after:border-2' : ''}
          transition-all duration-500 ease-out
          ${data.isActive ? 'animate-pulse-subtle' : ''}
        `}
      >
        {/* Center positioned handle */}
        <Handle
          type="source"
          position="right"
          id={`source-${data.id}`}
          style={{
            right: '50%',
            top: '50%',
            transform: 'translate(50%, -50%)',
            opacity: 0,
            background: 'transparent',
            border: 'none',
            zIndex: 1
          }}
          isConnectable={false}
        />
        <div className={`
          text-gray-300 text-sm font-mono z-10
          transform transition-transform duration-300
          ${data.isActive ? 'scale-110' : 'scale-100'}
        `}>
          {`q${data.id}`}
        </div>
      </animated.div>
      <div className="mt-2 text-xs text-gray-400 whitespace-nowrap">
        {data.name}
      </div>
    </div>
  );
};

// Update the main component's animation logic
const AutomataGraph = () => {
  const { 
    automaton, 
    selectedToken,
    ACCEPTING_STATES, // Add this
  } = useTokenizer(); // Add this
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pathHistory, setPathHistory] = useState([]);
  const [currentTransitionIndex, setCurrentTransitionIndex] = useState(0);
  const [animationQueue, setAnimationQueue] = useState([]);

  // Move handleReset before the useEffect that uses it
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    if (selectedToken) {
      setActiveNodeId(selectedToken.transitions[0]?.from || '0');
    }
    setActivePath(null);
    setCurrentTransitionIndex(0);
    setPathHistory([]);
  }, [selectedToken]);

  // Update animateToken to work with enriched token data
  const animateToken = useCallback((token) => {
    if (!token?.transitions?.length) return;
    
    setAnimationQueue(token.transitions);
    setActiveNodeId(token.transitions[0].from);
    setPathHistory([]);
    setCurrentTransitionIndex(0);
    // Don't auto-start animation
    setIsPlaying(false);
  }, []);

  // Add animation step handler
  const stepAnimation = useCallback(async () => {
    if (currentTransitionIndex >= animationQueue.length) {
      const lastTransition = animationQueue[animationQueue.length - 1];
      const finalState = lastTransition?.to;
  
      // Check for self-loops at final state
      let hasLoop = false;
      Object.entries(TRANSITIONS).forEach(([group, transitions]) => {
        Object.entries(transitions).forEach(([key, config]) => {
          const [from, to] = key.split('-');
          if (from === finalState && to === finalState) {
            hasLoop = true;
            const loopTransition = {
              from: finalState,
              to: finalState,
              read: config.read,
              fromId: finalState,
              toId: finalState,
              group
            };
            setActivePath(`e${from}-${to}-${group}`);
            setPathHistory(prev => [...prev, loopTransition]);
          }
        });
      });
  
      // Add delay for loop animation at final state
      if (hasLoop) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      setIsPlaying(false);
      return;
    }
  
    const transition = animationQueue[currentTransitionIndex];
    const currentState = transition.from;
  
    // Check for self-loops at current state
    let hasLoop = false;
    Object.entries(TRANSITIONS).forEach(([group, transitions]) => {
      Object.entries(transitions).forEach(([key, config]) => {
        const [from, to] = key.split('-');
        if (from === currentState && to === currentState) {
          hasLoop = true;
          const loopTransition = {
            from: currentState,
            to: currentState,
            read: config.read,
            fromId: currentState,
            toId: currentState,
            group
          };
          setActivePath(`e${from}-${to}-${group}`);
          setPathHistory(prev => [...prev, loopTransition]);
        }
      });
    });
  
    // If there's a loop, wait before proceeding
    if (hasLoop) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  
    // Regular transition
    setActivePath(`e${transition.from}-${transition.to}-${transition.group || 'GRAMMAR'}`);
    setPathHistory(prev => [...prev, transition]);
    setActiveNodeId(transition.to);
  
    await new Promise(resolve => setTimeout(resolve, 800));
  
    if (currentTransitionIndex < animationQueue.length - 1) {
      setCurrentTransitionIndex(prev => prev + 1);
    } else {
      setCurrentTransitionIndex(prev => prev + 1); // This triggers the final state loop check
    }
  }, [currentTransitionIndex, animationQueue, selectedToken, ACCEPTING_STATES, TRANSITIONS]);

  // Add animation loop effect
  useEffect(() => {
    let timeoutId;
    
    if (isPlaying) {
      timeoutId = setTimeout(stepAnimation, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPlaying, stepAnimation]);

  // Now use the functions in useEffect
  useEffect(() => {
    if (selectedToken) {
      console.log('Selected Token Details:', {
        value: selectedToken.value,
        type: selectedToken.type,
        finalState: selectedToken.finalState,
        transitions: selectedToken.transitions,
        states: selectedToken.states // New enriched data
      });
      
      // Start animation with the token's transitions
      animateToken(selectedToken);
    }
  }, [selectedToken, animateToken]);

  // Update the edge style with self-loops
  const edgeTypes = useMemo(() => ({
    default: ({ id, sourceX, sourceY, targetX, targetY, label, style, data }) => {
      // Check if this edge is part of the current token's path
      const isActive = pathHistory.some(t => 
        `e${t.fromId || t.from}-${t.toId || t.to}` === `e${data.from}-${data.to}`
      );
      
      const strokeColor = isActive ? '#EC4899' : '#374151';
      const strokeWidth = isActive ? 2.5 : 1.5;
      const labelColor = isActive ? '#EC4899' : '#9CA3AF';
      const opacity = isActive ? 1 : 0.6;

      // Self-loop handling
      const isSelfLoop = data.from === data.to;
      let pathData;
      let labelX;
      let labelY;

      if (isSelfLoop) {
        // Adjust self-loop to start from center
        const radius = 30;
        const centerX = sourceX;
        const centerY = sourceY;
        
        pathData = `
          M ${centerX} ${centerY}
          C ${centerX - radius} ${centerY},
            ${centerX - radius} ${centerY - radius * 2},
            ${centerX} ${centerY - radius * 2}
          C ${centerX + radius} ${centerY - radius * 2},
            ${centerX + radius} ${centerY},
            ${centerX} ${centerY}
        `;
        
        labelX = centerX;
        labelY = centerY - radius * 2 - 10;
      } else {
        // Regular edge from center to center
        pathData = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
        labelX = (sourceX + targetX) / 2;
        labelY = (sourceY + targetY) / 2;
      }

      return (
        <g style={{ opacity }}>
          <path
            id={id}
            d={pathData}
            style={{ 
              stroke: strokeColor,
              strokeWidth,
              fill: 'none',
              filter: isActive ? 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.3))' : 'none',
              transition: 'all 0.3s ease'
            }}
          />
          <text
            x={labelX}
            y={labelY}
            dy={-5}
            textAnchor="middle"
            style={{ 
              fill: labelColor,
              fontSize: '12px',
              transition: 'all 0.3s ease',
              userSelect: 'none'
            }}
            className="font-mono"
          >
            {label}
          </text>
        </g>
      );
    }
  }), [pathHistory]);

  const nodeTypes = useMemo(() => ({
    custom: CustomNode
  }), []);

  // Initialize nodes
  useEffect(() => {
    if (!automaton?.states) return;
    
    const initialNodes = Object.entries(INITIAL_STATES).map(([id, state]) => ({
      id,
      type: 'custom',
      position: { x: state.x, y: state.y },
      data: {
        id,
        name: state.name,
        type: state.type,
        isActive: id === activeNodeId
      }
    }));

    setNodes(initialNodes);
  }, [automaton, activeNodeId]);

  // Update edges useEffect to include self-loops
  useEffect(() => {
    if (!automaton?.transitions) return;
    
    const newEdges = Object.entries(TRANSITIONS).flatMap(([group, transitions], groupIndex) =>
      Object.entries(transitions).map(([key, config], transitionIndex) => {
        const [from, to] = key.split('-');
        const isActive = `e${from}-${to}` === activePath;
        
        // Create unique ID combining source, target, and group info
        const uniqueId = `e${from}-${to}-${group}-${transitionIndex}`;
        
        return {
          id: uniqueId,
          source: from,
          target: to,
          sourceHandle: `source-${from}`,
          targetHandle: `target-${to}`,
          type: 'default',
          label: config.read,
          data: { 
            from, 
            to,
            group,
            isSelfLoop: from === to
          },
          style: {
            strokeWidth: isActive ? 2.5 : 1.5
          }
        };
      })
    );

    setEdges(newEdges);
  }, [automaton, activePath]);

  // Update useEffect for nodes to include final state handling
  useEffect(() => {
    if (!automaton?.states || !selectedToken) return;
    
    const initialNodes = Object.entries(INITIAL_STATES).map(([id, state]) => ({
      id,
      type: 'custom',
      position: { x: state.x, y: state.y },
      data: {
        id,
        name: state.name,
        type: state.type,
        isActive: id === activeNodeId,
        isFinal: state.type === 'final',
        isAccepted: selectedToken.finalState === id && 
                   ACCEPTING_STATES[selectedToken.type]?.includes(id)
      }
    }));

    setNodes(initialNodes);
  }, [automaton, activeNodeId, selectedToken]);

  return (
    <motion.div className="relative h-full w-full">
      <div className="h-full w-full bg-[#0D1117]/30 rounded-xl overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{
            type: 'default'
          }}
          connectionMode="loose"
          fitView
          minZoom={INITIAL_CONFIG.minZoom}
          maxZoom={INITIAL_CONFIG.maxZoom}
          defaultViewport={INITIAL_CONFIG.defaultViewport}
          fitViewOptions={{
            padding: INITIAL_CONFIG.fitViewPadding,
            duration: 500,
            minZoom: 0.8,
            maxZoom: 1
          }}
          elementsSelectable={false}
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Background color="#EC4899" variant="dots" gap={20} size={1} />
          <Controls />
        </ReactFlow>
        <AnimationControls
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
        />
      </div>
    </motion.div>
  );
};

export default AutomataGraph;