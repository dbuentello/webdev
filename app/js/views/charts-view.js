//Chart View
var app = app || {};
var ChartView = Backbone.View.extend({
    el: '.page',
    initialize: function() {
        console.log("Chart initialize " + app.userProfileModel);
    },
    render: function() {
        console.log('rendering');
        //this.$el.html("Charting started");
        this.getPriceHistory();
    },
    getPriceHistory: function()
    {
        var sessionToken = app.userProfileModel.get('session-id');

        var oReq = new XMLHttpRequest();
        var url = 'https://apista.tdameritrade.com/apps/100/PriceHistory?jsessionid=' + sessionToken +
                '&requestidentifiertype=SYMBOL&requestvalue=AAPL&source=TAG' +
                '&intervaltype=DAILY&periodtype=YEAR' +
                '&intervalduration=1&enddate=20130409&period=3' +
                '&extended=false';
        oReq.open('GET', url, true);
        oReq.responseType = 'arraybuffer';
        oReq.onload = function(oEvent) {
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);
                var view = new jDataView(byteArray);
                var symCount = view.getInt32();
                var symStr = view.getUTF8String(6, 4);
                var errorCode = view.getInt8();
                var barCount = view.getInt32();
                var ohlc = [],
                volume = [];
                for (var i = 0; i < barCount; i++)
                {
                    var close = view.getFloat32();
                    var high = view.getFloat32();
                    var low = view.getFloat32();
                    var open = view.getFloat32();
                    var symVolume = view.getFloat32(); //should be int, from streamer coming in 100s
                    symVolume = symVolume * 100;
                    var date = view.getLong32();

                    ohlc.push([
                        date, // the date
                        open, // open
                        high, // high
                        low, // low
                        close // close
                    ]);

                    volume.push([
                        date, // the date
                        symVolume // the volume
                    ]);
                }

                var groupingUnits = [[
                        'week', // unit name
                        [1]                             // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]];

              
                $('#page').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: 'AAPL Historical'
                    },
                    yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            height: 200,
                            lineWidth: 2
                        }, {
                            title: {
                                text: 'Volume'
                            },
                            top: 300,
                            height: 100,
                            offset: 0,
                            lineWidth: 2
                        }],
                    series: [{
                            type: 'candlestick',
                            name: 'AAPL',
                            data: ohlc,
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }, {
                            type: 'column',
                            name: 'Volume',
                            data: volume,
                            yAxis: 1,
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }]
                });
            }
        };
        oReq.send(null);

    }

});