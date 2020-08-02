# Tutorial on basic mongoDB operations

The tutorial is based on a database (`mydb`) embedding a single collection (`stock`) of documents regarding stock values of Apple and Microsoft over a certain timespan. 

To execute the tutorial, run the following commands:
```
$ mongoimport --db mydb --collection stock --drop Apple.json
$ mongo < test1.js
$ mongoimport --db mydb --collection stock Microsoft.json
$ mongo < test2.js
```

The tutorial can be expanded in many ways, the `Summary` file of basic commands and options can be helpful for this.