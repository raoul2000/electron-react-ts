import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useRecoilState } from 'recoil';
import { sourceListState } from '../state';
import { findAllSources } from '../lib/store';

type Props = {
    visible: boolean;
    onSuccess: () => void;
    onHide: () => void;
}
/**
 * Initialization dialog to load the list of sources
 */
export const DialogInitialize: React.FC<Props> = ({ visible, onSuccess, onHide }): JSX.Element => {
    const [sourceList, setSourceList] = useRecoilState(sourceListState);

    useEffect(() => {
        findAllSources()
            .then(sources => {
                if(sources) {
                    setSourceList(sources);
                }
                onSuccess();
            })
    }, []);

    return (
        <Dialog
            header="Loading ..."
            visible={visible}
            onHide={onHide}
            className="dlg dlg-initialize"
        >
            <p>
                <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '2em' }}></i><br />
                Loading source list ...
            </p>
        </Dialog>
    );
}