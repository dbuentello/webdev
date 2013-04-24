var app = app || {};

var BalanceModel = Backbone.Model.extend({
    defaults: {
        accountID: "",
        dayTrader: false,
        roundTrips: 0,
        restrictedClosingTransactionsOnly: false,
        cashBalance: null,
        moneyMarketBalance: null,
        longStockValue: null,
        longOptionValue:null,
        shortStockValue:null,
        shortOptionValue: null,
        mutualFundValue: null,
        bondValue: null,
        accountValue: null,
        pendingDeposits: null,
        savingsBalance: null,
        marginBalance: null,
        shortBalance: null,
        longMarginableValue: null,
        shortMarginableValue: null,
        marginEquity: null,
        equityPercentage: null,
        stockBuyingPower: 0,
        optionBuyingPower: 0,
        dayTradingBuyingPower: 0,
        availableFundsForTrading: 0,
        maintenanceRequirement: null,
        maintenanceCallValue: null,
        regulationTCallValue: null,
        dayTradingCallValue: null,
        dayEquityCallValue: 0,
        inCall: '',
        inPortentialCall: '',
        cashForWithdrawal: null,
        unsettledCash: null,
        cashDebitCallValue: null,
        nonMarginableFunds: 0
    }
});

//var Balance = new Backbone.Model.extend({
//    default: {
//        initial: 0,
//        current: 0,
//        change: 0
//    }
//});
