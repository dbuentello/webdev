function drawUtilTodayCharts(continerId,symbol, ohlcData) {
    
    		var d = new Date();
    		d.setHours(9);
    		d.setMinutes(20);
    		d.setSeconds(0);
    		
    		var xmin = d.getTime();
    		d.setHours(16);
    		d.setMinutes(20);
    		var xmax = d.getTime();
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });
            var dailyseries = [{
                    type: 'line',             
                    name: symbol,
                    data: ohlcData
               }];            
            var chart = new Highcharts.StockChart({
                chart: {
                    renderTo: continerId,
                    /*events: {
		                load: function(){
		                    series1 = this.series[0];
		                    
		                    setInterval(function(){
		                    	var assetM = app.assetcache.getAssetObject(series1.name);
		                        series1.data[series1.data.length-1].update(series1.data[series1.data.length-1].y = assetM.get('last'));
		                        series1.chart.yAxis[1].update({opposite: true});
		                    }, 1000)
		                }
        		} */
                },
                rangeSelector: {
                    enabled: false
                },
                tooltip: {
			crosshairs: [true, true],
			formatter: function() {
				var s = '<b>'+ Highcharts.dateFormat('%b %e, %H:%M', this.x) +'</b>';
				$.each(this.points, function(i, point) {
					s += '<br/>'+ point.y.toFixed(2);
				});

				return s;
			}
	    	},
                 navigator: {
			    	enabled: false
	    	},
	    	 scrollbar: {
			enabled: false
		    },
                title: {
                    text: null
                },
                  yAxis:[{
		  	        lineColor:'#999',
		  	        lineWidth:1,
		  	        tickColor:'#666',
		  	        tickWidth:1,
		  	        tickLength:3,
		  	        gridLineColor:'#ddd',
		  	         opposite: false
		  	    }, {
		  	        linkedTo: 0,
		  	        opposite: true,
		  	        gridLineColor:'#F8F8F8',
		  	        offset: 20,
		  	        labels:{
					            formatter: function() {
						    	return "<b>  "+ this.value+'</b>';
						    },
						    style: {
						                    color: 'green',
						                    font: '12px Helvetica',
						                    fontWeight: 'bold'
				            		}
	        },
		  	        tickPositioner: function(min,max){
		  	            var data = this.chart.yAxis[0].series[0].processedYData;
		  	            //last point
		  	            return [(data[data.length-1]).toFixed(2) , data[data.length-2]];
		  	        }   
	    }],
                xAxis: [{
                	min: xmin,
                	max: xmax
                }],
                series: dailyseries,
                exporting: {
		            enabled: false
        	}
            }, function(chart) {
    
    var renderer = chart.renderer;
    
    renderer.text(symbol, 150, 100).attr({
        
    }).css({
        fontSize: '16pt',
        color: 'green'
    }).add();
    
});
            
            return chart;
    }