import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useRecoilState } from 'recoil';
import { sourceListState } from '../state';

type Props = {
    visible: boolean;
    onSuccess: () => void;
    onHide: () => void;
}
export const DialogInitialize: React.FC<Props> = ({ visible, onSuccess, onHide }): JSX.Element => {
    const [sourceList, setSourceList] = useRecoilState(sourceListState);

    useEffect(() => {
        setTimeout(() => {
            setSourceList([
                {
                    id: '1',
                    name: 'source 1'
                },
                {
                    id: '2',
                    name: 'source 2'
                },
                {
                    id: '3',
                    name: 'source 3'
                }
            ]);
            onSuccess();
        }, 2000);
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
                Please Wait
            </p>
        </Dialog>
    );
}