import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHome,
  FaLock,
  FaStar,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import { GiTreasureMap } from "react-icons/gi";
import { useLocation } from "react-router-dom";

interface MapNode {
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  color: string;
  unlocked: boolean;
  stars: number;
  description: string;
}

interface DungeonMapProps {
  characterPosition: { x: number; y: number };
  onNodeClick: (node: MapNode) => void;
  onClose?: () => void;
}

const DungeonMap: React.FC<DungeonMapProps> = ({ onNodeClick, onClose }) => {
  const location = useLocation();
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(["home"]);
  const [nodeStars, setNodeStars] = useState<{ [key: string]: number }>({});
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  // Better positioned nodes for cleaner connections
  const mapNodes: MapNode[] = [
    {
      id: "home",
      path: "/",
      label: "HOME",
      icon: <FaHome />,
      x: 50,
      y: 75,
      color: "#00D9FF",
      unlocked: true,
      stars: 3,
      description: "Welcome to my portfolio",
    },
    {
      id: "experience",
      path: "/experience",
      label: "QUESTS",
      icon: <FaBriefcase />,
      x: 30,
      y: 55,
      color: "#FF6B6B",
      unlocked: true,
      stars: 0,
      description: "Work experience & projects",
    },
    {
      id: "skills",
      path: "/skills",
      label: "SKILLS",
      icon: <FaCode />,
      x: 70,
      y: 55,
      color: "#4ECDC4",
      unlocked: true,
      stars: 0,
      description: "Technical & soft skills",
    },
    {
      id: "education",
      path: "/education",
      label: "LEARN",
      icon: <FaGraduationCap />,
      x: 30,
      y: 35,
      color: "#95E77E",
      unlocked: true,
      stars: 0,
      description: "Education & certificates",
    },
    {
      id: "achievements",
      path: "/achievements",
      label: "AWARDS",
      icon: <FaTrophy />,
      x: 70,
      y: 35,
      color: "#FFD93D",
      unlocked: true,
      stars: 0,
      description: "Awards & achievements",
    },
    {
      id: "contact",
      path: "/contact",
      label: "CONTACT",
      icon: <FaEnvelope />,
      x: 50,
      y: 21, // Moved slightly down to avoid direct conflict with the header
      color: "#FF8CC3",
      unlocked: true,
      stars: 0,
      description: "Get in touch",
    },
  ];

  // Draw paths between nodes
  const paths = [
    { from: "home", to: "experience" },
    { from: "home", to: "skills" },
    { from: "experience", to: "education" },
    { from: "skills", to: "achievements" },
    { from: "education", to: "contact" },
    { from: "achievements", to: "contact" },
    { from: "experience", to: "skills" },
  ];

  const handleNodeClick = (node: MapNode) => {
    if (node.unlocked) {
      onNodeClick(node);

      // Unlock adjacent nodes
      const adjacentNodes = paths
        .filter((p) => p.from === node.id || p.to === node.id)
        .map((p) => (p.from === node.id ? p.to : p.from));

      setUnlockedNodes((prev) => [...new Set([...prev, ...adjacentNodes])]);

      // Award stars
      setNodeStars((prev) => ({
        ...prev,
        [node.id]: Math.min((prev[node.id] || 0) + 1, 3),
      }));
    }
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      const vw = isMobileView
        ? Math.min(window.innerWidth * 0.95, 600)
        : Math.min(window.innerWidth * 0.9, 1200);
      const vh = isMobileView
        ? Math.min(window.innerHeight * 0.7, 500)
        : Math.min(window.innerHeight * 0.75, 700);
      setDimensions({ width: vw, height: vh });
      setIsReady(true);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Delay mount animation to avoid initial lag
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoize unlocked state for performance
  const unlockedNodesSet = useMemo(
    () => new Set(unlockedNodes),
    [unlockedNodes]
  );

  return (
    <div
      ref={mapRef}
      style={{
        position: "relative",
        width: dimensions.width || "90vw",
        maxWidth: "1200px",
        height: dimensions.height || "70vh",
        maxHeight: "700px",
        minHeight: isMobile ? "350px" : "400px",
        margin: "0 auto",
        background: `
          radial-gradient(ellipse at center, rgba(78, 205, 196, 0.1), transparent 50%),
          linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
        `,
        border: "4px solid #533483",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 0 50px rgba(78, 205, 196, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(83, 52, 131, 0.1) 20px, rgba(83, 52, 131, 0.1) 40px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(78, 205, 196, 0.05) 20px, rgba(78, 205, 196, 0.05) 40px)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Map Header with Title and Close Button - Redesigned for minimal interference */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: isMobile ? "36px" : "42px", // Fixed height instead of padding
          background: "rgba(0, 0, 0, 0.8)", // Solid background for better separation
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 6, // Higher than nodes but not tooltips
          pointerEvents: "none", // By default don't capture events
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px", // Reduced gap
            margin: "16px",
            pointerEvents: "auto", // Re-enable pointer events for this element
          }}
        >
          <GiTreasureMap size={isMobile ? 14 : 16} color="#4ECDC4" />
          <h3
            style={{
              margin: 0,
              fontFamily: "Press Start 2P, cursive",
              fontSize: isMobile ? "0.5rem" : "0.6rem", // Smaller font
              color: "#4ECDC4",
              textShadow: "1px 1px 0 #000",
            }}
          >
            DUNGEON MAP
          </h3>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)",
              border: "2px solid #FF4757",
              borderRadius: "0px 16px 0px 64px",
              padding: isMobile ? "3px 8px" : "5px 10px", // Smaller padding
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              cursor: "pointer",
              fontSize: isMobile ? "0.5rem" : "0.6rem", // Smaller font
              fontFamily: "Press Start 2P, cursive",
              color: "#fff",
              textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
              boxShadow: "0 3px 0 #CC2E44, 0 4px 6px rgba(0,0,0,0.3)",
              pointerEvents: "auto", // Re-enable pointer events for the button
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-2px)";
              target.style.boxShadow =
                "0 5px 0 #CC2E44, 0 6px 8px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.boxShadow =
                "0 3px 0 #CC2E44, 0 4px 6px rgba(0,0,0,0.3)";
            }}
            onMouseDown={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(2px)";
              target.style.boxShadow =
                "0 1px 0 #CC2E44, 0 2px 3px rgba(0,0,0,0.3)";
            }}
            onMouseUp={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-2px)";
              target.style.boxShadow =
                "0 5px 0 #CC2E44, 0 6px 8px rgba(0,0,0,0.4)";
            }}
            onClick={onClose}
          >
            <FaTimes size={isMobile ? 10 : 12} />
            <span>CLOSE</span>
          </button>
        )}
      </div>

      {/* Draw Paths - Behind nodes for proper layering */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8CC3" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pathGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {mounted &&
          paths.map((path, index) => {
            const fromNode = mapNodes.find((n) => n.id === path.from);
            const toNode = mapNodes.find((n) => n.id === path.to);
            if (!fromNode || !toNode) return null;

            const isConnected =
              unlockedNodesSet.has(path.from) && unlockedNodesSet.has(path.to);
            const isActivePath =
              (hoveredNode === path.from || hoveredNode === path.to) &&
              isConnected;

            return (
              <g key={`path-${path.from}-${path.to}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={
                    isConnected
                      ? isActivePath
                        ? "#66E8DE"
                        : "#4ECDC4"
                      : "rgba(100, 100, 120, 0.3)"
                  }
                  strokeWidth={
                    isMobile
                      ? isActivePath
                        ? "1.5"
                        : "1"
                      : isActivePath
                      ? "2"
                      : "1.5"
                  }
                  strokeDasharray={isConnected ? "0" : "4 2"}
                  opacity={
                    mounted ? (isConnected ? (isActivePath ? 1 : 0.9) : 0.4) : 0
                  }
                  filter={isActivePath ? "url(#pathGlow)" : "none"}
                  style={{
                    transition:
                      "opacity 0.5s ease-out, stroke 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease",
                    transitionDelay: `${index * 50}ms`,
                  }}
                />
              </g>
            );
          })}
      </svg>

      {/* Map Nodes */}
      {isReady &&
        mapNodes.map((node, index) => {
          const isActive = location.pathname === node.path;
          const isUnlocked = unlockedNodesSet.has(node.id) || node.unlocked;
          const stars = nodeStars[node.id] || node.stars;
          const isHovered = hoveredNode === node.id;
          const isTooltipVisible = (isHovered || isActive) && isUnlocked;

          // Special handling for the Contact node to ensure it works properly
          const isContactNode = node.id === "contact";
          const nodeZIndex =
            isActive || isHovered
              ? 10 // Higher priority for active/hovered nodes
              : isContactNode
              ? 7 // Contact node gets higher z-index to ensure it's above header
              : 5;

          // Create a node wrapper that encompasses both the node button and its label
          return (
            <div
              key={node.id}
              className="map-node-wrapper"
              style={{
                position: "absolute",
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0})`,
                opacity: mounted ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: `${index * 60}ms`,
                zIndex: nodeZIndex,
              }}
            >
              {/* Interactive Area - This is the main clickable/hoverable area that contains both 
                  the node button and its label. Using padding to expand the hover area. */}
              <div
                style={{
                  cursor: isUnlocked ? "pointer" : "not-allowed",
                  padding: "10px", // Add padding to expand the interactive area
                  margin: "-10px", // Negative margin to offset the padding
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  // For contact node, ensure we're positioned properly relative to the header
                  marginTop: isContactNode ? (isMobile ? "20px" : "25px") : "0",
                }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => isUnlocked && setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onTouchStart={(e) => {
                  if (isUnlocked) {
                    e.preventDefault(); // Prevent double-firing with onClick
                    setHoveredNode(hoveredNode === node.id ? null : node.id);
                  }
                }}
                tabIndex={isUnlocked ? 0 : -1}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && isUnlocked) {
                    handleNodeClick(node);
                  }
                }}
                role="button"
                aria-label={`${node.label}: ${node.description}`}
              >
                {/* Node Button */}
                <div
                  style={{
                    width: isMobile ? "50px" : "70px",
                    height: isMobile ? "50px" : "70px",
                    background: isUnlocked
                      ? `radial-gradient(circle at 30% 30%, ${node.color}, ${node.color}dd)`
                      : "radial-gradient(circle at 30% 30%, #666, #333)",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isActive
                      ? `4px solid #fff`
                      : `3px solid ${isUnlocked ? node.color : "#444"}`,
                    boxShadow: `
                      0 5px 0 ${isUnlocked ? node.color + "99" : "#222"},
                      0 10px 20px rgba(0, 0, 0, 0.5),
                      inset 0 -5px 10px rgba(0, 0, 0, 0.3),
                      ${isActive ? `0 0 30px ${node.color}` : ""}
                      ${
                        isHovered && !isActive ? `0 0 20px ${node.color}99` : ""
                      }
                    `,
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    transform:
                      isActive || isHovered
                        ? "translateY(-3px)"
                        : "translateY(0)",
                  }}
                >
                  {/* Shine Effect - Only on hover or active for performance */}
                  {(isActive || isHovered) && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 60%)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* Lock/Icon */}
                  <div
                    style={{
                      fontSize: isMobile ? "1.2rem" : "1.8rem",
                      color: "#fff",
                      marginBottom: "3px",
                    }}
                  >
                    {isUnlocked ? node.icon : <FaLock />}
                  </div>

                  {/* Stars */}
                  {isUnlocked && (
                    <div style={{ display: "flex", gap: "1px" }}>
                      {[1, 2, 3].map((star) => (
                        <FaStar
                          key={star}
                          size={isMobile ? 8 : 10}
                          color={star <= stars ? "#ffd93d" : "#333"}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Node Label */}
                <div
                  style={{
                    marginTop: isMobile ? "5px" : "8px",
                    padding: isMobile ? "3px 6px" : "5px 10px",
                    background: "rgba(0, 0, 0, 0.8)",
                    border: `2px solid ${
                      isUnlocked
                        ? isHovered || isActive
                          ? "#fff"
                          : node.color
                        : "#444"
                    }`,
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "Press Start 2P, cursive",
                      fontSize: isMobile ? "0.5rem" : "0.6rem",
                      color: isUnlocked ? "#fff" : "#666",
                      textAlign: "center",
                    }}
                  >
                    {node.label}
                  </p>
                </div>

                {/* Tooltip positioned relative to node */}
                <AnimatePresence>
                  {isTooltipVisible && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: "absolute",
                        left: isMobile ? "80px" : "100px", // Position to the right of the node
                        top: isMobile ? "10px" : "10px", // Position near the top
                        background: "rgba(0, 0, 0, 0.95)",
                        border: `2px solid ${node.color}`,
                        borderRadius: "6px",
                        padding: isMobile ? "2px 4px" : "10px 15px",
                        width: "max-content",
                        maxWidth: isMobile ? "120px" : "250px",
                        minWidth: "60px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        pointerEvents: "none",
                        boxShadow: `0 4px 12px rgba(0,0,0,0.5), 0 0 10px ${node.color}55`,
                        transition: "all 0.3s ease-out",
                        zIndex: 100, // High z-index to ensure tooltip is above everything
                      }}
                    >
                      {/* Arrow pointing to node */}
                      <div
                        style={{
                          position: "absolute",
                          left: "-12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 0,
                          height: 0,
                          borderWidth: 6,
                          borderStyle: "solid",
                          borderColor: `transparent ${node.color} transparent transparent`,
                        }}
                      />

                      <p
                        style={{
                          margin: 0,
                          fontFamily: "Oxanium, sans-serif",
                          fontSize: isMobile ? "0.9rem" : "1.2rem",
                          color: "#fff",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                          textAlign: "center",
                          lineHeight: 1.4,
                        }}
                      >
                        {node.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DungeonMap;
