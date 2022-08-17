import {
  Like,
  MusicList,
  MusicMenu,
  PlayCycle,
  PlayOnce,
  ShuffleOne,
  VolumeNotice,
} from '@icon-park/react';
import { PlayMode } from '../../../const'

const ModeIcon = ({ mode }: { mode: PlayMode }) => {
  switch (mode) {
    case PlayMode.Sequence:
      return (
        <MusicList
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      );
    case PlayMode.Random:
      return (
        <ShuffleOne
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      );
    case PlayMode.SingleRepeat:
      return (
        <PlayOnce
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      );
    case PlayMode.ListRepeat:
      return (
        <PlayCycle
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      );
    default:
      return (
        <MusicList
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      );
  }
};
const Other = () => {
  return (
    <div className={'other'}>
      <div className={'btn'}>
        <ModeIcon mode={PlayMode.ListRepeat} />
      </div>
      <div className={'btn'}>
        <VolumeNotice
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </div>
      <div className={'btn'}>
        <Like
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </div>
      <div className={'btn'}>
        <MusicMenu
          theme="two-tone"
          size="22"
          fill={['#fff', '#000']}
          strokeWidth={3}
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </div>
    </div>
  );
};
export default Other;
