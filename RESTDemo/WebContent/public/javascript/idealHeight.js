function setIdealHeight(idealHeightString) {
	if (idealHeightString) {
		// We must subtract 45, per Bluemix UI developer, to account
		// for margins and padding.  Otherwise, we'll get nasty Bluemix/ACE
		// scroll bar.  We want single scroll bar for our iframe.
		var idealHeightNumber = Number(idealHeightString) - 45;
		// console.log("setting frame height to " + idealHeightNumber + " for service " + serviceInstanceGuid);
		var targetOrigin = '*';
		var payload = {
			type : '/ace/service/framesize',
			data : {
				id : serviceInstanceGuid,
				height : idealHeightNumber
			}
		};
		window.top.postMessage(payload, targetOrigin);
	}
}

function getIdealHeightFromACE(event) {
	var msgType;
	var data;
	try {
		msgType = event.data.type;
		data = event.data.data;
		if (msgType === '/ace/service/framesize' && data.idealHeight) {
			setIdealHeight(data.idealHeight);
		}
	} catch (e) {
		// error parsing message data; could be intended for another function;
		// ignore
		return;
	}
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

var serviceInstanceGuid = null;

(function() {
	function addEventListener(el, type, listener, useCapture) {
		if (el.addEventListener) {
			el.addEventListener(type, listener, useCapture);
		} else if (el.attachEvent) {
			el.attachEvent('on' + type, listener);
		}
	}
	addEventListener(window, 'message', getIdealHeightFromACE);
	serviceInstanceGuid = idealHeightSubId;  // idealHeightSubId declared in 
	                                         // jsps that use this javascript
	setIdealHeight(getUrlVars()["ideal_height"]);


})();
