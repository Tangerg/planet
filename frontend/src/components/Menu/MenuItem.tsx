import type {FC, ReactNode} from 'react';
import {useContext} from 'react';
import type {MenuChildProps} from './Menu';
import {MenuContext} from './context';
import classNames from 'classnames';

export interface MenuItemProps extends MenuChildProps {
    icon?: ReactNode;
}

const MenuItem: FC<MenuItemProps> = (props) => {
    const {index, icon, children} = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-list', 'menu-item', {
        'menu-item-active': context.activeKey === index,
    });

    const onClick = () => {
        if (typeof index === 'string') {
            context.onClick?.(index);
            context.onSelect?.(index);
        }
    };
    return (
        <li className={classes} onClick={onClick}>
            <div className={'item-children'}>
                <span className={'item-icon'}>{icon}</span>
                <span className={'item-child'}>{children}</span>
            </div>
        </li>
    );
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
