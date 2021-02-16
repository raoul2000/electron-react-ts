import React from 'react';
import { useRecoilValue } from 'recoil';
import {selectedSourceNameSelector, selectedSourceItemTitleSelector} from '../state';
export const MainFooter: React.FC<{}> = (): JSX.Element => {
    const selectedSourceName = useRecoilValue(selectedSourceNameSelector);
    const selectedSourceItemTitle = useRecoilValue(selectedSourceItemTitleSelector);
    return (
        <footer className="p-shadow-1">
            {
                selectedSourceName
                &&
                    <span>source: <b>{selectedSourceName}</b></span>
            }
            {
                selectedSourceItemTitle
                &&
                    <span> title: <em>{selectedSourceItemTitle}</em></span>
            }
        </footer>
    );
}