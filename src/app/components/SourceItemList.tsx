import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { SourceItem } from '../types';
import { selectedSourceIdState, sourceItemListState, selectedSourceItemState, sourceListState } from '../state';
import { parse } from '../lib/source-parser'

export const SourceItemList: React.FC<{}> = (): JSX.Element => {

    const selectedSourceId = useRecoilValue(selectedSourceIdState);    
    const sourceList = useRecoilValue(sourceListState)
    const [sourceItemList, setSourceItemList] = useRecoilState(sourceItemListState);
    const [selectedSourceItem, setSelectedSourceItem] = useRecoilState(selectedSourceItemState);

    const selectedSourceItemList = sourceItemList.find(sourceItem => sourceItem.sourceId === selectedSourceId);

    useEffect(() => {
        // source selection has changed: if there was an item selected, clear selection
        if (selectedSourceItem) {
            setSelectedSourceItem(null);
        }
        if( !sourceItemList.find( sourceItem => sourceItem.sourceId === selectedSourceId )) {
            // the selected source doesn't exist in the source item list : load it now
            const source = sourceList.find( source => source.id === selectedSourceId);
            if(source) {
                const sourceUrl = source.url;
                parse(sourceUrl)
                    .then( result => {
                        setSourceItemList([
                            ...sourceItemList,
                            {
                                sourceId: selectedSourceId,
                                items: result.sourceItems
                            }
                        ]);
                    });
            }
        }        
    }, [selectedSourceId]);

    const handleSourceItemSelection = (sourceItem: SourceItem) => {
        if (selectedSourceItem?.id !== sourceItem.id) {
            setSelectedSourceItem({ ...sourceItem });
        }
    };

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
                                className={selectedSourceItem?.id === sourceItem.id ? 'selected' : ''}
                                onClick={() => handleSourceItemSelection(sourceItem)}
                            >
                                <div
                                    className="source-name truncate-text"
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