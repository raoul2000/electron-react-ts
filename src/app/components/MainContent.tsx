import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { SourceList } from './SourceList';
import { SourceItemList } from './SourceItemList';
import { SourceItem } from './SourceItem';

export const MainContent: React.FC<{}> = (): JSX.Element => {
    return (
        <main >
            <div className="column-1" >
                <SourceList />
            </div>
            <div className="column-2">
                <SourceItemList />
            </div>
            <div className="column-3">
                <ScrollPanel style={{ width: '100%', height: '100%' }}>
                    <SourceItem />
                    <hr />
                    <article>
                        <header>
                            <h1>This is the main Title !</h1>
                        </header>
                        <figure>
                            <img src="https://via.placeholder.com/500" alt="" />
                            <figcaption>An elephant at sunset</figcaption>
                        </figure>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates corrupti deserunt eius aperiam, ipsa dolorum aspernatur voluptatum ducimus, in eos eum nobis ipsam! Aut, error. Iste ipsa quidem iusto ipsum?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates corrupti deserunt eius aperiam, ipsa dolorum aspernatur voluptatum ducimus, in eos eum nobis ipsam! Aut, error. Iste ipsa quidem iusto ipsum?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates corrupti deserunt eius aperiam, ipsa dolorum aspernatur voluptatum ducimus, in eos eum nobis ipsam! Aut, error. Iste ipsa quidem iusto ipsum?
                </p>
                        <footer>
                            <p>
                                Posté le <time dateTime="2015-05-16 19:00">16 Mai</time> par Lisa.
                    </p>
                        </footer>
                    </article>
                </ScrollPanel>
            </div>
        </main>
    );
}