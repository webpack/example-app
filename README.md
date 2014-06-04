# webpack webapp example

For demonstration this app uses `npm` and `jam` package manager.

Install and build this app with:

``` text
# You need to have node.js installed
npm install jamjs@0.2.x webpack@1.2.x webpack-dev-server@1.2.x -g

cd example-app
npm install
jam install

webpack -p --progress --colors --devtool sourcemap --hot
webpack -p --progress --colors --devtool sourcemap --hot --config webpack-update1.config.js
webpack -p --progress --colors --devtool sourcemap --hot --config webpack-update2.config.js
index.html
```

NOTE: It's a production ready build, so it may take a while.

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