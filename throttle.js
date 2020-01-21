module.exports = throttle
function throttle(fn,delay,options){
	var timer,result,args,context;
	var previous = 0;
	options = options || {};
	
	var now = function(){
		return +new Date
	}
	var throttled = function(){
		context = this;
		args = arguments;
		var _now = now()
		if(!previous && options.leading === false) previous = _now;
		var remaing = delay - (_now - previous);
		if(remaing <= 0){
			previous = _now;
			result = fn.apply(context,args);
		}else{
			if(!timer && options.trailing !== false)
				timer =setTimeout(function(){
					previous = options.leading === false ? 0 : now();
					timer = null;
					result = fn.call(context,args)
				},remaing)
		}
		return result
	}
	throttled.clear = function(){
		clearTimeout(timer)
		previous = 0;
		timer = null;
	}
	return throttled
}