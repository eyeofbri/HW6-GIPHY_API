var topics = ["1990", "nickelodeon", "slime", "x-files", "hey arnold"];

$(document).ready(function() {
	renderTopicsArray();
	popupWindows("howTo");
	popupWindows("about");

	///////
	// MAIN WINDOW BUTTONS
	///////
	
	$("#window_heightControl").click(function(event) {
		menuAI("toggle_height_size");
	});

	$("#window_widthControl").click(function(event) {
		menuAI("toggle_width_size");
	});

	///////
	// FILE MENU BUTTONS
	///////
	$("#window_clearScreen").click(function(event) {
		menuAI("clearScreen");
	});

	$("#topicButtons_clear").click(function(event) {
		menuAI("clearButtons")
	});

	$("#topicButtons_reset").click(function(event) {
		renderTopicsArray();
	});

	///////
	// HELP MENU BUTTONS
	///////
	$("#window_howTo").click(function(event) {
		if (!$("#howToPop").length){
  			popupWindows("howTo");
  		}
	});

	$("#window_about").click(function(event) {
  		if (!$("#aboutPop").length){
  			popupWindows("about");
  		}
	});


	///////
	// GIF MENU BUTTONS
	///////


	$("#typeButtons_submit").on("click", function(event) {
		event.preventDefault();
		NewButton("try");
	});

	$("#trending").on("click", function(event) {
		event.preventDefault();
		spawnPopups("trending");
	});

});


function menuAI(whatToDo) {

	if(whatToDo == "toggle_width_size"){
		$("#container").toggleClass("container-W-full");

		var drag_is_on = $("#container").attr("data-content");

		if(drag_is_on == "noDrag"){ 
			$("#container").attr("data-content", "drag");
			$("#container").draggable({ disabled: false }); 
		}else{ 
			$("#container").attr("style", "left:0px; top:0px;");

			$("#container").removeClass("ui-draggable").removeClass("ui-draggable-handle");
			
			$("#container").attr("data-content", "noDrag");
			$("#container").draggable({ disabled: true });
		}
	}

	if(whatToDo == "toggle_height_size"){
		$("#container").toggleClass("container-H-closed").toggleClass("container-H-open");
	}


	if(whatToDo == "clearScreen"){
		$( ".gifWindow" ).each(function() {
  			$( this ).remove();
		});
	}

	if(whatToDo == "clearButtons"){
		$(".buttonHolder").empty();

		var vr = $("<div>");
		vr.addClass("fakeVR");
		$(".buttonHolder").append(vr);
		
		var rowHolder = $("<div>");
		rowHolder.addClass("rowHolder");
		$(".buttonHolder").append(rowHolder);

		var row = $("<div>");
		row.addClass("row");
		rowHolder.append(row);
	}
}





function NewButton(whatToDo) {
	if(whatToDo == "try"){
		var t = $("#topic-input").val().trim();
		if(t != ""){ 
			NewButton("create"); 	
		}
	}
	if(whatToDo == "create"){

		var a = $("<button>");
		var t = $("#topic-input").val().trim();
		a.attr("data-name", t );
		a.text( t );
		a.click(function(event) {
			spawnPopups($(this).attr("data-name"));
		});

		$("#topic-input").val("");

		//is the LAST row full?
		// console.log( $(".row:last-of-type" ).text() );

		//if not
		$(".buttonHolder").children(".rowHolder").children(".row").append(a);
		//if so, 
		// make a new row, then append to that
	}
}

function renderTopicsArray() {

	$(".buttonHolder").empty();

	var vr = $("<div>");
	vr.addClass("fakeVR");
	$(".buttonHolder").append(vr);

	var rowHolder = $("<div>");
	rowHolder.addClass("rowHolder");
	$(".buttonHolder").append(rowHolder);

	var row = $("<div>");
	row.addClass("row");
	rowHolder.append(row);

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		row.append(a);

		a.click(function(event) {
			spawnPopups($(this).attr("data-name"));
		});
	}
}


