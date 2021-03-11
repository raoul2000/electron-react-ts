import React, { useRef, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { useRecoilState } from "recoil";
import {
    sourceListState,
    selectedSourceIdState,
    sourceItemListState,
    sourceIdRefreshingState
} from "../state";
import { removeSource } from "../lib/store";
import {
    DialogUpdateSourceLabel,
    DialogUpdateSourceLabelProps,
} from "./DialogUpdateSourceLabel";
import { SourceContextActions } from "./SourceContextActions";
import { parse } from "../lib/source-parser";

/**
 * The list of sources displayed in the left column.
 * Sources displayed here are read from the sourceListState atom
 */
export const SourceList: React.FC<{}> = (): JSX.Element => {
    const toastRef = useRef<Toast>(null);
    const [sourceList, setSourceList] = useRecoilState(sourceListState);
    const [sourceIdRefreshing, setSourceIdRefreshing] = useRecoilState(sourceIdRefreshingState);

    const [sourceItemList, setSourceItemList] = useRecoilState(
        sourceItemListState
    );
    const [selectedSourceId, setSelectedSourceId] = useRecoilState(
        selectedSourceIdState
    );

    const [
        updateSourceLabelState,
        setUpdateSourceLabelState,
    ] = useState<DialogUpdateSourceLabelProps>({
        visible: false,
        source: { id: "", name: "", url: "" },
        onCancel: () => {},
        onSubmit: (newLabel) => {},
    });

    const handleSourceSelection = (sourceId: string) => {
        if (sourceId !== selectedSourceId) {
            setSelectedSourceId(sourceId);
        }
    };

    const handleDeleteSource = (sourceId: string) => {
        const source = sourceList.find((source) => source.id === sourceId);
        if (!source) {
            return;
        }
        const sourceName = source.userLabel || source.name;
        confirmDialog({
            message: `Are you sure you want to delete the source "${sourceName}" ?`,
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                // remove from store
                setSourceList(
                    sourceList.filter((source) => source.id !== sourceId)
                );
                // remove from DB
                removeSource(source);
                // clear selection if required
                if (sourceId === selectedSourceId) {
                    setSelectedSourceId("");
                }
                // notify user
                if (toastRef && toastRef.current) {
                    toastRef.current.show({
                        severity: "info",
                        summary: "Source Removed",
                        detail: `"${sourceName}" removed from source list`,
                        life: 3000,
                    });
                } else {
                    console.log("no toast");
                }
            },
        });
    };

    const handleRenameSource = (sourceId: string) => {
        const source = sourceList.find((source) => source.id === sourceId);
        if (!source) {
            return;
        }
        setUpdateSourceLabelState({
            visible: true,
            source: { ...source },
            onSubmit: (newLabel: string) => {
                setSourceList(
                    sourceList.map((source) =>
                        source.id === sourceId
                            ? {
                                  ...source,
                                  userLabel: newLabel,
                              }
                            : { ...source }
                    )
                );
                setUpdateSourceLabelState({
                    ...updateSourceLabelState,
                    visible: false,
                });
            },
            onCancel: () =>
                setUpdateSourceLabelState({
                    ...updateSourceLabelState,
                    visible: false,
                }),
        });
    };
    const handleRefreshSource = (sourceId: string) => {
        const source = sourceList.find((source) => source.id === sourceId);
        if (!source) {
            return;
        }
        console.log(`refreshing source ${sourceId}`);
        if (source.url) {
            // next, load and parse the source stream
            setSourceIdRefreshing([
                ...sourceIdRefreshing,
                sourceId
            ]);
            setTimeout(() => {
                
                parse(source.url).then((result) => {
                    // update the sourceItemList atom by adding the list of
                    // items we've just fetched
                    setSourceItemList([
                        ...sourceItemList,
                        {
                            sourceId: selectedSourceId,
                            items: result.sourceItems,
                        },
                    ]);
                    setSourceIdRefreshing(sourceIdRefreshing.filter(srcId => srcId !== sourceId));
                });
            }, 5000); // TODO: remove - for dev only
        }
    };
    //TODO: implement refresh source
    return (
        <>
            <div>
                {(!sourceList || sourceList.length === 0) && (
                    <div className="no-source">
                        <div>
                            <i className="pi pi-info-circle"></i>
                        </div>
                        <div>
                            no source
                            <br />
                            available
                        </div>
                    </div>
                )}
                <ul>
                    {sourceList.map((source) => (
                        <li
                            key={source.id}
                            className={
                                selectedSourceId === source.id ? "selected" : ""
                            }
                        >
                            <SourceContextActions
                                sourceId={source.id}
                                onRename={handleRenameSource}
                                onDelete={handleDeleteSource}
                                onRefresh={handleRefreshSource}
                            />
                            <div
                                className="source-name"
                                onClick={() => handleSourceSelection(source.id)}
                            >
                                {source.userLabel || source.name}
                            </div>
                        </li>
                    ))}
                </ul>
                <Toast ref={toastRef} />
            </div>
            <DialogUpdateSourceLabel {...updateSourceLabelState} />
        </>
    );
};
