import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedSourceIdState, sourceItemListState, selectedSourceItemState, SourceItem } from '../state';

export const SourceItemList: React.FC<{}> = (): JSX.Element => {

    const selectedSourceId = useRecoilValue(selectedSourceIdState);
    const sourceItemList = useRecoilValue(sourceItemListState);
    const [selectedSourceItem, setSelectedSourceItem] = useRecoilState(selectedSourceItemState);

    const selectedSourceItemList = sourceItemList.find(sourceItem => sourceItem.sourceId === selectedSourceId);
    useEffect(() => {
        if(selectedSourceItem) {
            setSelectedSourceItem(null);
        }
    }, [selectedSourceId]);

    const handleSourceItemSelection = (sourceItem:SourceItem) => {
        if(selectedSourceItem?.id !==  sourceItem.id ) {
            setSelectedSourceItem({...sourceItem})
        }
    }
    return (
        <ScrollPanel style={{ width: '100%', height: '100%' }}>
            {
                selectedSourceItemList
                &&
                <ul>
                    {
                        selectedSourceItemList.items.map(sourceItem => (
                            <li 
                                key={`${selectedSourceItemList.sourceId}-${sourceItem.id}`}
                                className={ selectedSourceItem?.id === sourceItem.id ? 'selected' : ''}
                                >
                                <div 
                                    className="source-name truncate-text"
                                    onClick={() => handleSourceItemSelection(sourceItem)}
                                >
                                    {sourceItem.title}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            }
        </ScrollPanel>
    );
}