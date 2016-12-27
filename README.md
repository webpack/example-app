# webpack webapp example

For demonstration this app uses `npm` package manager.

Install and build this app with:

``` text
# You need to have node.js installed
npm install

cd example-app
npm install

webpack -p --progress --colors --devtool sourcemap --hot
webpack -p --progress --colors --devtool sourcemap --hot --config webpack-update1.config.js
webpack -p --progress --colors --devtool sourcemap --hot --config webpack-update2.config.js
index.html
```

For watching and debugging you can alternatively compile with:

``` text
webpack -d --progress --colors --watch
```

Or use the development server:

``` text
npm start
# which is equal to
webpack-dev-server -d --colors
```

And open [http://localhost:8080](http://localhost:8080).