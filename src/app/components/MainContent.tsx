import React from "react";

import { SourceList } from "./SourceList";
import { SourceItemList } from "./SourceItemList";
import { SourceItem } from "./SourceItem";
import { Fixed, ViewPort, LeftResizable, Fill } from "react-spaces";

export const MainContent: React.FC<{}> = (): JSX.Element => {
    return (
        <>
            <LeftResizable size="20%" scrollable={true} className="source-list">
                <SourceList />
            </LeftResizable>
            <LeftResizable size="20%" scrollable={true} className="source-item-list">
                <SourceItemList />
            </LeftResizable>
            <Fill scrollable={true} className="source-item">
                <SourceItem />
            </Fill>
        </>
    );
};
