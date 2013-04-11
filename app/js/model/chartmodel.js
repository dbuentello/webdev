var app = app || {};

var ChartModel = Backbone.Model.extend({
    defaults:{
		symbol:"",
		ohlc:{},
                volume:{}
	}
});