import React from "react";
import { useRecoilValue } from "recoil";
import { sourceIdRefreshingState } from "../state";
import classNames from "classnames";

type Props = {
    sourceId: string;
    onRename: (sourceId: string) => void;
    onDelete: (sourceId: string) => void;
    onRefresh: (sourceId: string) => void;
};
export const SourceContextActions: React.FC<Props> = ({
    sourceId,
    onDelete,
    onRename,
    onRefresh,
}): JSX.Element => {
    const [refresingSourceIds] = useRecoilValue(sourceIdRefreshingState);
    const isRefreshing =
        refresingSourceIds && refresingSourceIds.includes(sourceId);
    const refreshClassNames = classNames("pi pi-refresh", {
        "pi-spin": isRefreshing,
    });
    const actionsContainerClassNames = classNames('source-action', {
        'refreshing': isRefreshing
    });
    return (
        <div className={actionsContainerClassNames}>
            {!isRefreshing && (
                <i
                    className="pi pi-pencil"
                    onClick={() => onRename(sourceId)}
                ></i>
            )}
            <i
                className={refreshClassNames}
                onClick={() => !isRefreshing && onRefresh(sourceId)}
            ></i>
            {!isRefreshing && (
                <i
                    className="pi pi-trash"
                    onClick={() => onDelete(sourceId)}
                ></i>
            )}
        </div>
    );
};
