import Store from 'nedb-promises';
import { Source } from '../types';
import path from 'path';

const storeFilename = path.join('store.db');

let store: Store;
const getStore = (): Store => {
    if (!store) {
        console.log(`creating store in ${storeFilename}`);
        store = Store.create({
            filename: storeFilename,
            timestampData: true,
            autoload: true,
            onload: (err: Error) => {
                console.log('nedb loaded', err);
            }
        });
    }
    return store;
}

export const findAllSources = (): Promise<Source[] | void> => {
    return getStore()
        .find<Source>({})
        .then(results => {
            console.log('findAllSources returned : ', results);
            if (results) {
                return results.map(item => ({
                    id: item.id,
                    name: item.name,
                    url: item.url
                }));
            } else {
                return [];
            }
        })
        .catch(console.error);
};

export const insertSource = (source: Source) => {
    getStore().insert<Source>(source)
        .then(result => {
            console.log(`insertion done ${result}`)
        })
        .catch(console.error);
};

export const removeSource = (source: Source) => {
    getStore().remove({ id: source.id }, {})
        .then(result => {
            console.log(`remove done ${result}`)
        })
        .catch(console.error);
};

export const updateSourceLabel = (source: Source, userLabel?: string) => {
    const options = userLabel
        ? { '$set': { userLabel } }
        : { '$unset': { userLabel: true } };

    getStore().update({ id: source.id }, options)
        .then(result => {
            console.log(`update done ${result}`)
        })
        .catch(console.error);
};