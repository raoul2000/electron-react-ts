import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRecoilState } from 'recoil';
import { parse } from '../lib/source-parser'
import { sourceListState, sourceItemListState } from '../state';
import { insertSource } from '../lib/store';

type Props = {
    label: string;
    visible: boolean;
    onHide: () => void;
    onLabelUpdate: (newLabel:string) => void;
}

export const DialogUpdateSourceLabel : React.FC<Props> = ({ label, visible, onHide, onLabelUpdate }): JSX.Element => {
    const [newlabel, setNewLabel] = useState<string>(label);
    
    useEffect(() => setNewLabel(label), [label]);
    const handleUpdateSourceLabel = () => {
        onLabelUpdate(newlabel);
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button
                    label="Update" icon="pi pi-check" onClick={handleUpdateSourceLabel} autoFocus />
            </div>
        );
    };
    console.log('render DialogUpdateSourceLabel');
    return (
        <Dialog
            header="Update Source Name"
            visible={visible}
            onHide={onHide}
            className="dlg dlg-add-source"
            footer={renderFooter()}
        >
            <div className="p-fluid p-grid">
                <div className="p-field p-col">
                    <span className="p-float-label">
                        <InputText id="source-name" value={newlabel} onChange={(e) => setNewLabel(e.currentTarget.value)} />
                        <label htmlFor="source-url">source Name</label>
                    </span>
                        <small id="username1-help" className="p-d-block">
                        <i className="pi pi-info-circle"></i> leave empty to use the provided name</small>
                </div>
            </div>
        </Dialog>
    );
}