import {Slider} from 'antd';

const Progress = () => {
    return (
        <div className={'progress'}>
            <div className={'time'}>00:12</div>
            <Slider
                className={'progress-slider'}
                defaultValue={30}
                tooltipVisible={false}
                trackStyle={{backgroundColor: 'red'}}
                handleStyle={{backgroundColor: 'red', border: 'solid 4px white', boxShadow: 'none'}}
            />
            <div className={'time'}>04:33</div>
        </div>
    );
};
export default Progress;
