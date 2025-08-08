import { motion } from "framer-motion";
import React from "react";

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  glowing?: boolean;
}

const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  icon,
  disabled = false,
  fullWidth = false,
  href,
  target,
}) => {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #FF6B6B, #FF6B6B99)",
      borderColor: "#FF6B6B",
      shadowColor: "#FF6B6B55",
      textColor: "#ffffff",
    },
    secondary: {
      background: "linear-gradient(135deg, #4ECDC4, #4ECDC499)",
      borderColor: "#4ECDC4",
      shadowColor: "#4ECDC455",
      textColor: "#ffffff",
    },
    success: {
      background: "linear-gradient(135deg, #95E77E, #95E77E99)",
      borderColor: "#95E77E",
      shadowColor: "#95E77E55",
      textColor: "#ffffff",
    },
    warning: {
      background: "linear-gradient(135deg, #FFD93D, #FFD93D99)",
      borderColor: "#FFD93D",
      shadowColor: "#FFD93D55",
      textColor: "#ffffff",
    },
    danger: {
      background: "linear-gradient(135deg, #FF8CC3, #FF8CC399)",
      borderColor: "#FF8CC3",
      shadowColor: "#FF8CC355",
      textColor: "#ffffff",
    },
    info: {
      background: "linear-gradient(135deg, #00D9FF, #00D9FF99)",
      borderColor: "#00D9FF",
      shadowColor: "#00D9FF55",
      textColor: "#ffffff",
    },
  };

  const sizes = {
    small: {
      padding: "6px 10px",
      fontSize: "0.5rem",
      iconSize: "1rem",
      height: "36px",
    },
    medium: {
      padding: "8px 12px",
      fontSize: "0.65rem",
      iconSize: "1rem",
      height: "38px",
    },
    large: {
      padding: "10px 16px",
      fontSize: "0.7rem",
      iconSize: "1.1rem",
      height: "42px",
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const buttonStyle: React.CSSProperties = {
    fontFamily: "Press Start 2P, cursive",
    fontSize: currentSize.fontSize,
    padding: currentSize.padding,
    background: currentVariant.background,
    color: currentVariant.textColor,
    border: `2px solid ${currentVariant.borderColor}`,
    borderRadius: "8px",
    position: "relative",
    cursor: disabled ? "not-allowed" : "pointer",
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: fullWidth ? "100%" : "auto",
    textDecoration: "none",
    opacity: disabled ? 0.6 : 1,
    height: currentSize.height,
    boxShadow: `0 0 12px ${currentVariant.shadowColor}`,
    overflow: "hidden",
    userSelect: "none",
    margin: 0,
  };

  const content = (
    <>
      {/* Animated shine effect */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, ${currentVariant.borderColor}33, transparent)`,
          pointerEvents: "none",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {icon && (
        <span
          style={{
            fontSize: currentSize.iconSize,
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </>
  );

  const Component = href ? "a" : motion.button;
  const componentProps = href
    ? {
        href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : { onClick: disabled ? undefined : onClick, disabled };

  return (
    <Component
      {...componentProps}
      style={buttonStyle}
      whileHover={
        !disabled
          ? {
              scale: 1.05,
              boxShadow: `0 0 20px ${currentVariant.borderColor}66`,
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              scale: 0.95,
            }
          : {}
      }
    >
      {content}
    </Component>
  );
};

export default GameButton;
