# webpack webapp example

For demonstration this app uses `npm` and `jam` package manager.

Install and build this app with:

``` text
# You need to have node.js installed
npm install jamjs webpack -g

cd example-app
npm install
jam install jquery bootstrap

webpack --output-path-info --progress --colors
index.html
```

For watching and debugging you can alternatively compile with:

``` text
webpack --output-path-info --progress --colors --debug --devtool eval --watch
```

Or a minized version:

``` text
webpack --optimize-minimize --progress --colors
```


## TODO

* documentation

