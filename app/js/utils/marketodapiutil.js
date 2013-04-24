
function getMODEnvironmentURLString(){
    // We should probably move the 100 to a version for request and not leave it here
    return "https://mobileapi.tdameritrade.wallst.com"
}


function makeMODRequestHelper(url, data ,successCallback, errorCallback) {

    // I'm going to use JQuery and reference the user model
	//url = getMODEnvironmentURLString() + '/' + request;
	$.ajax ({
	    url:url,
	    type:'POST',
	    datatype:'',
	    data:data,
	    success : successCallback,
	    error : errorCallback            
	} ) ;

    return null;

}



function getAssetOverView(symbol, successCallback, errorCallback){
	var assetObj = app.assetcache.getAssetObject(symbol);

	if(assetObj.get('assetType') =='E'){
    		var response = makeMODRequestHelper(getMODEnvironmentURLString() +'/Quote/EquityOverview','symbol='+symbol+'&user_id=mobileapi&user_password=mobileapi',successCallback, errorCallback);
    	}else if(assetObj.get('assetType') =='ETF'){
    		var response = makeMODRequestHelper(getMODEnvironmentURLString() +'/Quote/FundOverview','symbols='+symbol+'&user_id=mobileapi&user_password=mobileapi',successCallback, errorCallback);
    	}else {
    		alert(' iooooo rama ' + assetObj.get('assetType'));
    	}
}

function getAssetFastLook(symbol, successCallback, errorCallback){
	var response = makeMODRequestHelper('https://research.ameritrade.com/wwws/API/FastLookup/Lookup.asp','q='+symbol+'&user_id=mobileapi&user_password=mobileapi',successCallback, errorCallback);
}