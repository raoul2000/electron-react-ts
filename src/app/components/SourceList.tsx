import React, { useRef, useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { useRecoilState } from 'recoil';
import { sourceListState, selectedSourceIdState } from '../state';
import { removeSource } from '../lib/store';
import { DialogUpdateSourceLabel, DialogUpdateSourceLabelProps } from './DialogUpdateSourceLabel';
/**
 * The list of sources displayed in the left column.
 * Sources displayed here are read from the sourceListState atom
 */
export const SourceList: React.FC<{}> = (): JSX.Element => {

    const toastRef = useRef<Toast>(null);
    const [sourceList, setSourceList] = useRecoilState(sourceListState);
    const [selectedSourceId, setSelectedSourceId] = useRecoilState(selectedSourceIdState);

    const [updateSourceLabelState, setUpdateSourceLabelState] = useState<DialogUpdateSourceLabelProps>({
        visible: false,
        source: { id: '', name: '', url: '' },
        onCancel: () => { },
        onSubmit: (newLabel) => { }
    });

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
        setUpdateSourceLabelState({
            visible: true,
            source: { ...source },
            onSubmit: (newLabel: string) => {
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
                    visible: false
                });
            },
            onCancel: () => setUpdateSourceLabelState({
                ...updateSourceLabelState,
                visible: false
            })
        });
    };

    return (
        <>
            <div className="column-1" >
                <div className="scrollable">
                    {
                        (!sourceList || sourceList.length === 0)
                        &&
                        <div className="no-source">
                            <div><i className="pi pi-info-circle"></i></div>
                            <div>no source<br />available</div>
                        </div>
                    }
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
                </div>
                <Toast ref={toastRef} />
            </div>

            <DialogUpdateSourceLabel
                {...updateSourceLabelState}
            />
        </>
    );
}