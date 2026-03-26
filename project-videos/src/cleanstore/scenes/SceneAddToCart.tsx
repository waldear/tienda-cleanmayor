import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, glassCard, gradientText} from '../styles';

export const SceneAddToCart: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Animate adding items: click + at 0.5s, 1.2s, 1.8s
  const qty = frame < fps * 0.5 ? 0 : frame < fps * 1.2 ? 1 : frame < fps * 1.8 ? 2 : 3;
  const subtotal = qty * 1200;

  // Cart bar appears after first item
  const cartBarOpacity = interpolate(frame, [fps * 0.6, fps * 0.9], [0, 1], {extrapolateRight: 'clamp'});
  const cartBarY = interpolate(frame, [fps * 0.6, fps * 0.9], [80, 0], {extrapolateRight: 'clamp'});

  // Pulse on + click
  const isPulsing = (
    (frame > fps * 0.5 && frame < fps * 0.65) ||
    (frame > fps * 1.2 && frame < fps * 1.35) ||
    (frame > fps * 1.8 && frame < fps * 1.95)
  );

  // Cursor animation
  const cursorOpacity = interpolate(frame, [fps * 0.2, fps * 0.4], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Outfit, sans-serif',
        padding: '60px 40px',
        justifyContent: 'center',
      }}
    >
      {/* Product card */}
      <div
        style={{
          ...glassCard,
          overflow: 'hidden',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: '100%',
            height: 280,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(168,85,247,0.08))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 100,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          J
        </div>
        <div style={{padding: '24px 28px'}}>
          <h3 style={{fontSize: 24, fontWeight: 700, color: colors.text, margin: 0}}>
            Jabon Liquido Manos 1L
          </h3>
          <p style={{fontSize: 15, color: colors.textMuted, margin: '8px 0 20px'}}>
            Calidad garantizada Clean Store
          </p>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: 28, fontWeight: 700, ...gradientText}}>$1.200</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: 'rgba(255,255,255,0.07)',
                padding: '8px 14px',
                borderRadius: 16,
                border: '0.5px solid rgba(255,255,255,0.16)',
              }}
            >
              <span style={{color: '#fff', fontSize: 22, fontWeight: 700, width: 30, textAlign: 'center'}}>-</span>
              <span
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 800,
                  minWidth: 30,
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  transform: isPulsing ? 'scale(1.3)' : 'scale(1)',
                }}
              >
                {qty}
              </span>
              <span
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 700,
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isPulsing
                    ? 'linear-gradient(135deg, #00d4ff, #a855f7)'
                    : 'rgba(255,255,255,0.08)',
                  boxShadow: isPulsing ? '0 4px 12px rgba(0,212,255,0.3)' : 'none',
                }}
              >
                +
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cart bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
          left: 60,
          right: 60,
          background: 'rgba(255,255,255,0.08)',
          border: '0.5px solid rgba(255,255,255,0.22)',
          borderRadius: 50,
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: cartBarOpacity,
          transform: `translateY(${cartBarY}px)`,
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.35), 0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        <span style={{color: '#fff', fontSize: 16, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase'}}>
          Ver Pedido
        </span>
        <span style={{color: '#fff', fontSize: 18, fontWeight: 700, ...gradientText}}>
          ${subtotal.toLocaleString('es-AR')}
        </span>
      </div>

      {/* Cursor */}
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 520,
          opacity: cursorOpacity,
          fontSize: 32,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          transform: `scale(${isPulsing ? 0.8 : 1})`,
        }}
      >
        👆
      </div>

      {/* Label */}
      <div style={{position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center'}}>
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
          CARRITO EN TIEMPO REAL
        </span>
      </div>
    </AbsoluteFill>
  );
};
