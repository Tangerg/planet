import type {FC, ReactNode} from 'react';
import React, {useState} from 'react';
import {Down, Up} from '@icon-park/react';
import type {MenuItemProps} from './MenuItem';
import type {MenuChildProps} from './Menu';

export interface SubMenuProps extends MenuChildProps {
    title: string;
    action?: ReactNode;
    collapsible?: boolean;
}

const SubMenu: FC<SubMenuProps> = (props) => {
    const {index, title, action, collapsible, children} = props;
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, idx) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName !== 'MenuItem') {
                console.error('Warning: SubMenu has a child which is not a MenuItem component');
                return;
            }
            if (childElement.props.index) {
                return childElement;
            }
            return React.cloneElement(childElement, {
                index: `${index}-${idx.toString()}`,
            });
        });
        return (
            <ul className={!collapsed ? 'sub-menu-open' : 'sub-menu-closed'}>{childrenComponent}</ul>
        );
    };

    const renderCollaps = () => {
        if (!collapsed) {
            return (
                <Up
                    theme="two-tone"
                    size="25"
                    fill={['#000']}
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                    onClick={() => {
                        setCollapsed(true);
                    }}
                />
            );
        }
        return (
            <Down
                theme="two-tone"
                size="25"
                fill={['#000']}
                strokeLinejoin="miter"
                strokeLinecap="square"
                onClick={() => {
                    setCollapsed(false);
                }}
            />
        );
    };

    return (
        <li className={'sub-menu'}>
            <div className={'menu-list sub-menu-div'}>
                <span className={'sub-menu-title'}>{title}</span>
                <span className={'sub-menu-action'}>{action}</span>
                <span className={'sub-menu-collaps'}>{collapsible && renderCollaps()}</span>
            </div>
            {renderChildren()}
        </li>
    );
};
SubMenu.displayName = 'SubMenu';
SubMenu.defaultProps = {
    collapsible: false,
};
export default SubMenu;
