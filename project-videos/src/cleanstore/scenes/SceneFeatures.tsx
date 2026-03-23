import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, glassCard, gradientText} from '../styles';

const features = [
  {icon: '📱', title: 'PWA Instalable', desc: 'Se instala como app en el celular'},
  {icon: '💾', title: 'Carrito Persistente', desc: 'No se pierde al cerrar'},
  {icon: '📊', title: 'Stock Automatico', desc: 'Se descuenta solo al vender'},
  {icon: '📋', title: 'Factura PDF', desc: 'Se genera y envia automatica'},
  {icon: '📦', title: 'Minorista + Mayorista', desc: 'Doble lista de precios'},
  {icon: '📈', title: 'Panel Admin', desc: 'Estadisticas en tiempo real'},
];

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Outfit, sans-serif',
        padding: '60px 40px',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          fontSize: 36,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 40,
          opacity: titleOpacity,
          margin: '0 0 40px',
          ...gradientText,
        }}
      >
        Todo Automatizado
      </h2>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        {features.map((f, i) => {
          const delay = fps * 0.3 + i * fps * 0.25;
          const featureScale = spring({frame: frame - delay, fps, config: {damping: 14}});
          const featureOpacity = interpolate(frame, [delay, delay + fps * 0.3], [0, 1], {extrapolateRight: 'clamp'});

          return (
            <div
              key={f.title}
              style={{
                ...glassCard,
                padding: '24px 18px',
                textAlign: 'center',
                opacity: featureOpacity,
                transform: `scale(${featureScale})`,
              }}
            >
              <div style={{fontSize: 40, marginBottom: 10}}>{f.icon}</div>
              <h4 style={{fontSize: 15, fontWeight: 700, color: colors.text, margin: '0 0 4px', letterSpacing: 0.5}}>
                {f.title}
              </h4>
              <p style={{fontSize: 12, color: colors.textMuted, margin: 0, lineHeight: 1.3}}>
                {f.desc}
              </p>
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
          +10 FUNCIONES INCLUIDAS
        </span>
      </div>
    </AbsoluteFill>
  );
};
