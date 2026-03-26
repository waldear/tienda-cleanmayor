import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, gradientText, glassCard} from '../styles';

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoScale = spring({frame, fps, config: {damping: 10, stiffness: 60}});
  const textOpacity = interpolate(frame, [fps * 0.5, fps * 1], [0, 1], {extrapolateRight: 'clamp'});
  const ctaOpacity = interpolate(frame, [fps * 1, fps * 1.5], [0, 1], {extrapolateRight: 'clamp'});
  const ctaY = interpolate(frame, [fps * 1, fps * 1.5], [30, 0], {extrapolateRight: 'clamp'});

  // Pulsing CTA
  const pulse = 1 + Math.sin(frame * 0.15) * 0.02;

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Outfit, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          border: '0.5px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${logoScale})`,
          boxShadow: '0 25px 60px rgba(0,0,0,0.45), 0 0 80px rgba(0,212,255,0.15)',
          marginBottom: 40,
        }}
      >
        <span style={{fontSize: 64, fontWeight: 800, ...gradientText}}>CS</span>
      </div>

      <h2
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: colors.text,
          textAlign: 'center',
          opacity: textOpacity,
          margin: '0 0 12px',
        }}
      >
        Tu Tienda Online
      </h2>
      <p
        style={{
          fontSize: 20,
          color: colors.textMuted,
          opacity: textOpacity,
          textAlign: 'center',
          letterSpacing: 1,
          margin: '0 0 50px',
        }}
      >
        Lista para vender en minutos
      </p>

      {/* CTA */}
      <div
        style={{
          padding: '22px 60px',
          borderRadius: 50,
          background: 'linear-gradient(135deg, rgba(0,212,255,0.85), rgba(123,47,247,0.85))',
          color: '#fff',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px) scale(${pulse})`,
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.4), 0 15px 40px rgba(0,212,255,0.35)',
        }}
      >
        CONSULTAR AHORA
      </div>

      {/* Bottom text */}
      <p
        style={{
          position: 'absolute',
          bottom: 120,
          fontSize: 14,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}
      >
        100% Automatizada
      </p>
    </AbsoluteFill>
  );
};
