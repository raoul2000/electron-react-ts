import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DialogAddSource } from './DialogAddSource';

export const MainHeader: React.FC<{}> = (): JSX.Element => {
    const [showAddSourceDialog, setShowAddSourceDialog] = useState<boolean>(false);

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
                        label="add source"
                        onClick={() => setShowAddSourceDialog(true)}
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