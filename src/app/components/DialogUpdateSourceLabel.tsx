import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Source } from '../types';
import { handleOpenExternal } from '../lib/utils';

export type DialogUpdateSourceLabelProps = {
    visible: boolean;
    source: Source;
    onCancel: () => void;
    onSubmit: (newLabel: string) => void;
}

export const DialogUpdateSourceLabel: React.FC<DialogUpdateSourceLabelProps> = ({
    visible, source, onCancel, onSubmit
}): JSX.Element => {
    const [newlabel, setNewLabel] = useState<string>(source.userLabel || source.name);

    useEffect(() => setNewLabel(source.userLabel || ''), [source.id]);

    const handleUpdateSourceLabel = () => onSubmit(newlabel);
    const handleCancel = onCancel;

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={handleCancel} className="p-button-text" />
                <Button label="Update" icon="pi pi-check" onClick={handleUpdateSourceLabel} autoFocus />
            </div>
        );
    };

    return (
        <Dialog
            header="Update Source Name"
            visible={visible}
            onHide={onCancel}
            className="dlg dlg-add-source"
            footer={renderFooter()}
        >
            <div className="p-fluid p-grid">
                <div className="p-col">
                    <ul>
                        <li>original name : <strong>{source.name}</strong></li>
                        <li>URL : <a
                            href={source.url}
                            onClick={handleOpenExternal(source.url)}
                            title="ouvrir dans une nouvelle fenêtre"
                        >
                            {source.url}
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="p-fluid p-grid">
                <div className="p-field p-col">
                    <span className="p-float-label">
                        <InputText id="source-name" value={newlabel} onChange={(e) => setNewLabel(e.currentTarget.value)} />
                        <label htmlFor="source-url">enter custom name for this source ...</label>
                    </span>
                    <small id="username1-help" className="p-d-block">
                        <i className="pi pi-info-circle"></i> leave empty to use the original name</small>
                </div>
            </div>
        </Dialog>
    );
}