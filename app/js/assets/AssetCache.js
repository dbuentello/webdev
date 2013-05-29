function AssetCache() {
	this.assetMap = {};
	
	this.getAssetObject=function (symbol){
		if(!this.assetMap[symbol]){
			var asset = this.assetMap[symbol] = new AssetModel();
            asset.set({symbol:symbol});
		}
		return this.assetMap[symbol];
	}
	
}

