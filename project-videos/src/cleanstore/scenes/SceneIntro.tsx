import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, gradientText} from '../styles';

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoScale = spring({frame, fps, config: {damping: 12, stiffness: 80}});
  const textOpacity = interpolate(frame, [fps * 0.8, fps * 1.5], [0, 1], {extrapolateRight: 'clamp'});
  const subtitleOpacity = interpolate(frame, [fps * 1.3, fps * 2], [0, 1], {extrapolateRight: 'clamp'});
  const subtitleY = interpolate(frame, [fps * 1.3, fps * 2], [30, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      {/* Logo circle placeholder */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          border: '0.5px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${logoScale})`,
          boxShadow: '0 25px 60px rgba(0,0,0,0.45), 0 0 80px rgba(0,212,255,0.1)',
          marginBottom: 40,
        }}
      >
        <span style={{fontSize: 80, fontWeight: 800, ...gradientText}}>CS</span>
      </div>

      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: colors.text,
          letterSpacing: -1,
          opacity: textOpacity,
          margin: 0,
        }}
      >
        Clean Store
      </h1>

      <p
        style={{
          fontSize: 22,
          color: colors.textMuted,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontWeight: 300,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: 16,
        }}
      >
        Tienda Online Automatizada
      </p>
    </AbsoluteFill>
  );
};
