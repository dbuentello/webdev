var app = app || {};

var PoistionsModel = Backbone.Model.extend({
    defaults: {
        accountID: '',
        quantity: 0,
        symbol: '',
        symbolWithTypePrefix: '',
        putCall: '',
        bondFactor: 0,
        description: '',
        assetType: '',
        cusip: '',
        accountType: '',
        closePrice: 0,
        positionType: '',
        averagePrice: 0,
        currentValue: 0,
        commission: 0,
        totalCost: 0,
        openDate: '',
        asset: null,
        maintReq: 0,
        multiplier: 0,
        purchasePrice: 0,
        gain: 0,
        gainPercent: 0,
        dayGain: 0,
        dayGainPercent: 0,
        underlyingSymbol: '',
        positionsCount: 0,
        actualPositionIHold: false,
        watchlistPositionMap: Array,
        positionsPositionMap: Array,
        positionInList: 0
    },
    initialize: function() {
        _.bindAll(this, "setAsset", "updateQuote");
    },
    setAsset: function(assetObj) {
        this.set({asset: assetObj});
        this.get('asset').on("change", this.updateQuote);
   },
    updateQuote: function(model) {
        this.set('changedColumns', model.changedAttributes());
    }
});