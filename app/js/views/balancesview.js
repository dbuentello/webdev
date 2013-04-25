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
        var template = _.template(utils.templates['BalanceView'], {model: this.balanceModel, accountMap: app.tdaUser.get('accountsMap')});
        // var template = _.template(utils.templates['ChartView']);
        this.$el.html(template);
        if (this.initialLoad) {          
            if (app.tdaUser.get('multipleAccount'))
                this.getMultipleAccountBalance();
            else
                this.getSingleAccountBalance();
        }

        return this;
    },
    getSingleAccountBalance: function() {
        this.initialLoad = false;
        if (!app.tdaUser.get('primaryAccount') || !app.userProfileModel.get('session-id')) {
            app.balanceView.clearDetails();
            app.loginView = new LoginView();
            app.loginView.render();
            return;
        }
        var url = 'https://apis.tdameritrade.com/apps/100/BalancesAndPositions;accountid=' + app.tdaUser.get('activeAccount').get('accountNum');
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
                    app.balanceView.balanceModel = balanceView.setbalanceModel(balanceData);
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    getMultipleAccountBalance: function() {
        this.initialLoad = false;
        if (!app.tdaUser.get('primaryAccount') || !app.userProfileModel.get('session-id')) {
            app.balanceView.clearDetails();
            app.loginView = new LoginView();
            app.loginView.render();
            return;
        }
        var url = 'https://apista-qae8.tdameritrade.com/apps/100/MultipleBalancesAndPositions;accountid=' + app.tdaUser.get('activeAccount').get('accountNum');
        $.ajax({
            url: url,
            type: 'POST',
            dataType: '',
            data: 'source=TAG',
            success: function(data) {
                var xml = parseXml(data);
                var jsonResponse = xmlToJson(xml);
                if (jsonResponse.amtd.error) {
                    alert(JSON.stringify(jsonResponse.amtd.error));
                }
                else {
                    var balanceData = jsonResponse.amtd["all-accounts"]["all-balances"]["account-balances"];
                    app.accountAndBalancesMap = {};
                    for (var i = 0; i < balanceData.length; i++) {
                        if (app.tdaUser.get('activeAccount').get('accountNum') === balanceData[i]["account-id"]) {
                            app.balanceView.setbalanceModel(balanceData[i], app.balanceView.balanceModel) ;                            
                            app.accountAndBalancesMap[balanceData[i]["account-id"]] = app.balanceView.balanceModel;
                        }
                        else{
                            var balanceModel = new BalanceModel();
                            app.balanceView.setbalanceModel(balanceData[i],balanceModel);                            
                            app.accountAndBalancesMap[balanceData[i]["account-id"]] = balanceModel;
                        }                        
                    }
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    setbalanceModel: function(balanceData,balanceModel) {      
        balanceModel.set({accountID: balanceData["account-id"]});
        balanceModel.set({cashBalance: app.balanceView.balanceModel.setBalance(balanceData["cash-balance"])});
        balanceModel.set({accountValue: app.balanceView.balanceModel.setBalance(balanceData["account-value"])});
        balanceModel.set({moneyMarketBalance: app.balanceView.balanceModel.setBalance(balanceData["money-market-balance"])});
        balanceModel.set({longStockValue: app.balanceView.balanceModel.setBalance(balanceData["long-stock-value"])});
        balanceModel.set({longOptionValue: app.balanceView.balanceModel.setBalance(balanceData["long-option-value"])});
        balanceModel.set({shortStockValue: app.balanceView.balanceModel.setBalance(balanceData["short-stock-value"])});
        balanceModel.set({bondValue: app.balanceView.balanceModel.setBalance(balanceData["bond-value"])});
        if (balanceModel.get('accountValue').get('change') > 0)
        {
            balanceModel.set({todayNetChangeColor: 'greenColorText'});
        }
        else if (balanceModel.get('accountValue').get('change') < 0) {
            balanceModel.set({todayNetChangeColor: 'redColorText'});
        }
        balanceModel.set({availableFundsForTrading: balanceData["available-funds-for-trading"]});
        var cashBal = balanceModel.get('cashBalance').get('current') + balanceModel.get('moneyMarketBalance').get('current');
        balanceModel.set({cashBal: cashBal});
        return balanceModel;
    },
    clearDetails: function() {
        this.initialLoad = true;
    }
});