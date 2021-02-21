import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRecoilState } from 'recoil';
import { parse } from '../lib/source-parser'
import { sourceListState, sourceItemListState } from '../state';
import { insertSource } from '../lib/store';

type Props = {
    visible: boolean;
    onHide: () => void;
}

export const DialogAddSource: React.FC<Props> = ({ visible, onHide }): JSX.Element => {
    const [url, setUrl] = useState<string>('');
    const [sourceList, setSourceList] = useRecoilState(sourceListState);
    const [sourceItemList, setSourceItemList] = useRecoilState(sourceItemListState);

    const handleAddSource = () => {
        onHide();
        parse(url)
            .then(result => {
                console.log(result);
                insertSource(result.source);
                setSourceList(
                    [...sourceList, result.source]
                );
                setSourceItemList([
                    ...sourceItemList,
                    {
                        sourceId: result.source.id,
                        items: result.sourceItems
                    }
                ]);
            });
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
    };

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