import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, glassCard, gradientText} from '../styles';

export const SceneModeSelector: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
  const card1Scale = spring({frame: frame - fps * 0.3, fps, config: {damping: 12}});
  const card2Scale = spring({frame: frame - fps * 0.5, fps, config: {damping: 12}});

  // Cursor animation: appears and clicks "Minorista"
  const cursorOpacity = interpolate(frame, [fps * 1.2, fps * 1.5], [0, 1], {extrapolateRight: 'clamp'});
  const cursorX = interpolate(frame, [fps * 1.5, fps * 2], [540, 310], {extrapolateRight: 'clamp'});
  const cursorY = interpolate(frame, [fps * 1.5, fps * 2], [1400, 900], {extrapolateRight: 'clamp'});
  const clickPulse = frame > fps * 2.1 && frame < fps * 2.5 ? 1.15 : 1;
  const card1Glow = frame > fps * 2.1 ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.15)';

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Outfit, sans-serif',
        padding: 60,
      }}
    >
      <h2
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: colors.text,
          textAlign: 'center',
          opacity: titleOpacity,
          marginBottom: 12,
        }}
      >
        Como queres comprar?
      </h2>
      <p
        style={{
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 2,
          opacity: titleOpacity,
          marginBottom: 60,
        }}
      >
        Elegi tu tipo de precio
      </p>

      <div style={{display: 'flex', gap: 24, width: '100%'}}>
        {/* Minorista */}
        <div
          style={{
            ...glassCard,
            flex: 1,
            padding: '48px 32px',
            textAlign: 'center',
            transform: `scale(${card1Scale * clickPulse})`,
            borderColor: card1Glow,
            transition: 'border-color 0.3s',
          }}
        >
          <div style={{fontSize: 60, marginBottom: 20}}>🛒</div>
          <h3 style={{fontSize: 22, fontWeight: 800, color: colors.accent, letterSpacing: 3, margin: 0}}>
            MINORISTA
          </h3>
          <p style={{fontSize: 15, color: colors.textMuted, marginTop: 10}}>
            Precios unitarios
          </p>
        </div>

        {/* Mayorista */}
        <div
          style={{
            ...glassCard,
            flex: 1,
            padding: '48px 32px',
            textAlign: 'center',
            transform: `scale(${card2Scale})`,
          }}
        >
          <div style={{fontSize: 60, marginBottom: 20}}>📦</div>
          <h3 style={{fontSize: 22, fontWeight: 800, color: colors.accent2, letterSpacing: 3, margin: 0}}>
            MAYORISTA
          </h3>
          <p style={{fontSize: 15, color: colors.textMuted, marginTop: 10}}>
            Precios por volumen
          </p>
        </div>
      </div>

      {/* Cursor */}
      <div
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          fontSize: 36,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          transform: `scale(${frame > fps * 2.1 && frame < fps * 2.3 ? 0.85 : 1})`,
        }}
      >
        👆
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: colors.textMuted,
            background: 'rgba(255,255,255,0.05)',
            padding: '10px 24px',
            borderRadius: 50,
            border: '0.5px solid rgba(255,255,255,0.1)',
            letterSpacing: 2,
          }}
        >
          SELECTOR DE MODO
        </span>
      </div>
    </AbsoluteFill>
  );
};
