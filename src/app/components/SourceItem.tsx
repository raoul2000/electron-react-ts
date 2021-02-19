import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedSourceItemState } from '../state';

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
                    <figure>
                        <img src="https://via.placeholder.com/500" alt="" />
                        <figcaption>An elephant at sunset</figcaption>
                    </figure>
                    <p>
                        {selectedSourceItem.content} </p>
                    <footer>
                        <p>
                            Posté le <time dateTime="2015-05-16 19:00">16 Mai</time> par Lisa.
            </p>
                    </footer>
                </article>
            }
        </>
    );
}