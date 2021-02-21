import React from 'react';
import { useRecoilValue } from 'recoil';
import {selectedSourceNameSelector, bgTaskState} from '../state';

export const MainFooter: React.FC<{}> = (): JSX.Element => {
    const selectedSourceName = useRecoilValue(selectedSourceNameSelector);
    const bgTask = useRecoilValue(bgTaskState);

    return (
        <footer className="p-shadow-1">
            <div className="current-selection">
                {
                    selectedSourceName
                    && <span>source: <b>{selectedSourceName}</b></span>
                }
            </div>
            <div className="bg-task-status">
                {
                    !bgTask.idle
                    &&
                    <>
                        <i className="pi pi-spin pi-spinner"></i> {bgTask.name}
                    </>
                }
            </div>
        </footer>
    );
}