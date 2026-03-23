import {CSSProperties} from 'react';

export const colors = {
  bg: '#080a12',
  accent: '#00d4ff',
  accent2: '#a855f7',
  text: '#ffffff',
  textMuted: '#cccccc',
  glass: 'rgba(255,255,255,0.07)',
  glassBorder: 'rgba(255,255,255,0.15)',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
};

export const gradientText: CSSProperties = {
  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const glassCard: CSSProperties = {
  background: colors.glass,
  border: `0.5px solid ${colors.glassBorder}`,
  borderRadius: 22,
  boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.18), 0 25px 60px rgba(0,0,0,0.45)`,
};

export const pill: CSSProperties = {
  padding: '8px 20px',
  borderRadius: 50,
  border: `0.5px solid rgba(255,255,255,0.14)`,
  background: 'rgba(255,255,255,0.04)',
  color: colors.textMuted,
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: 1,
  fontFamily: 'Outfit, sans-serif',
};

export const pillActive: CSSProperties = {
  ...pill,
  color: '#fff',
  fontWeight: 700,
  background: 'rgba(255,255,255,0.1)',
  borderColor: 'rgba(0,212,255,0.35)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.4), 0 0 20px rgba(0,212,255,0.12)',
};

export const products = [
  { name: 'Jabon Liquido Manos 1L', price: 1200, category: 'Manos', stock: 15 },
  { name: 'Limpiador Pisos 5L', price: 3800, category: 'Pisos', stock: 8 },
  { name: 'Lavandina Concentrada 2L', price: 1500, category: 'Cocina', stock: 22 },
  { name: 'Detergente Ultra 750ml', price: 950, category: 'Cocina', stock: 2 },
  { name: 'Desengrasante Industrial', price: 4200, category: 'Cocina', stock: 0 },
  { name: 'Suavizante Premium 3L', price: 2800, category: 'Lavanderia', stock: 12 },
];
