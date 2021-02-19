import RssParser from 'rss-parser';
import {Source, SourceItem, SourceItemList} from '../../types';

const parser = new RssParser({
    customFields: {
        item: [
            ['media:content', 'media:content', 'media:credit', { keepArray: true }]
        ]
    }
});

type RssItem = {
    guid: string;
    title: string;
    link: string;
    content:string;
}
const normalize = (rss:any):any => {
    console.log(rss);
    const source:Source = {
        id: rss.feedUrl,
        url:  rss.feedUrl,
        name: rss.title
    };

    const sourceItems: SourceItem[] = rss.items.map( (item:RssItem)  => ({
        id: item.guid,
        title: item.title,
        link: item.link,
        content: item.content
    }));

    return {
        source,
        sourceItems
    };
}
export const parse = (url: string): Promise<any> => parser.parseURL(url)
    .then(normalize);