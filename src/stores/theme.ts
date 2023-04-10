import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const sideBarTheme = atomWithStorage<'dark' | 'light'>('APP_SIDEBAR_THEME', 'dark')

export const setSidebarTheme = atom(null, (get, set, theme: 'dark' | 'light') => {
  set(sideBarTheme, theme)
})