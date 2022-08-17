import {GoEnd, GoStart, PauseOne, Play} from '@icon-park/react';
import './player.less';
import {PlayStatus} from '../../../const';
import classNames from 'classnames/bind';

const Control = ({status}: { status: PlayStatus }) => {
    return (
        <div className={'control'}>
            <div className={classNames('btn', 'prev')}>
                <GoStart
                    theme="outline"
                    size="25"
                    fill="#ffffff"
                    strokeWidth={3}
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                />
            </div>
            <div className={classNames('btn', 'play-pause')}>
                {(() => {
                    if (status === PlayStatus.Play) {
                        return (
                            <Play
                                theme="multi-color"
                                size="45"
                                fill={['#ffffff', '#ffffff', '#000000', '#000000']}
                                strokeWidth={2}
                                strokeLinejoin="miter"
                                strokeLinecap="square"
                            />
                        );
                    }
                    return (
                        <PauseOne
                            theme="multi-color"
                            size="48"
                            fill={['#ffffff', '#ffffff', '#000000', '#000000']}
                            strokeWidth={2}
                            strokeLinejoin="miter"
                            strokeLinecap="square"
                        />
                    );
                })()}
            </div>
            <div className={classNames('btn', 'next')}>
                <GoEnd
                    theme="outline"
                    size="25"
                    fill="#ffffff"
                    strokeWidth={3}
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                />
            </div>
            <div className={classNames('btn', 'next')}/>
        </div>
    );
};

export default Control;
