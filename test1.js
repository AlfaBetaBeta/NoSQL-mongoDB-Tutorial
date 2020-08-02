use mydb

// Let's insert the company's stock name into a new field name called `Company`
db.stock.update({}, {$set:{Company:'Apple'}}, {multi:true});

// Next, update the embedded fields in the stock document by removing the space and the number preceding the embedded field name
db.stock.updateMany({}, {$rename:{'Stock.1 open':'Stock.open'}});
db.stock.updateMany({}, {$rename:{'Stock.2 high':'Stock.high', 'Stock.3 low':'Stock.low'}});
db.stock.updateMany({}, {$rename:{'Stock.4 close':'Stock.close', 'Stock.5 volume':'Stock.volume'}});