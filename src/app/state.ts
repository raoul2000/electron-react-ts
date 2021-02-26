import { atom, selector } from 'recoil'
import {Source, SourceItem, SourceItemList} from './types'

export const sourceListState = atom<Source[]>({
    key: 'sourceListState',
    default: []
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
        const source =  sourceList.find(source => source.id === selectedSourceId);
        if(source) {
            return source.userLabel || source.name;
        }
    },
});

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
});

type BgTask = {
    name: string;
    idle: boolean;
};

export const bgTaskState = atom<BgTask>({
    key: 'BgTaskState',
    default: {
        name: '',
        idle: true
    }
});
