var app = app || {};

var NewsHeadLineModelCollection = Backbone.Collection.extend({
	model:NewsHeadLineModel,
	url: 'https://test.tdameritrade.wallst.com/MobileAPI/News/Documents/?source=StdPoors|DowJonesNews&days=5&firstRow=0&rowCount=10&user_id=mobileapi&user_password=mobileapi',
	
	parse: function(response) {
	        console.log('parsing ...'+response)
	        this.reset(response.Documents);
    	}
	
});
