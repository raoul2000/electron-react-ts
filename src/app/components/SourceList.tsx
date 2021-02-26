import React, { useRef, useState } from 'react';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { useRecoilState } from 'recoil';
import { sourceListState, selectedSourceIdState } from '../state';
import { removeSource } from '../lib/store';
import { DialogUpdateSourceLabel } from './DialogUpdateSourceLabel';
/**
 * The list of sources displayed in the left column.
 * Sources displayed here are read from the sourceListState atom
 */
export const SourceList: React.FC<{}> = (): JSX.Element => {

    const toastRef = useRef<Toast>(null);
    const [sourceList, setSourceList] = useRecoilState(sourceListState);
    const [selectedSourceId, setSelectedSourceId] = useRecoilState(selectedSourceIdState);

    const [showUpdateSourceLabelDialog, setShowUpdateSourceLabelDialog] = useState<boolean>(false);

    const [updateSourceLabelState, setUpdateSourceLabelState] = useState<{
        show: boolean,
        label: string,
        onChange: (newLabel: string) => void
    }>({
        show: false,
        label: '',
        onChange: (s) => { }
    });
    console.log(updateSourceLabelState);
    const handleSourceSelection = (sourceId: string) => {
        if (sourceId !== selectedSourceId) {
            setSelectedSourceId(sourceId);
        }
    };

    const handleDeleteSource = (sourceId: string) => {
        const source = sourceList.find(source => source.id === sourceId);
        if (!source) {
            return;
        }
        const sourceName = source.userLabel || source.name;
        confirmDialog({
            message: `Are you sure you want to delete the source "${sourceName}" ?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // remove from store
                setSourceList(sourceList.filter(source => source.id !== sourceId));
                // remove from DB
                removeSource(source);
                // clear selection if required
                if (sourceId === selectedSourceId) {
                    setSelectedSourceId('');
                }
                // notify user
                if (toastRef && toastRef.current) {
                    toastRef.current.show({
                        severity: 'info',
                        summary: 'Source Removed',
                        detail: `"${sourceName}" removed from source list`,
                        life: 3000
                    });
                } else {
                    console.log('no toast');
                }
            }
        });
    };

    const handleRenameSource = (sourceId: string) => {
        const source = sourceList.find(source => source.id === sourceId);
        if (!source) {
            return;
        }
        const updateSourceLabel = (newLabel: string) => {
            setSourceList(sourceList.map(source =>
                source.id === sourceId
                    ? {
                        ...source,
                        userLabel: newLabel
                    }
                    : { ...source }
            ));
            setUpdateSourceLabelState({
                ...updateSourceLabelState,
                show: false
            });
        };
        console.log(source);
        setUpdateSourceLabelState({
            show: true,
            label: source.userLabel || '',
            onChange: updateSourceLabel
        });
    };
    return (
        <>
            <ScrollPanel style={{ width: '100%', height: '100%' }}>
                <ul>
                    {
                        sourceList.map(source => (
                            <li
                                key={source.id}
                                className={selectedSourceId === source.id ? 'selected' : ''}
                            >
                                <div className="source-action">
                                    <i className="pi pi-pencil" onClick={() => handleRenameSource(source.id)}></i>
                                    <i className="pi pi-refresh"></i>
                                    <i className="pi pi-trash" onClick={() => handleDeleteSource(source.id)}></i>
                                </div>
                                <div
                                    className="source-name"
                                    onClick={() => handleSourceSelection(source.id)}
                                >
                                    {source.userLabel || source.name}
                                </div>

                            </li>
                        ))
                    }
                </ul>

            </ScrollPanel>
            <Toast ref={toastRef} />
            <DialogUpdateSourceLabel
                visible={updateSourceLabelState.show}
                label={updateSourceLabelState.label}
                onLabelUpdate={updateSourceLabelState.onChange}
                onHide={() => setUpdateSourceLabelState({
                    ...updateSourceLabelState,
                    show: false
                })}
            />
        </>
    );
}