import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, glassCard, gradientText, products} from '../styles';

export const SceneCatalog: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Outfit, sans-serif',
        padding: '60px 40px',
      }}
    >
      {/* Search bar */}
      <div
        style={{
          ...glassCard,
          borderRadius: 16,
          padding: '18px 24px',
          textAlign: 'center',
          marginBottom: 30,
          opacity: interpolate(frame, [0, fps * 0.4], [0, 1], {extrapolateRight: 'clamp'}),
          transform: `translateY(${interpolate(frame, [0, fps * 0.4], [20, 0], {extrapolateRight: 'clamp'})}px)`,
        }}
      >
        <span style={{color: 'rgba(255,255,255,0.5)', fontSize: 18}}>
          🔍 Buscar productos...
        </span>
      </div>

      {/* Product grid */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        {products.slice(0, 4).map((p, i) => {
          const delay = fps * 0.3 + i * fps * 0.15;
          const cardSpring = spring({frame: frame - delay, fps, config: {damping: 12}});
          const cardOpacity = interpolate(frame, [delay, delay + fps * 0.3], [0, 1], {extrapolateRight: 'clamp'});

          return (
            <div
              key={p.name}
              style={{
                ...glassCard,
                display: 'flex',
                overflow: 'hidden',
                opacity: cardOpacity,
                transform: `scale(${cardSpring}) translateY(${interpolate(cardSpring, [0, 1], [30, 0])}px)`,
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  width: 140,
                  minHeight: 140,
                  background: `linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.1))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.15)',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {p.name.charAt(0)}
              </div>

              <div style={{padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                  <h3 style={{fontSize: 18, fontWeight: 700, color: colors.text, margin: 0}}>{p.name}</h3>
                  <p style={{fontSize: 13, color: colors.textMuted, margin: '6px 0 0'}}>Calidad garantizada</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12}}>
                  <span style={{fontSize: 22, fontWeight: 700, ...gradientText}}>
                    ${p.price.toLocaleString('es-AR')}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'rgba(255,255,255,0.07)',
                      padding: '5px 8px',
                      borderRadius: 14,
                      border: '0.5px solid rgba(255,255,255,0.16)',
                    }}
                  >
                    <span style={{color: '#fff', fontSize: 18, fontWeight: 700, width: 24, textAlign: 'center'}}>-</span>
                    <span style={{color: '#fff', fontSize: 16, fontWeight: 700, minWidth: 20, textAlign: 'center'}}>0</span>
                    <span style={{color: '#fff', fontSize: 18, fontWeight: 700, width: 24, textAlign: 'center'}}>+</span>
                  </div>
                </div>
              </div>

              {/* Stock badge */}
              {p.stock === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(239,68,68,0.2)',
                    color: '#ef4444',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    border: '0.5px solid rgba(239,68,68,0.3)',
                  }}
                >
                  SIN STOCK
                </div>
              )}
              {p.stock > 0 && p.stock <= 3 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(245,158,11,0.2)',
                    color: '#f59e0b',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    border: '0.5px solid rgba(245,158,11,0.3)',
                  }}
                >
                  ULTIMAS {p.stock}u
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div style={{textAlign: 'center', marginTop: 40}}>
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
          CATALOGO + STOCK EN VIVO
        </span>
      </div>
    </AbsoluteFill>
  );
};
