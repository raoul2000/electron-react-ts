import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DialogAddSource } from './DialogAddSource';
import { bgTaskState } from '../state';
import { useRecoilState, useRecoilValue } from 'recoil';

export const MainHeader: React.FC<{}> = (): JSX.Element => {
    const [showAddSourceDialog, setShowAddSourceDialog] = useState<boolean>(false);
    const bgTask = useRecoilValue(bgTaskState);

    return (
        <>
            <header className="p-shadow-1">
                <div>
                    My RSS Feeds
                </div>
                <div className="actions">
                    <Button
                        icon="pi pi-plus"
                        className="p-button-rounded"
                        onClick={() => setShowAddSourceDialog(true)}
                        disabled={!bgTask.idle}
                    />
                </div>
            </header>
            <DialogAddSource
                visible={showAddSourceDialog}
                onHide={() => setShowAddSourceDialog(false)}
            />
        </>
    );
}