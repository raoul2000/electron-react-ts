import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { SourceItem } from '../types';
import { selectedSourceIdState, sourceItemListState, selectedSourceItemState, sourceListState } from '../state';
import { parse } from '../lib/source-parser'

/**
 * The list of items for the selected source
 * This list is updated each time source selection changes. If items are not found in the
 * *sourceItemList* atom, it means they have not been fetched yet, and so it's time to do it.
 */
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
        if (!sourceItemList.find(sourceItem => sourceItem.sourceId === selectedSourceId)) {
            // the selected source doesn't exist in the source items list, it has not
            // been loaded yet and it's time to load it now.

            // first we must get the source URL
            const sourceUrl = sourceList.find(source => source.id === selectedSourceId)?.url;
            if (sourceUrl) {
                // next, load and parse the source stream
                parse(sourceUrl)
                    .then(result => {
                        // update the sourceItemList atom by adding the list of
                        // items we've just fetched
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
    }, [selectedSourceId]); // on each source selection change

    /**
     * User has selected an item from the current source items list
     * @param sourceItem the selected source item
     */
    const handleSourceItemSelection = (sourceItem: SourceItem) => {
        if (selectedSourceItem?.id !== sourceItem.id) {
            // update the corresponding atom
            setSelectedSourceItem({ ...sourceItem });
        }
    };

    return (
        <div className="scrollable">
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
                                title={sourceItem.title}
                            >
                                <div className="source-namet">
                                    {sourceItem.title}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
}