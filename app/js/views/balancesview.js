var app = app || {};
var BalanceView = Backbone.View.extend({
    el: '.page',
    model: this.balanceModel,
    initialize: function() {
        this.balanceModel = new BalanceModel();
        this.initialLoad = true;
        _.bindAll(this, 'render');
        this.balanceModel.bind('change', this.render);
    },
    render: function() {
        var template = _.template(utils.templates['BalanceView'], {model: this.balanceModel});
        // var template = _.template(utils.templates['ChartView']);
        this.$el.html(template);
        if (this.initialLoad)
            this.getBalance();
        return this;
    },
    getBalance: function() {
        this.initialLoad = false;
        if( !app.tdaUser.get('primaryAccount') || !app.userProfileModel.get('session-id')){           
             app.balanceView.clearDetails();
             app.loginView = new LoginView();
	     app.loginView.render();
             return;
        }
            
        
        var url = 'https://apis.tdameritrade.com/apps/100/BalancesAndPositions;accountid=' + app.tdaUser.get('primaryAccount').get('accountNum');
        $.ajax({
            url: url,
            type: 'POST',
            dataType: '',
            data: 'source=TAG,type=b',
            success: function(data) {
                var xml = parseXml(data);
                var jsonResponse = xmlToJson(xml);
                if (jsonResponse.amtd.error) {
                    alert(JSON.stringify(jsonResponse.amtd.error));
                }
                else {
                    var balanceData = jsonResponse.amtd['balance'];
                    app.balanceView.balanceModel.set({accountID: balanceData["account-id"]});
                    app.balanceView.balanceModel.set({cashBalance: app.balanceView.balanceModel.setBalance(balanceData["cash-balance"])});
                    app.balanceView.balanceModel.set({accountValue: app.balanceView.balanceModel.setBalance(balanceData["account-value"])});
                    app.balanceView.balanceModel.set({moneyMarketBalance: app.balanceView.balanceModel.setBalance(balanceData["money-market-balance"])});
                    app.balanceView.balanceModel.set({longStockValue: app.balanceView.balanceModel.setBalance(balanceData["long-stock-value"])});                    
                    app.balanceView.balanceModel.set({longOptionValue: app.balanceView.balanceModel.setBalance(balanceData["long-option-value"])});
                    app.balanceView.balanceModel.set({shortStockValue: app.balanceView.balanceModel.setBalance(balanceData["short-stock-value"])});
                    app.balanceView.balanceModel.set({bondValue: app.balanceView.balanceModel.setBalance(balanceData["bond-value"])});                    
                    if (app.balanceView.balanceModel.get('accountValue').get('change') > 0)
                    {
                        app.balanceView.balanceModel.set({todayNetChangeColor: 'greenColorText'});
                    }
                    else if (app.balanceView.balanceModel.get('accountValue').get('change') < 0) {
                        app.balanceView.balanceModel.set({todayNetChangeColor: 'redColorText'});
                    }
                    app.balanceView.balanceModel.set({availableFundsForTrading: balanceData["available-funds-for-trading"]});                    
                    var cashBal = app.balanceView.balanceModel.get('cashBalance').get('current') + app.balanceView.balanceModel.get('moneyMarketBalance').get('current');
                    app.balanceView.balanceModel.set({cashBal: cashBal});                    
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    clearDetails : function () {     
        this.initialLoad = true; 
      }
});