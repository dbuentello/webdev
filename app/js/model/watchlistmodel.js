var app = app || {};

var WatchListModel = Backbone.Model.extend({
	defaults:{
		symbol:"",
		bid:"",
		ask:"",
		last:"",
		change:"",
		changePercent:"",
		description:"",
		changedColumns:{},
		asset:{}
	},
		
	initialize: function(){
		console.log(" initialise watch list object");
 		_.bindAll(this,"registerAsset","updateQuote");
	},

	symbol: function(){
	   this.symbol;
	},
	
	registerAsset : function(){
		this.get('asset').on("change",this.updateQuote);
	},

	bid: function(){
	   this.symbol;
	},	
	
	updateQuote: function(model){
		this.set('changedColumns',model.changedAttributes());
	}
});