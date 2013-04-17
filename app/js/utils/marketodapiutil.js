
function getMODEnvironmentURLString(){
    // We should probably move the 100 to a version for request and not leave it here
    return "https://mobileapi.tdameritrade.wallst.com"
}


function makeMODRequestHelper(request, data ,successCallback, errorCallback) {

    // I'm going to use JQuery and reference the user model
	url = getMODEnvironmentURLString() + '/' + request;
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



function getAssetOverView(symbol,assettype, successCallback, errorCallback){
	if(assettype =='E'){
    		var response = makeMODRequestHelper('/Quote/EquityOverview','symbol='+symbol+'&user_id=mobileapi&user_password=mobileapi',successCallback, errorCallback);
    	}
}