import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {colors, glassCard, gradientText} from '../styles';

export const SceneCheckout: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const modalScale = spring({frame, fps, config: {damping: 12, stiffness: 80}});
  const formOpacity = interpolate(frame, [fps * 0.5, fps * 1], [0, 1], {extrapolateRight: 'clamp'});

  // Payment selector: switches to MercadoPago at 2.5s
  const payMethod = frame < fps * 2.5 ? 'whatsapp' : 'mercadopago';

  // Button pulse at 3.5s
  const btnPulse = frame > fps * 3.5 && frame < fps * 4 ? 1.03 : 1;

  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Outfit, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          ...glassCard,
          width: '100%',
          padding: 36,
          transform: `scale(${modalScale})`,
        }}
      >
        <h3
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 24,
            margin: '0 0 24px',
          }}
        >
          Tu Pedido
        </h3>

        {/* Order summary */}
        <div
          style={{
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: 14,
            padding: '14px 18px',
            marginBottom: 24,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: colors.textMuted, fontSize: 15}}>
            <span>Jabon Liquido Manos 1L</span>
            <span style={{fontWeight: 600, color: '#fff'}}>x3 — $3.600</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: colors.textMuted, fontSize: 15, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 6, paddingTop: 10}}>
            <span>Limpiador Pisos 5L</span>
            <span style={{fontWeight: 600, color: '#fff'}}>x1 — $3.800</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(0,212,255,0.2)',
              marginTop: 10,
              paddingTop: 10,
            }}
          >
            <span style={{color: colors.textMuted, fontSize: 12, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase'}}>TOTAL</span>
            <span style={{fontSize: 24, fontWeight: 800, ...gradientText}}>$7.400</span>
          </div>
        </div>

        {/* Form fields */}
        <div style={{opacity: formOpacity}}>
          {/* Name field */}
          <div style={{marginBottom: 16}}>
            <label style={{fontSize: 14, fontWeight: 600, color: colors.text, display: 'block', marginBottom: 6}}>
              Nombre y Apellido
            </label>
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                border: '0.5px solid rgba(0,212,255,0.45)',
                background: 'rgba(0,212,255,0.06)',
                color: '#fff',
                fontSize: 16,
              }}
            >
              Juan Perez
            </div>
          </div>

          {/* Payment method */}
          <div style={{marginBottom: 16}}>
            <label style={{fontSize: 14, fontWeight: 600, color: colors.text, display: 'block', marginBottom: 6}}>
              Metodo de Pago
            </label>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
              <div
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: `0.5px solid ${payMethod === 'whatsapp' ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.15)'}`,
                  background: payMethod === 'whatsapp' ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.04)',
                  textAlign: 'center',
                  boxShadow: payMethod === 'whatsapp' ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                }}
              >
                <div style={{fontSize: 28, marginBottom: 4}}>💬</div>
                <div style={{fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: 1}}>WhatsApp</div>
              </div>
              <div
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: `0.5px solid ${payMethod === 'mercadopago' ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.15)'}`,
                  background: payMethod === 'mercadopago' ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.04)',
                  textAlign: 'center',
                  boxShadow: payMethod === 'mercadopago' ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                }}
              >
                <div style={{fontSize: 28, marginBottom: 4}}>💳</div>
                <div style={{fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: 1}}>MercadoPago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <div
          style={{
            padding: 20,
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.85), rgba(123,47,247,0.85))',
            textAlign: 'center',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginTop: 20,
            transform: `scale(${btnPulse})`,
            boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.4), 0 10px 35px rgba(0,212,255,0.3)',
          }}
        >
          {payMethod === 'mercadopago' ? 'PAGAR CON MERCADOPAGO' : 'CONFIRMAR PEDIDO'}
        </div>
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
          CHECKOUT + MERCADOPAGO
        </span>
      </div>
    </AbsoluteFill>
  );
};
