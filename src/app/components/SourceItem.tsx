import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useRecoilValue } from 'recoil';
import { selectedSourceItemState, selectedSourceNameSelector } from '../state';
import { shell } from 'electron';

/**
 * Displays details about the selected source item (in center column)
 * User can read the complete item in external browser
 */
export const SourceItem: React.FC<{}> = (): JSX.Element => {

    const selectedSourceItem = useRecoilValue(selectedSourceItemState);
    const selectedSourceName = useRecoilValue(selectedSourceNameSelector);

    /**
     * User clicked on the link to read the complete source item in an
     * external browser.
     * @param e Event
     */
    const handleReadInBrowser = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectedSourceItem && selectedSourceItem.link) {
            shell.openExternal(selectedSourceItem.link);
        }
    }

    return (
        <ScrollPanel style={{ width: '100%', height: '100%' }}>
            {
                selectedSourceItem
                &&
                <article>
                    {
                        selectedSourceName
                        &&
                        <div className="source-name">
                            {selectedSourceName}
                        </div>
                    }
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
                                        onClick={handleReadInBrowser}
                                        title="ouvrir dans une nouvelle fenêtre">lire l&apos;article</a>
                                </>
                            }
                        </p>
                        <p></p>
                    </footer>
                </article>
            }
        </ScrollPanel>
    );
}