import { createContext } from 'react';

export interface IMenuContext {
  activeKey: string;
  selectedKey: string;
  onClick?: (key: string) => void;
  onSelect?: (key: string) => void;
}

export const MenuContext = createContext<IMenuContext>({ activeKey: '0', selectedKey: '0' });
