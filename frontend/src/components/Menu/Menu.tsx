import type {FC} from 'react';
import React, {ReactNode, useState} from 'react';
import type {IMenuContext} from './context';
import {MenuContext} from './context';
import './menu.less';

export interface MenuChildProps {
    index?: string;
    children: ReactNode
}

export interface MenuProps {
    defaultKey?: string;
    onClick?: (key: string) => void;
    onSelect?: (key: string) => void;
    children: ReactNode
}

const Menu: FC<MenuProps> = (props) => {
    const {defaultKey, onClick, onSelect, children} = props;
    const [activeKey, setActiveKey] = useState<string>(defaultKey ? defaultKey : '0');
    const [selectedKey, setSelectedKey] = useState<string>(defaultKey ? defaultKey : '0');

    const onClickItem = (key: string) => {
        if (key !== activeKey) {
            setActiveKey(key);
        }
        onClick?.(key);
    };
    const onSelectItem = (key: string) => {
        if (key !== selectedKey) {
            setSelectedKey(key);
            onSelect?.(key);
        }
    };

    const contextValue: IMenuContext = {
        activeKey: activeKey,
        selectedKey: '0',
        onClick: onClickItem,
        onSelect: onSelectItem,
    };

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuChildProps>;
            if (
                childElement.type.displayName !== 'MenuItem' &&
                childElement.type.displayName !== 'SubMenu'
            ) {
                console.error('Warning: Menu has a child which is not a MenuItem or SubMenu component');
                return;
            }
            if (childElement.props.index) {
                return childElement;
            }
            return React.cloneElement(childElement, {
                index: index.toString(),
            });
        });
    };
    return (
        <ul className={'planet-menu '}>
            <MenuContext.Provider value={contextValue}>{renderChildren()}</MenuContext.Provider>
        </ul>
    );
};
Menu.defaultProps = {
    defaultKey: '0',
};
export default Menu;
