import React from 'react';
import { MyComponent } from './MyComponent';

const App = () => {
    return (
        <div className="app">
            <h1>I'm React running in Electron App</h1>
            <hr />
            <MyComponent />
        </div>
    );
}


export default App;