var app = app || {}

app.NewsSubView = Backbone.View.extend({
	el:'#page',
	initialize: function () {
		_.bindAll(this, 'renderAll', 'addItem');
	},
	
	render: function (divId,symbol) {
        console.log('render news subb view');
		this.collection = new NewsHeadLineModelCollection();

        this.divId = divId;
		$('#'+this.divId).html("");

		this.collection.on('reset', this.renderAll);
        if(symbol != null){
            this.collection.url = "https://test.tdameritrade.wallst.com/MobileAPI/News/Documents/?source=BusinessWire|CBSMarketWatch|DowJonesNews|MarketWire|BriefingStockNews|PrimeNewswire|PRNewswire|StdPoors|ZacksRSS|BenzingaLatest|HUG&days=30&firstRow=0&rowCount=50&user_id=mobileapi&user_password=mobileapi&symbol="+symbol;
        }else{
            this.collection.url = "https://test.tdameritrade.wallst.com/MobileAPI/News/Documents/?source=BusinessWire|CBSMarketWatch|DowJonesNews|MarketWire|BriefingStockNews|PrimeNewswire|PRNewswire|StdPoors|ZacksRSS|BenzingaLatest|HUG&days=30&firstRow=0&rowCount=50&user_id=mobileapi&user_password=mobileapi";
        }
       	this.collection.fetch();
	},
	
	renderAll: function(collection) {
		var tmp = _.template(utils.templates["newSubView"], {coll:this.collection});
        $('#'+this.divId).html(tmp);
    },
	
	addItem: function(item) {
	       console.log(item);
        },
	
	loadNewsDetails: function(newsid, spanid, headid){
		//console.log(newsid);
		//$("#"+spanid).html(newsid);
		
		var url = 'https://test.tdameritrade.wallst.com/MobileAPI/News/Document?docKey='+newsid+'&user_id=mobileapi&user_password=mobileapi';
		$.ajax({
			url:url,
			type:'GET',
			dataType:'',
			data:'source=TAG',
			success:function(data) {
				console.log(data.Body);
			},
			error:function(data){
				var resp = JSON.parse(data.responseText);
				//$("#"+spanid).html(resp.Body);
				//$("#"+headid).html(resp.Headline);
				$("#viewdetails"+newsid).html(resp.Body);
				console.log(data.responseText);
			}
			});
	}
	
});