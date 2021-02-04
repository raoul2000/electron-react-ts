import React from 'react';
import { MyComponent } from './MyComponent';
import { MenubarTop } from './MenuBar';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';

const createSources = (count: number) => {
    const sources: Array<{ name: string }> = [];
    for (let index = 0; index < count; index++) {
        sources.push({
            name: `source very long  ${index}`
        });

    }
    return sources;
}
const sources = createSources(50);

const App = () => {
    const header: JSX.Element = <div>header</div>;
    return (
        <div className="app">
            <header className="p-shadow-1">
                header
            </header>
            <main >
                <div className="column-1" >
                    <ScrollPanel style={{ width: '100%', height: '100%' }}>
                        <ul>
                            {
                                sources.map(source => (
                                    <li>
                                        <div className="source-name truncate-text">{source.name}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </ScrollPanel>
                </div>
                <div className="column-2">
                    <ScrollPanel style={{ width: '100%', height: '100%' }}>
                        <ul>
                            {
                                sources.map(source => (
                                    <li>
                                        <div className="source-name truncate-text">{source.name}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </ScrollPanel>
                </div>
                <div className="column-3">
                    <ScrollPanel style={{ width: '100%', height: '100%' }}>
                        <article>
                            <header>
                                <h1>This is the main Title</h1>
                            </header>
                            <figure>
                                <img src="https://via.placeholder.com/500" alt=""/>
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
            <footer className="p-shadow-1">
                footer
            </footer>
        </div>
    );
}


export default App;