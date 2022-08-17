import type {FC} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './index.less';
import {Menu, MenuItem, SubMenu} from "../../../components/Menu";
import {Download, Fm, FolderMusic, FriendsCircle, History, Like, Music, Plus, Round, VideoOne,} from '@icon-park/react';

const Logo = () => {
    return (
        <Link to={'/'}>
            <div className={'logo'}>Planet</div>
        </Link>
    );
};
const SiderMenu: FC = () => {
    const history = useHistory();
    const clickNewList = () => {
        console.log('click');
    };
    const selectMenuItem = (key: string) => {
        console.log('select');
        console.log(key);
        history.push(key);
    };
    return (
        <div className={'sider-menu-wrapper'}>
            <Logo/>
            <div className={'sider-menu'}>
                <Menu onClick={clickNewList} onSelect={selectMenuItem} defaultKey={'/home'}>
                    <MenuItem
                        index={'/home'}
                        icon={<Music theme="outline" size="21" strokeWidth={3} fill="#333"/>}
                    >
                        发现音乐
                    </MenuItem>
                    <MenuItem
                        index={'/video'}
                        icon={<VideoOne theme="outline" size="21" strokeWidth={3} fill="#333"/>}
                    >
                        视频MV
                    </MenuItem>
                    <MenuItem
                        index={'/friends'}
                        icon={<FriendsCircle theme="outline" size="21" strokeWidth={3} fill="#333"/>}
                    >
                        朋友
                    </MenuItem>
                    <MenuItem
                        index={'/fm'}
                        icon={<Fm theme="outline" size="21" strokeWidth={3} fill="#333"/>}
                    >
                        私人FM
                    </MenuItem>
                    <SubMenu title={'在线音乐'}>
                        <MenuItem icon={<Like theme="outline" size="21" fill="#333" strokeWidth={3}/>}>
                            我喜欢的
                        </MenuItem>
                        <MenuItem icon={<History theme="outline" size="21" fill="#333" strokeWidth={3}/>}>
                            播放历史
                        </MenuItem>
                        <MenuItem icon={<Download theme="outline" size="21" fill="#333" strokeWidth={3}/>}>
                            下载管理
                        </MenuItem>
                        <MenuItem icon={<FolderMusic theme="outline" size="21" fill="#333" strokeWidth={3}/>}>
                            本地音乐
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        title={'我创建的歌单'}
                        collapsible={true}
                        action={<Plus theme="outline" size="24" fill="#333"/>}
                    >
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            莫尼山 (Live)和更多好听的|华语私人定制
                        </MenuItem>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            70周年国庆大阅兵演奏曲目合集
                        </MenuItem>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            2018公告牌全球百大DJ/电音制作人！
                        </MenuItem>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            给爸妈的歌单，是自己的童年
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title={'我收藏的歌单'} collapsible={true}>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            【循环又不腻的轻音乐，学习适用】
                        </MenuItem>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            雷雨/微雨/暴雨/夜雨/雨滴/小雨声
                        </MenuItem>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            高效率专注记忆音乐
                        </MenuItem>
                        <MenuItem icon={<Round theme="outline" size="12" fill="#333"/>}>
                            回忆童年经典影视剧歌曲
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    );
};

export default SiderMenu;
