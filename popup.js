$(document).ready(function(){
	load();

	$("#s").click(function(){
		var t = $("#newBlock").val();
		var p = "<a href='#' class='r'>"+ t + "</a><br/>";
		$("#list").append(p);
		$("#newBlock").val("");
		save();
	});
	
	function load(){
		$("#list").html("");
		var l = localStorage["list"];
		if ( l != undefined){
			var m = l.split("&");
			for ( var i = 0; i < m.length; i++){
				var p = "<a href='#' class='r'>"+ m[i] + "</a><br/>";
				$("#list").append(p);
			}
		}
	}
	
	function save(){
		var k = "";
		$(".r").each( function(){
			var pp  = $(this).text();
			if ( pp.length > 2)
				k += pp + "&";
		});
		localStorage["list"] = k;
	}
	
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (request.method == "getList")
			sendResponse({status: localStorage['list']});
		else
			sendResponse({}); // snub them.
	});
		
	
	$(".r").live('click', function(){
		$(this).remove();
		save();
		load();
	});
});