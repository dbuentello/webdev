function AssetCache() {
	this.assetMap = {};
	
	this.getAssetObject=function (symbol){
		if(!this.assetMap[symbol]){
			this.assetMap[symbol] = new AssetModel();
		}
		return this.assetMap[symbol];
	}
	
}

