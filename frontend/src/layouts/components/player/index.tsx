import Info from './info';
import Control from './control';
import Progress from './progress';
import Other from './other';
import './player.less';
import { PlayStatus } from '../../../const';

const Player = () => {
  return (
    <div className={'player'}>
      <Info
        cover={
          'http://p2.music.126.net/PdGB97lIH1glPKNQJOYBCA==/109951166415824594.jpg?param=200y200'
        }
        name={'花田錯Cover（原唱王力宏）花田錯Cover（原唱王力宏）'}
        artist={
          'BeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyondBeyond'
        }
      />
      <Control status={PlayStatus.Play} />
      <Progress />
      <Other />
    </div>
  );
};

export default Player;
