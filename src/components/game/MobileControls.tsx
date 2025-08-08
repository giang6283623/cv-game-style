import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaEye,
  FaEyeSlash,
  FaFistRaised,
  FaRunning,
} from "react-icons/fa";
import { GiJumpAcross, GiPowerLightning, GiSwordSlice } from "react-icons/gi";

interface MobileControlsProps {
  onMove: (direction: string, pressed: boolean) => void;
  onAction: (action: string) => void;
  onJump: () => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({
  onMove,
  onAction,
  onJump,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const [dpadHidden, setDpadHidden] = useState(false);
  const [actionsHidden, setActionsHidden] = useState(false);

  useEffect(() => {
    // Only show on mobile/tablet devices
    const checkDevice = () => {
      const isMobile =
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window;
      setIsVisible(isMobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Release any held movement when D-Pad is hidden
  useEffect(() => {
    if (!dpadHidden) return;
    setActiveButtons((prev) => {
      const prevSet = new Set(prev);
      ["up", "down", "left", "right"].forEach((dir) => {
        if (prevSet.has(dir)) {
          onMove(dir, false);
        }
      });
      return new Set();
    });
  }, [dpadHidden, onMove]);

  if (!isVisible) return null;

  const handleTouchStart = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    setActiveButtons((prev) => new Set(prev).add(direction));
    if (["up", "down", "left", "right"].includes(direction)) {
      onMove(direction, true);
    }
  };

  const handleTouchEnd = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    setActiveButtons((prev) => {
      const newSet = new Set(prev);
      newSet.delete(direction);
      return newSet;
    });
    if (["up", "down", "left", "right"].includes(direction)) {
      onMove(direction, false);
    }
  };

  const handleAction = (action: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    onAction(action);
  };

  const handleJump = (e: React.TouchEvent) => {
    e.preventDefault();
    onJump();
  };

  const toggleControls = (
    e: React.PointerEvent | React.TouchEvent | React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDpadHidden((prev) => !prev);
    setActionsHidden((prev) => !prev);
  };
  const allHidden = dpadHidden && actionsHidden;

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "#fff",
    border: "2px solid #2ed573",
    background: isActive ? "rgba(46, 213, 115, 0.8)" : "rgba(13, 13, 26, 0.8)",
    backdropFilter: "blur(5px)",
    cursor: "pointer",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "none",
    transition: "all 0.1s",
  });

  const actionButtonStyle = (
    color: string,
    isActive: boolean
  ): React.CSSProperties => ({
    ...buttonStyle(isActive),
    width: "45px",
    height: "45px",
    border: `2px solid ${color}`,
    background: isActive ? `${color}88` : "rgba(13, 13, 26, 0.8)",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}
    >
      {/* D-Pad for movement */}
      {!dpadHidden && (
        <motion.div
          drag="x"
          dragMomentum={false}
          onDragEnd={(_e, info) => {
            if (info.offset.x < -60) {
              setDpadHidden(true);
            }
          }}
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
            pointerEvents: "auto",
          }}
        >
          {/* Up */}
          <div
            onTouchStart={handleTouchStart("up")}
            onTouchEnd={handleTouchEnd("up")}
            style={{
              ...buttonStyle(activeButtons.has("up")),
              position: "absolute",
              top: 0,
              left: "50px",
            }}
          >
            <FaArrowUp />
          </div>

          {/* Down */}
          <div
            onTouchStart={handleTouchStart("down")}
            onTouchEnd={handleTouchEnd("down")}
            style={{
              ...buttonStyle(activeButtons.has("down")),
              position: "absolute",
              bottom: 0,
              left: "50px",
            }}
          >
            <FaArrowDown />
          </div>

          {/* Left */}
          <div
            onTouchStart={handleTouchStart("left")}
            onTouchEnd={handleTouchEnd("left")}
            style={{
              ...buttonStyle(activeButtons.has("left")),
              position: "absolute",
              top: "50px",
              left: 0,
            }}
          >
            <FaArrowLeft />
          </div>

          {/* Right */}
          <div
            onTouchStart={handleTouchStart("right")}
            onTouchEnd={handleTouchEnd("right")}
            style={{
              ...buttonStyle(activeButtons.has("right")),
              position: "absolute",
              top: "50px",
              right: 0,
            }}
          >
            <FaArrowRight />
          </div>

          {/* Center (Run modifier) */}
          <div
            onTouchStart={handleTouchStart("shift")}
            onTouchEnd={handleTouchEnd("shift")}
            style={{
              ...buttonStyle(activeButtons.has("shift")),
              position: "absolute",
              top: "50px",
              left: "50px",
              background: activeButtons.has("shift")
                ? "rgba(255, 216, 61, 0.8)"
                : "rgba(13, 13, 26, 0.8)",
              border: "2px solid #ffd93d",
            }}
          >
            <FaRunning />
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      {!actionsHidden && (
        <motion.div
          drag="x"
          dragMomentum={false}
          onDragEnd={(_e, info) => {
            if (info.offset.x > 60) {
              setActionsHidden(true);
            }
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            pointerEvents: "auto",
          }}
        >
          {/* Jump */}
          <div
            onTouchStart={handleJump}
            style={{
              ...actionButtonStyle("#4ecdc4", false),
              gridColumn: "span 3",
              width: "145px",
            }}
          >
            <GiJumpAcross />
          </div>

          {/* Attack */}
          <div
            onTouchStart={handleAction("attack")}
            style={actionButtonStyle("#ff4757", false)}
          >
            <GiSwordSlice />
          </div>

          {/* Kick */}
          <div
            onTouchStart={handleAction("kick")}
            style={actionButtonStyle("#ff6b7a", false)}
          >
            <FaFistRaised />
          </div>

          {/* Special */}
          <div
            onTouchStart={handleAction("special")}
            style={actionButtonStyle("#ffd93d", false)}
          >
            <GiPowerLightning />
          </div>
        </motion.div>
      )}

      {/* Toggle button (always visible) */}
      <motion.button
        onPointerDown={toggleControls}
        whileTap={{ scale: 0.9 }}
        aria-label={allHidden ? "Show controls" : "Hide controls"}
        style={{
          pointerEvents: "auto",
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: allHidden
            ? "linear-gradient(135deg, #2ed573, #1eae72)"
            : "linear-gradient(135deg, #1a1a2e, #16213e)",
          border: `3px solid ${allHidden ? "#2ed573" : "#888"}`,
          color: "#fff",
          boxShadow: allHidden
            ? "0 8px 20px rgba(0,0,0,0.4), 0 0 10px rgba(46,213,115,0.6)"
            : "0 8px 20px rgba(0,0,0,0.4)",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "none",
          zIndex: 1200,
        }}
      >
        {allHidden ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
      </motion.button>
    </motion.div>
  );
};

export default MobileControls;
