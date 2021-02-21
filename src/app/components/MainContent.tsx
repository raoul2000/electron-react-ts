import React from 'react';

import { SourceList } from './SourceList';
import { SourceItemList } from './SourceItemList';
import { SourceItem } from './SourceItem';

export const MainContent: React.FC<{}> = (): JSX.Element => {
    return (
        <main >
            <div className="column-1" >
                <SourceList />
            </div>
            <div className="column-2">
                <SourceItemList />
            </div>
            <div className="column-3">
                <SourceItem />
            </div>
        </main>
    );
}