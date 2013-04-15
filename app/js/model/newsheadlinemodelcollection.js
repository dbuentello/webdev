var app = app || {};

var NewsHeadLineModelCollection = Backbone.Collection.extend({
	model:NewsHeadLineModel,
	url: 'https://test.tdameritrade.wallst.com/MobileAPI/News/Documents/?source=BusinessWire|CBSMarketWatch|DowJonesNews|MarketWire|BriefingStockNews|PrimeNewswire|PRNewswire|StdPoors|ZacksRSS|BenzingaLatest|HUG&days=30&firstRow=0&rowCount=50&user_id=mobileapi&user_password=mobileapi',
	
	parse: function(response) {
	        console.log('parsing ...'+response)
	        this.reset(response.Documents);
    	}
	
});