function spawnPopups(which) {
	for (var i = 0; i < 10; i++) {
		popupWindows("button", which);
	}
}
function popupWindows(kind, which) {

		var gW = $("<div>");
		gW.addClass("gifWindow");
		var top = getRandomIntInclusive(0, (screen.height/1.2) );
		var left = getRandomIntInclusive(0, (screen.width/2) );

		if(kind == "button"){
			gW.attr("style", "top:"+top+"px; left:"+left+"px;");
		}
		if(kind == "howTo"){
			gW.attr("style", "top:"+195+"px; left:"+20+"px;");
			gW.css("height", "250px");
		}
		if(kind == "about"){
			gW.attr("style", "top:"+260+"px; left:"+40+"px;");
			gW.css("height", "140px");
		}
		$("body").append(gW);

		var gW_TN = $("<div>");
		gW_TN.addClass("gifWindow_topNav");
		gW.append(gW_TN);

			var gW_T = $("<div>");
			gW_T.addClass("gif_Top");
			var typeDisplay;
			if(kind == "button"){
				typeDisplay = which.substring(0,1).toUpperCase() + which.substring(1,which.length);
			}
			if(kind == "howTo"){
				typeDisplay = "How To:";
			}
			if(kind == "about"){
				typeDisplay = "About This Project:";
			}
			gW_T.text(typeDisplay);
			gW_TN.append(gW_T);

			var gW_C = $("<button>");
			gW_C.addClass("gif_close");
			gW_C.text("X");
			gW_TN.append(gW_C);

		var gW_GB = $("<button>");
		gW_GB.addClass("gifButton");
		gW.append(gW_GB);
		
		if(kind == "button"){
			addGIPHY(which, gW_GB);
		}
		if(kind == "howTo"){
			var h = $("<div>");
			h.addClass("text-about");
			h.html("Use the navigation bar to display gifs from the GIPHY API.<br><br>"+
				"The input area allow you to add additonal topics into the navigation.<br><br>"+
				"Controls located in the File Menu.");
			gW_GB.append(h);

			gW.attr("id","howToPop");
		}
		if(kind == "about"){
			var a = $("<div>");
			a.addClass("text-about");
			a.html("This GIPHY Popup Generator was<br>"+
				"created during February 2017<br>"+
				"for Rutgers Coding Bootcamp by Brian McLedon");
			gW_GB.append(a);

			gW.attr("id","aboutPop");
		}	

		//interactions

		gW.draggable({ handle: gW_T });

		gW.on("click", function(event) {
			$("body").append( gW ); 
		});

		gW_T.mousedown(function(event){ 
			$("body").append( gW ); 
			gW_T.toggleClass("gif_Top_Active");
		});

		gW_T.mouseup(function(event){ 
			gW_T.toggleClass("gif_Top_Active");
		});

		gW_C.click(function(event){ 
			$(this).parent().parent().remove();
		});
}


function addGIPHY(search, placeWhere) {
	var s = "q="+search;
	var limit = "&limit=99";
	var rating = "";//"&rating=pg-13";
	var queryURL = "http://api.giphy.com/v1/gifs/search?" + s+ rating + "&api_key=dc6zaTOxFJmzC" + limit ;
	
	if(search == "trending"){
		queryURL = "http://api.giphy.com/v1/gifs/trending?" + rating + "api_key=dc6zaTOxFJmzC" + limit;
	}

	$.ajax({
   		url: queryURL,
    	method: "GET"
    	}).done(function(response) {

    		var rand = getRandomIntInclusive(0,response.data.length-1);

    		// console.log(response.data[0]);

	    	var tempIMG = new Image();
			tempIMG.src = response.data[rand].images.downsized_still.url; //saving this one like this so I can use the load function
			var otherIMG = 'url(' + response.data[rand].images.downsized.url + ')';
			placeWhere.attr('data-content', otherIMG);
    		
			tempIMG.addEventListener('load', function() { 
				placeWhere.css('background-image', 'url(' + tempIMG.src + ')');
				placeWhere.parent().css('width', tempIMG.width).css('height', tempIMG.height + 30);
			
				var rating = $("<div>");
				rating.addClass("gifRating");
				rating.text( "Rated: "+response.data[0].rating.toUpperCase() );
				placeWhere.append(rating);

			}, false);

			placeWhere.click(function(event){
				var currentIMG = placeWhere.css('background-image');
				var savedIMG = placeWhere.attr('data-content');
				placeWhere.css('background-image', savedIMG);
				placeWhere.attr('data-content', currentIMG);
			});
  	});
}



/*///////*/
/*BEGIN */
/*RE-USABLE JAVASCRIPT*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*END */
/*RE-USABLE JAVASCRIPT*/
/*///////*/
