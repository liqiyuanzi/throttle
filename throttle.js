module.exports = throttle
function throttle(fn,delay,options){
	var timer,result,args,context;
	var previous = 0;
	options = options || {};
	
	var throttled = function(){
		context = this;
		args = arguments;
		var now = +new Date;
		
		if(!previous && options.leading === false) previous = now;
		var remaing = delay - (now - previous);
		if(remaing <= 0){
			previous = now;
			result = fn.apply(context,args);
		}else{
			if(!timer && options.trailing !== false)
				timer =setTimeout(function(){
					previous = options.leading === false ? 0 : +new Date;
					timer = null;
					result = fn.call(context,args)
				},remaing)
		}
		return result

	}
	return throttled
}