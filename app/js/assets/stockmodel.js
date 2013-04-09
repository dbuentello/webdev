var app = app || {};

var StockModel = assetmodel.extend({
	defaults:{
		symbol:"",
		bid:"",
		ask:"",
		last:"",
		change:"",
		changePercent:"",
		description:"",
		assettype="E"
	},
	initialize: function(){
		console.log(" initialise watch list object");

	}

});