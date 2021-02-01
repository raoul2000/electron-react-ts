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
            <header>
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
                        <ul>
                            {
                                sources.map(source => (
                                    <li>
                                        <div className="source-name truncate-text">{source.name}</div>
                                    </li>
                                ))
                            }
                        </ul>                        </ScrollPanel>
                </div>
            </main>
            <footer>
                footer
            </footer>
        </div>
    );
}


export default App;