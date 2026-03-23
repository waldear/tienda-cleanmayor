import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, glassCard, gradientText, pill, pillActive, products} from '../styles';

export const SceneCategories: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const categories = ['Todos', 'Pisos', 'Cocina', 'Manos', 'Lavanderia'];
  // Animate: start on "Todos", then switch to "Cocina" at 1.5s
  const activeCat = frame < fps * 1.5 ? 'Todos' : 'Cocina';
  const filteredProducts = activeCat === 'Todos'
    ? products.slice(0, 3)
    : products.filter(p => p.category === activeCat).slice(0, 3);

  const pillsOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {extrapolateRight: 'clamp'});

  // Cursor to click "Cocina"
  const cursorOpacity = interpolate(frame, [fps * 0.8, fps * 1.1], [0, 1], {extrapolateRight: 'clamp'});
  const cursorHide = interpolate(frame, [fps * 1.8, fps * 2], [1, 0], {extrapolateRight: 'clamp'});
  const cursorX = interpolate(frame, [fps * 1.1, fps * 1.5], [540, 430], {extrapolateRight: 'clamp'});
  const cursorY = interpolate(frame, [fps * 1.1, fps * 1.5], [300, 135], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Outfit, sans-serif',
        padding: '60px 40px',
      }}
    >
      {/* Category pills */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 30,
          opacity: pillsOpacity,
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat}
            style={cat === activeCat ? pillActive : pill}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Filtered products */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {filteredProducts.map((p, i) => {
          const delay = (frame < fps * 1.5 ? 0 : fps * 1.5) + i * fps * 0.12;
          const cardOpacity = interpolate(frame, [delay, delay + fps * 0.3], [0, 1], {extrapolateRight: 'clamp'});
          const cardY = interpolate(frame, [delay, delay + fps * 0.3], [30, 0], {extrapolateRight: 'clamp'});

          return (
            <div
              key={p.name + activeCat}
              style={{
                ...glassCard,
                display: 'flex',
                overflow: 'hidden',
                opacity: Math.min(1, cardOpacity),
                transform: `translateY(${cardY}px)`,
              }}
            >
              <div
                style={{
                  width: 120,
                  minHeight: 120,
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(168,85,247,0.08))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 42,
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.12)',
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {p.name.charAt(0)}
              </div>
              <div style={{padding: '16px 18px', flex: 1}}>
                <h3 style={{fontSize: 17, fontWeight: 700, color: colors.text, margin: 0}}>{p.name}</h3>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14}}>
                  <span style={{fontSize: 20, fontWeight: 700, ...gradientText}}>
                    ${p.price.toLocaleString('es-AR')}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: colors.accent,
                      background: 'rgba(0,212,255,0.1)',
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontWeight: 600,
                    }}
                  >
                    {p.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cursor */}
      <div
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity * cursorHide,
          fontSize: 32,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          transform: `scale(${frame > fps * 1.4 && frame < fps * 1.6 ? 0.8 : 1})`,
        }}
      >
        👆
      </div>

      {/* Label */}
      <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center'}}>
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
          FILTRO POR CATEGORIAS
        </span>
      </div>
    </AbsoluteFill>
  );
};
