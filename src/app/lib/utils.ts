import { shell } from 'electron';

export const handleOpenExternal = (url:string) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    shell.openExternal(url);
};