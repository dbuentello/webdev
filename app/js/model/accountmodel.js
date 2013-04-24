var app = app || {};

var AccountModel = Backbone.Model.extend({
    defaults:{
		accountNum:"",
		description:"",
                displayName:"",
                isPrimary:false
	}
});