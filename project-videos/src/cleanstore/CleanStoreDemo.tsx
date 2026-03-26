import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import {colors, gradientText} from './styles';
import {SceneIntro} from './scenes/SceneIntro';
import {SceneModeSelector} from './scenes/SceneModeSelector';
import {SceneCatalog} from './scenes/SceneCatalog';
import {SceneCategories} from './scenes/SceneCategories';
import {SceneAddToCart} from './scenes/SceneAddToCart';
import {SceneCheckout} from './scenes/SceneCheckout';
import {SceneFeatures} from './scenes/SceneFeatures';
import {SceneOutro} from './scenes/SceneOutro';

export const CleanStoreDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: 'Outfit, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Aurora orbs background */}
      <AuroraBackground frame={frame} />

      {/* Scene 1: Intro / Logo (0-3s) */}
      <Sequence from={0} durationInFrames={3 * fps}>
        <SceneIntro />
      </Sequence>

      {/* Scene 2: Mode selector (3-6s) */}
      <Sequence from={3 * fps} durationInFrames={3 * fps}>
        <SceneModeSelector />
      </Sequence>

      {/* Scene 3: Catalog browse (6-10s) */}
      <Sequence from={6 * fps} durationInFrames={4 * fps}>
        <SceneCatalog />
      </Sequence>

      {/* Scene 4: Category filter (10-13s) */}
      <Sequence from={10 * fps} durationInFrames={3 * fps}>
        <SceneCategories />
      </Sequence>

      {/* Scene 5: Add to cart (13-17s) */}
      <Sequence from={13 * fps} durationInFrames={4 * fps}>
        <SceneAddToCart />
      </Sequence>

      {/* Scene 6: Checkout (17-22s) */}
      <Sequence from={17 * fps} durationInFrames={5 * fps}>
        <SceneCheckout />
      </Sequence>

      {/* Scene 7: Feature highlights (22-27s) */}
      <Sequence from={22 * fps} durationInFrames={5 * fps}>
        <SceneFeatures />
      </Sequence>

      {/* Scene 8: Outro / CTA (27-30s) */}
      <Sequence from={27 * fps} durationInFrames={3 * fps}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};

const AuroraBackground: React.FC<{frame: number}> = ({frame}) => {
  const orb1X = Math.sin(frame * 0.008) * 80;
  const orb1Y = Math.cos(frame * 0.006) * 60;
  const orb2X = Math.cos(frame * 0.007) * 60;
  const orb2Y = Math.sin(frame * 0.009) * 50;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #7b2ff7, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.18,
          top: -250 + orb1Y,
          left: -150 + orb1X,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00d4ff, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.18,
          bottom: -150 + orb2Y,
          right: -100 + orb2X,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ff6b9d, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.1,
          top: '40%',
          left: '55%',
        }}
      />
    </>
  );
};
