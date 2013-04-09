var app = app || {};

var AssetModel = Backbone.Model.extend({
	defaults:{
		symbol:"",
		bid:"",
		ask:"",
		last:"",
		change:"",
		changePercent:"",
		description:"",
		assettype:""
	},
	initialize: function(){
		console.log(" initialise watch list object");

	}

});