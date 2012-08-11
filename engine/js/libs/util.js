(function(exports){
	function Util(){}
	Util.prototype.proxy =  function(func, thisObject){
		return(function(){
			return func.apply(thisObject, arguments);
		})
	}

	exports.util = new Util();
})(exports);