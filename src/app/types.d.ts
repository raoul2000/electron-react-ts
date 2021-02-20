export type Source = {
    id:string;  
    name:string;
    url: string;
    description?:string
}
export type ItemImage = {
    url: string;
    legend?:string;
}
export type SourceItem = {
    id: string;
    title: string;
    link?:string;
    content?:string;
    image?: ItemImage;
    pudDate?: Date
}

export type SourceItemList = {
    sourceId: string;
    items: SourceItem[];
};