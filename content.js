$(document).ready(function(){
	$(".uiList").bind("DOMSubtreeModified", function() {
		chrome.extension.sendRequest({method: "getList"}, function(response) {
			$('.pvm').each( function(){
				var t = $(this).html();
				var p = response.status;
				if ( p != undefined){
					var m = p.split("&");
					for ( var i = 0; i < m.length; i++){
						if ( m[i].length < 3) continue;
						var mm = new RegExp(m[i], "i");
						var p = t.match( mm);
						if ( p!= null && p.length > 0){
							$(this).fadeOut(500);		
							break;
						}							
					}
				}				
			});
		});
	});
});