import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedSourceItemState } from '../state';

export const SourceItem: React.FC<{}> = ():JSX.Element => {

    const selectedSourceItem = useRecoilValue(selectedSourceItemState);

    return ( 
        <>
            {
                selectedSourceItem
                &&
                <h1>
                    {selectedSourceItem.title}
                </h1>
            }
        </>
    );
}