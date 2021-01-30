import React from 'react';
import { MyComponent } from './MyComponent';
import { MenubarTop } from './MenuBar';


const App = () => {
    return (
        <>
            <MenubarTop />
            <div className="app p-grid">
                <div className="p-col">1</div>
                <div className="p-col">2</div>
                <div className="p-col"> <MyComponent /></div>
            </div>
        </>
    );
}


export default App;