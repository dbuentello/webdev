var app = app || {}

app.QuoteDetailSubView = Backbone.View.extend({
	el:'.page',
    initialize: function () {
    	_.bindAll(this,'render','update');
    },
	renderSubView: function (symbol,templatename) {
		console.log('render quote detail subb view');
		this.model = new QuoteDetailModel({symbol:symbol});
		this.model.setAsset(app.assetcache.getAssetObject(symbol));
		var tmp = _.template(utils.templates[templatename], {model:this.model});
		this.$el.html(tmp);
		this.model.on("change",this.update);
	},
	
	update: function(model) {
		//this.collection.each(this.renderOne);
		var diff = model.get('changedColumns');
		for(var att in diff){
			$("#"+model.cid+att).empty().html(model.get('asset').get(att));
			if(att == 'change' || att == 'changePercent'){
				var val= 0;
				val = model.get('asset').get(att);

				if(model.get('asset').get(att) > 0){
					$("#"+model.cid+att).removeClass().addClass("greenColorText");
				}else {
					$("#"+model.cid+att).removeClass().addClass("redColorText");
				}
			}
			
			if(att == 'volume'){
				$("#"+model.cid+"1"+att).empty().html(model.get('asset').get(att));
			}
		}				
	}
	
	
});