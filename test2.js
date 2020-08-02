// Insert the company's stock name into the field `Company` without changing the previous company's entries 
db.stock.updateMany({Company:{$exists:0}}, {$set:{Company:'Microsoft'}})

// For the new company, update the embedded fields in the stock document by removing the space and the number preceding the embedded field name
db.stock.updateMany({Company:'Microsoft'}, {$rename:{'Stock.1 open':'Stock.open'}})
db.stock.updateMany({Company:'Microsoft'}, {$rename:{'Stock.2 high':'Stock.high', 'Stock.3 low':'Stock.low'}})
db.stock.updateMany({Company:'Microsoft'}, {$rename:{'Stock.4 close':'Stock.close', 'Stock.5 volume':'Stock.volume'}})

/*
Let's add a Boolean field called `raise` in all embedded documents:
	- If the stock's closing price is equal or higher than its open price, `raise` should store true.
	- Otherwise, `raise` should store false.
*/
db.stock.updateMany({$expr:{$gte:['$Stock.close','$Stock.open']}}, {$set:{'Stock.raise':true}})
db.stock.updateMany({$expr:{$lt:['$Stock.close','$Stock.open']}}, {$set:{'Stock.raise':false}})

// Say the date range of interest spans between the 20th and the 30th of September 2019, thus documents outside this range can be removed
db.stock.deleteMany({$or:[{Date:{$lt:'2019-09-20'}}, {Date:{$gt:'2019-09-30'}}]})

/*
As an example of filtering, retrieve documents as per:
	- dates 2019-09-26 & 2019-09-27
	- between 10AM and 12PM
	- only fields `Date`, `Time`, `raise` and `Company`
	- ordered first by `Date` and `Time`, then by `Company`
in a single statement
*/
db.stock.find({$and:[{Time:{$gte:'10:00:00'}}, {Time:{$lte:'23:59:00'}}, {$or:[{Date:'2019-09-26'}, {Date:'2019-09-27'}]}]}, {_id:0, Date:1, Time:1, 'Stock.raise':1, Company:1}).sort({date:1, time:1, Company:1})

/*
As a simplified reporting task, let's retrieve the following aggregations (in a single statement):
	- group by `Company` and `Date`
	- for each group, display:
		* the identification key comprising the group info
		* the total amount of stock volume exchanged
		* the highest and lowest stock prices
		* the number of documents per group
*/
db.stock.aggregate([{$group:{_id:{Company:'$Company', Date:'$Date'}, TotalVolume:{$sum:'$Stock.volume'}, Highest:{$max:'$Stock.high'}, Lowest:{$min:'$Stock.low'}, Documents:{$sum:1}}}])