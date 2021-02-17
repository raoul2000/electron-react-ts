import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { bgTaskState } from '../state';
import { useRecoilState } from 'recoil';

type Props = {
    visible: boolean;
    onHide: () => void;
}

export const DialogAddSource: React.FC<Props> = ({ visible, onHide }): JSX.Element => {
    const [bgTask, setBgTask] = useRecoilState(bgTaskState);
    const [url, setUrl] = useState<string>('https://www.lemonde.fr/rss/une.xml');

    const handleAddSource = () => {
        setBgTask({name: url, idle: false});
        onHide();
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button
                    disabled={url.trim().length === 0}
                    label="Add This Source" icon="pi pi-check" onClick={handleAddSource} autoFocus />
            </div>
        );
    }
    
    return (
        <Dialog
            header="Add Source"
            visible={visible}
            onHide={onHide}
            className="dlg dlg-add-source"
            footer={renderFooter()}
        >
            <div className="p-fluid p-grid">
                <div className="p-field p-col">
                    <span className="p-float-label">
                        <InputText id="source-url" value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
                        <label htmlFor="source-url">source URL</label>
                    </span>
                </div>
            </div>
        </Dialog>
    );
}