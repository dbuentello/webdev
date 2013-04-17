function getBalanceAndPositions(authtoken, acctnumber){

}

function getSessionID(){

}

function getSourceID(){
    return "TAG";
}

function getEnvironmentURLString(){

    // We should probably move the 100 to a version for request and not leave it here
    return "https://apis.tdameritrade.com/apps/100"
}


function makeTDARequestHelper(request, data ,successCallback, errorCallback) {

    // I'm going to use JQuery and reference the user model
    if (app.userProfileModel.get('session-id')) {
         url = getEnvironmentURLString() + '/' + request + ';jession-id=' + app.userProfileModel.get('session-id') ;
        $.ajax ({
            url:url,
            type:'POST',
            datatype:'',
            data:data,
            success : successCallback,
            error : errorCallback            
        } ) ;

    }
    else
    {
        // we should trigger an event here to login rather return a bad value
    }
    return null;

}


function createError(errorName, errorMessage){
    return {name:errorName, message:errorMessage};
}

// Mock Request Responses can be made from here
function makeTDARequest(url, postdata, authtoken, sessionid){

    if (authtoken === mock.token){
        return mock.makeMockRequest( url, postdata, authtoken, sessionid);
    }
    else {

    }

    var response = {};


    return response;
}

function getQuoteSnapShot(symbol,successCallback, errorCallback){
    // This takes a symbol array as an input because you can have more than one input to the api
    // logic should check the symbol quote cache first before requesting fresh data.  This call may make sense to be made in
    // in a worker thread if it exists
    var response = makeTDARequestHelper('/Quote','source='+getSourceID()+'&symbol='+symbol,successCallback, errorCallback);
    //jsonResponse = xmlToJson(response);
    //return jsonResponse;


}

function getSymbolLookup(text){
 // using market on demand here becuase it is better and does note require login
}


