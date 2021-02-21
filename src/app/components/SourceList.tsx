import React, { useRef } from 'react';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { useRecoilState } from 'recoil';
import { sourceListState, selectedSourceIdState } from '../state';
/**
 * The list of sources displayed in the left column.
 * Sources displayed here are read from the sourceListState atom
 */
export const SourceList: React.FC<{}> = (): JSX.Element => {
    const [sourceList, setSourceList] = useRecoilState(sourceListState);
    const [selectedSourceId, setSelectedSourceId] = useRecoilState(selectedSourceIdState);

    const handleSourceSelection = (sourceId: string) => {
        if (sourceId !== selectedSourceId) {
            setSelectedSourceId(sourceId);
        }
    };

    const handleDeleteSource = (sourceId: string) => {
        const sourceName = sourceList.find(source => source.id === sourceId)?.name;
        if (!sourceName) {
            return;
        }
        confirmDialog({
            message: `Are you sure you want to delete the source "${sourceName}" ?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                setSourceList(sourceList.filter(source => source.id !== sourceId));
                if (sourceId === selectedSourceId) {
                    setSelectedSourceId('');
                    /*   if(toastRef?.current) {
                          toastRef.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                      } */
                }
            }
        });
    }
    return (
        <ScrollPanel style={{ width: '100%', height: '100%' }}>
            <ul>
                {
                    sourceList.map(source => (
                        <li
                            key={source.id}
                            className={selectedSourceId === source.id ? 'selected' : ''}
                        >
                            <div className="source-action">
                                <i className="pi pi-pencil"></i>
                                <i className="pi pi-refresh"></i>
                                <i className="pi pi-trash" onClick={() => handleDeleteSource(source.id)}></i>
                            </div>
                            <div
                                className="source-name"
                                onClick={() => handleSourceSelection(source.id)}
                            >
                                {source.name}
                            </div>

                        </li>
                    ))
                }
            </ul>
        </ScrollPanel>
    );
}