# My-App

Electron + React + Typescript = my-app

## npm scripts

### developpement

- starts electron and loads the React app build in *developpement* mode from the webpack server (at http:///localhost:9000) into the renderer process
``` 
npm start
```

- starts the webpack server to serve the React app built in *developpement* mode into a browser (at http://localhost:9000)
``` 
npm react:serve
```

### production
- build the Electron *main* and *renderer* process in *production* mode into the `./dist` folder
``` 
npm build
```
Once the complete app is built (using `npm run buil`), package the Electron app for Windows platform with :
``` 
npm build:win
```

## Links
from :
- https://dev.to/franamorim/tutorial-reminder-widget-with-electron-react-1hj9
- https://github.com/Devtography/electron-react-typescript-webpack-boilerplate
