	var app = app || {};

    var LoginView = Backbone.View.extend({
		el:'.page',
		render: function(){
			console.log('render');
			var template = _.template($('#tda-login-page').html(), {});
			this.$el.html(template);
		},

		events:{
			'click #loginButton':'login'
		},

		login: function(ev) {
			Backbone.history.navigate('', true); 
			ev.preventDefault();
			
			var userDetails = {
				username: $('#inputUsername').val(),
				password: $('#inputPassword').val()
			};
			

			// This should moved it is here now because we need trigger an event
			// if login is successful
			var url = 'https://apis.tdameritrade.com/apps/300/LogIn';
			$.ajax({
				url:url,
				type:'POST',
				dataType:'',
				data:'userid=' + userDetails.username + '&password=' + userDetails.password + '&source=TST&version=1001',
				success:function(data) {
					// convert data in JSON from XML
					// Save Response
                    console.log("parsing xml login response");
					console.log(data);
                    var xml = parseXml(data);

					var jsonResponse  = xmlToJson(xml);

					if ( jsonResponse.amtd.error ){
						alert(JSON.stringify(jsonResponse.amtd.error));

					}	
					else
					{ 

						app.userProfileModel.set(jsonResponse.amtd["xml-log-in"]);
						console.log( JSON.stringify(app.userProfileModel));
						alert(JSON.stringify(jsonResponse.amtd["xml-log-in"]["session-id"]));
						getSteamerInfo(app);
                        			// This is an error

					}
					console.log(jsonResponse);
					
				},
				error:function(data){
					console.log(data);
				}
			});		
		}


	});

		
