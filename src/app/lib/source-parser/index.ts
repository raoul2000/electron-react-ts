import RssParser, { Item, Output } from 'rss-parser';
import { ItemImage, Source, SourceItem, SourceItemList, SourceLogo } from '../../types';
import { nanoid } from 'nanoid'

type CustomFeed = { foo: string };

type MediaContentAttr = {
    url: string
};
type MediaContentDescription = {
    '$': { type: string },
    '_': string
}
type MediaContent = {
    '$': MediaContentAttr,
    'media:description': MediaContentDescription[]
}
type Enclosure = {
    url:string;
    type?: string;
    length: number;
}
type CustomItem = {
    "media:content": MediaContent,
};

type CustomRssDoc = CustomFeed & RssParser.Output<CustomItem>;
type CustomRssItem = CustomItem & RssParser.Item;

const parser: RssParser<CustomFeed, CustomItem> = new RssParser({
    customFields: {
        feed: ['foo'],
        item: ["media:content", { keepArray: true }]
    },
});

const getItemId = (item: CustomRssItem): string => item.guid || nanoid();
const getItemTitle = (item: CustomRssItem): string => item.title || 'no title';
const getItemPubDate = (item: CustomRssItem): Date | undefined => {
    try {
        if (item.pubDate) {
            return new Date(item.pubDate);
        }
    } catch (error) { }
};
const getImageLegend = (mediaContent: MediaContent): string | undefined => {
    try {
        return mediaContent['media:description'][0]._;
    } catch (error) { }
}

const getItemImage = (item: CustomRssItem): ItemImage | void => {
    try {
        if (item['media:content']) {
            const image: MediaContent = item['media:content'];
            return {
                url: image.$.url,
                legend: getImageLegend(image)
            };
        } else if( item['enclosure']) {
            const enclosure: RssParser.Enclosure = item['enclosure'];
            if( enclosure.type && ['image/jpg'].includes(enclosure.type)) {
                return {
                    url: enclosure.url,
                    legend:''
                };
            }
        }
    } catch (error) { }
    return;
};

const getSourceLogo = (rss: CustomRssDoc): SourceLogo | undefined => {
    try {
        if(rss.image && rss.image.url) {
            return {
                url: rss.image.url,
                title: rss.image.title,
                link: rss.image.link
            };
        }
    } catch (error) { }
};


const normalize = (url: string) => (rss: CustomRssDoc): { source: Source, sourceItems: SourceItem[] } => {
    console.log(rss);
    const source: Source = {
        id: nanoid(),
        url,
        name: rss.title || 'no name',
        logo: getSourceLogo(rss)
    };

    const sourceItems: SourceItem[] = rss.items.map((item: CustomRssItem) => ({
        id: getItemId(item),
        title: getItemTitle(item),
        link: item.link,
        pudDate: getItemPubDate(item),
        content: item.contentSnippet,
        image: getItemImage(item) || undefined
    }));

    return {
        source,
        sourceItems
    };
}
export const parse = (url: string): Promise<{ source: Source, sourceItems: SourceItem[] }> => parser.parseURL(url)
    .then(normalize(url));