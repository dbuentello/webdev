var app = app || {};

var OptionChainListModel = Backbone.Model.extend({
	
	initialize: function(){
		_.bindAll(this,"setCallAsset","setPutAsset","updateCallAsset","updatePutAsset");
	},
	
	setCallAsset : function(assetObj){
		this.set({callAsset: assetObj});
		this.get('callAsset').on("change",this.updateCallAsset);
	},
	
	setPutAsset : function(assetObj){
			this.set({putAsset: assetObj});
			this.get('putAsset').on("change",this.updatePutAsset);
	},
	
	updateCallAsset: function(model){
		this.set('changedColumns',model.changedAttributes());
	},
	
	updatePutAsset: function(model){
		this.set('changedColumns',model.changedAttributes());
	}
});