var app = app || {};

var TdaUserModel = Backbone.Model.extend({
    defaults:{
		sessionID:"",
		username:"",
                primaryAccountNum:"",
                cdDomainID:"",
                nasdaqQuotes:"",
                nyseQuotes:"",
                amexQuotes:"",             
                company:"",
                segment:"",
                activeAccount: new Object(),
                primaryAccount:new Object(),
                accountsMap:new Object(),
                multipleAccount:false
	}
});

app.tdaUser = new TdaUserModel();