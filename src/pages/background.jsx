
import { createNoise3D } from "simplex-noise";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";
import  { useEffect, useRef} from "react";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const width = (ctx.canvas.width = window.innerWidth);
      const height = (ctx.canvas.height = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      ));
      ctx.filter = `blur(${blur}px)`;
      return { width, height, ctx };
    }
    return {};
  };

  const drawWave = (ctx, width, height, nt) => {
    const waveColors = colors ?? [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 70;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < width; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + height * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  useEffect(() => {
    let animationId;
    const { ctx, width, height } = resizeCanvas();
    let nt = 0;

    const render = () => {
      if (ctx) {
        ctx.fillStyle = backgroundFill || "black";
        ctx.globalAlpha = waveOpacity;
        ctx.fillRect(0, 0, width, height);
        drawWave(ctx, width, height, nt);
        nt += getSpeed();
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [colors, waveWidth, backgroundFill, blur, waveOpacity, speed]);

  return (
    <div
      className={cn(
        "relative  w-full min-h-screen overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="position-center absolute inset-0 z-0 pointer-events-none"
      ></canvas>
      <div className={cn("container relative z-10", className)}>{children}</div>
    </div>
  );
};

WavyBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  waveWidth: PropTypes.number,
  backgroundFill: PropTypes.string,
  blur: PropTypes.number,
  speed: PropTypes.oneOf(["slow", "fast"]),
  waveOpacity: PropTypes.number,
};
