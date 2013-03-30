# webpack webapp example

For demonstration this app uses `npm` and `jam` package manager.

Install and build this app with:

``` text
# You need to have node.js installed
npm install jamjs webpack@0.10.x webpack-dev-server@0.10.x -g

cd example-app
npm install
jam install

webpack -p --progress --colors --devtool sourcemap
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
webpack-dev-server -d --colors --content-page index.html
```

And open [http://localhost:8080](http://localhost:8080).