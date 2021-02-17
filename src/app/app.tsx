import React, { useState } from 'react';
import {
    RecoilRoot
} from 'recoil';
import { MainHeader } from './components/MainHeader';
import { MainFooter } from './components/MainFooter';
import { MainContent } from './components/MainContent';
import { DialogInitialize } from './components/DialogInitialize';
import { BgTaskRunner } from './components/BgTaskRunner';

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
    const [initStatus, setInitStatus] = useState<'pending' | 'success' |'error'>('pending');

    return (
        <RecoilRoot>
            <BgTaskRunner />
            <div className="app">
                {
                    initStatus === 'success'
                    &&
                        <>
                        <MainHeader />
                        <MainContent />
                        <MainFooter />
                    </>
                }
                <DialogInitialize
                    visible={initStatus === 'pending'}
                    onSuccess={() => setInitStatus('success')}
                    onHide={() => setInitStatus('success')}
                />
            </div>
            
        </RecoilRoot>
    );
}

export default App;