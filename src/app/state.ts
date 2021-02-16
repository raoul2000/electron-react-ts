import { atom, selector } from 'recoil'

type Source = {
    id: string;
    name: string;
};
export const sourceListState = atom<Source[]>({
    key: 'sourceListState',
    default: [
        {
            id: '1',
            name: 'source 1'
        },
        {
            id: '2',
            name: 'source 2'
        },
        {
            id: '3',
            name: 'source 3'
        }
    ]
});

export const selectedSourceIdState = atom<string>({
    key: 'selectedSourceIdState',
    default: ''
});

export const selectedSourceNameSelector = selector<string | undefined>({
    key: 'selectedSourceNameSelector',
    get: ({ get }) => {
        const selectedSourceId = get(selectedSourceIdState);
        const sourceList = get(sourceListState);
        return sourceList.find(source => source.id === selectedSourceId)?.name;
    },
});

export type SourceItem = {
    id: string;
    title: string;
};

type SourceItemList = {
    sourceId: string;
    items: SourceItem[];
};

export const sourceItemListState = atom<SourceItemList[]>({
    key: 'sourceItemListState',
    default: [
        {
            sourceId: '1',
            items: [{ id: '1', title: "1-item - 1" }, { id: '2', title: '1-title-2' }]
        },
        {
            sourceId: '2',
            items: [{ id: '1', title: "2-item - 1" }, { id: '2', title: '2-title-2' }]
        },
        {
            sourceId: '3',
            items: [{ id: '1', title: "3-item - 1" }, { id: '2', title: '3-title-2' }]
        },
    ]
});

export const selectedSourceItemState = atom<SourceItem | null>({
    key: 'selectedSourceItemIdState',
    default: null
});

export const selectedSourceItemTitleSelector = selector<string | undefined>({
    key: 'selectedSourceItemTitleSelector',
    get: ({ get }) => {
        const selectedSourceItem = get(selectedSourceItemState);
        return selectedSourceItem?.title;
    },
})
