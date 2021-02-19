export type Source = {
    id:string;  
    name:string;
    url: string;
    description?:string
}

export type SourceItem = {
    id: string;
    title: string;
    link?:string;
    content?:string;
}

export type SourceItemList = {
    sourceId: string;
    items: SourceItem[];
};