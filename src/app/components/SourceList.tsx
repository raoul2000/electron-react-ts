import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {sourceListState, selectedSourceIdState} from '../state';

export const SourceList: React.FC<{}> = (): JSX.Element => {

    const sourceList = useRecoilValue(sourceListState);
    const [selectedSourceItemId, setSelectedSourceItemId] = useRecoilState(selectedSourceIdState);

    const handleSourceSelection = (sourceId:string) => {
        if(sourceId !== selectedSourceItemId) {
            setSelectedSourceItemId(sourceId);
        }
    }
    return (
        <ScrollPanel style={{ width: '100%', height: '100%' }}>
            <ul>
                {
                    sourceList.map(source => (
                        <li 
                            key={source.id}
                            className={ selectedSourceItemId === source.id ? 'selected' : ''}
                            >
                            <div 
                                className="source-name truncate-text"
                                onClick={() => handleSourceSelection(source.id)}
                            >{source.name}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </ScrollPanel>
    );
}