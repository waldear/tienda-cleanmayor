import {Composition} from 'remotion';
import {CleanStoreDemo} from './cleanstore/CleanStoreDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CleanStoreDemo"
        component={CleanStoreDemo}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
