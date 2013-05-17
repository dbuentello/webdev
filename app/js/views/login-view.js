var app = app || {};

var LoginView = Backbone.View.extend({
    el: '.page',
    render: function() {
        console.log('render');
        var template = _.template($('#tda-login-page').html(), {});
        this.$el.html(template);
    },
    events: {
        'click #loginButton': 'login'
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
        var url = app.apiUrl+'/apps/300/LogIn';
        $.ajax({
            url: url,
            type: 'POST',
            dataType: '',
            data: 'userid=' + userDetails.username + '&password=' + userDetails.password + '&source=TST&version=1001',
            success: function(data) {
                // convert data in JSON from XML
                // Save Response
                console.log("parsing xml login response");
                console.log(data);
                var xml = parseXml(data);

                var jsonResponse = xmlToJson(xml);

                if (jsonResponse.amtd.error) {
                    alert(JSON.stringify(jsonResponse.amtd.error));

                }
                else
                {

                    app.userProfileModel.set(jsonResponse.amtd["xml-log-in"]);
                    console.log(JSON.stringify(app.userProfileModel));
                    alert(JSON.stringify(jsonResponse.amtd["xml-log-in"]["session-id"]));
                    app.loginView.parseLoginResponse();
                    getSteamerInfo(app);
                    // This is an error

                }
                console.log(jsonResponse);

            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    parseLoginResponse: function() {
        app.tdaUser.set({sessionID: app.userProfileModel.get('session-id')});
        app.tdaUser.set({username: app.userProfileModel.get('user-id')});
        var accountlist = app.userProfileModel.get('accounts');
        var accountmap = new Object();

        var account = accountlist.account;
        if (Object.prototype.toString.call(account) !== '[object Array]') {
            var accountmodel = this.setAccountValues(account);
            accountmap[account['account-id']] = accountmodel;
        } else {
            var accountmodel = new AccountModel({accountLabel: 'ALL',accountNum:'ALL'});
            accountmap['ALL'] = accountmodel;
            app.tdaUser.set({multipleAccount: true});
            for (var i = 0; i < account.length; i++) {
                var accountmodel = this.setAccountValues(account[i]);
                accountmap[account[i]['account-id']] = accountmodel;
            }

        }
        app.tdaUser.set({accountsMap: accountmap});
    },
    setAccountValues: function(account) {
        var accountmodel = new AccountModel();
        accountmodel.set({accountNum: account['account-id']});
        var accountNum = account['account-id'].toString();
        var accountLabel = "xxxxx" + accountNum.substring(accountNum.length - 4);
        accountmodel.set({accountLabel: accountLabel});

        accountmodel.set({description: account['description']});
        accountmodel.set({displayName: account['display-name']});
        var isPrimary = false;
        isPrimary = account["associated-account"];
        accountmodel.set({isPrimary: isPrimary});
        if (isPrimary) {
            app.tdaUser.set({primaryAccount: accountmodel});
            app.tdaUser.set({activeAccount: accountmodel});
        }
        return accountmodel;

    }



});


