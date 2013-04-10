// View created using secure view will check to see if we are logged in and prompt for login



var SecureView = new Backbone.Model.extend({
	var session;

	initalize: function (session) {
		// Prepare the view if the check for the security model to see if we are logged in
        this.sesssion = session;
		
	},

	render: function (argument) {

		// body...
	}
	
});