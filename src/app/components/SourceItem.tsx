import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedSourceItemState } from '../state';
import {shell} from 'electron'
export const SourceItem: React.FC<{}> = (): JSX.Element => {

    const selectedSourceItem = useRecoilValue(selectedSourceItemState);

    return (
        <>
            {
                selectedSourceItem
                &&
                <article>
                    <header>
                        <h1>{selectedSourceItem.title}</h1>
                    </header>
                    {
                        selectedSourceItem.image
                        &&
                        <figure>
                            <img src={selectedSourceItem.image.url} alt="" />
                            <figcaption>{selectedSourceItem.image.legend}</figcaption>
                        </figure>
                    }
                    <p>
                        {selectedSourceItem.content} </p>
                    <footer>
                        <p>
                            Posté 
                            {
                                selectedSourceItem.pudDate
                                &&
                                <>
                                    &nbsp;le <time dateTime={selectedSourceItem.pudDate.toLocaleDateString()}>
                                        {selectedSourceItem.pudDate.toLocaleString()}
                                    </time>
                                </>
                            }
                            {
                                selectedSourceItem.link
                                &&
                                <>
                                &nbsp;<a 
                                    href={selectedSourceItem.link} 
                                    target="_blank" 
                                    rel="noreferrer noopener"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        selectedSourceItem.link && shell.openExternal(selectedSourceItem.link);
                                    }}
                                    title="ouvrir dans une nouvelle fenêtre">lire l&apos;article</a>
                                </>
                            }
                        </p>
                        <p></p>
                    </footer>
                </article>
            }
        </>
    );
}