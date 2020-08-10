var soundlink = "";

$(document).ready(function(){
	
	$("*").on("dblclick",function (e){
		getSelectionText();
		e.stopImmediatePropagation(); //to vala giati ekane fire polles fores to idio event
   });
   
   $(".ui-dialog-title").addClass("yui3-cssreset");
   //$("<style>.yui3-cssreset{z-index: 100}</style>").appendTo( "head" );
   //$("<style>.yui3-cssreset{position: relative}</style>").appendTo( "head" );
   $("<style>.yui3-cssreset{font-size: 18px}</style>").appendTo( "head" );
   $("<style>.yui3-cssreset{font-family: 'Times New Roman', Times, serif;}</style>").appendTo( "head" );
   $("<style>.ui-dialog-title{font-size: 18px}</style>").appendTo( "head" );
   $("<style>#DialogMM{max-width: 500px}</style>").appendTo( "head" );
   $("<style>#DialogMM{text-align: left}</style>").appendTo( "head" );
   $("<style>#DialogMM{ min-height: 20px}</style>").appendTo( "head" );
   $("<style>.ui-dialog-content{ height: 800px}</style>").appendTo( "head" );
   $("<style>ul.square{list-style-type: square}</style>").appendTo( "head" );
   $("<style>ul.square{margin-left: 10px}</style>").appendTo( "head" );
});



$('body').click(function(e){
	if($('#DialogMM').dialog('isOpen')==true && !$(e.target).is('.ui-dialog, a')&& !$(e.target).closest('.ui-dialog').length){
		$('#DialogMM').dialog('destroy');
	}
});



function getSelectionText() {
	var text = "";
	var pattern = /[^a-zA-Z\s]/g;
	//Vrisko ta coordinates tou highlighted keimenou
	var range = window.getSelection().getRangeAt(0);
	var dummy = document.createElement("span");
	range.insertNode(dummy);
	var position = $(dummy).offset();
	var scroll = $(document).scrollTop();
	dummy.parentNode.removeChild(dummy);
	
	var outGreek=" ";
	var out="";
	if (window.getSelection) {
		text = window.getSelection().toString();
		if (pattern.test(text)==false && text.length>1){
			var g1 = $.get( "http://dictionary.reference.com/browse/"+text, function(data){
						if($(data).find(".def-pbk > .def-set > .def-content").slice(0,1).text().length){
							if($(data).find(".def-pbk > .def-set > .def-content").slice(1,2).text()){
								out = "<p></p><div><ul class='square'><li>"+$(data).find(".def-pbk > .def-set > .def-content").slice(0,1).text()+"</li><p><br></p><li>"+$(data).find(".def-pbk > .def-set > .def-content").slice(1,2).text()+"</li></ul></div>";
							}else{
								out = "<p></p><div><ul><li>"+$(data).find(".def-pbk > .def-set > .def-content").slice(0,1).text()+"</li></ul></div>";
							}
						}else{
							out = "<p></p><i>No definition found !</i>";
						}
					 }, "html");
			var g2 = $.get( "http://www.wordreference.com/engr/"+text,  function(dataGreek){
						if(outGreek = $(dataGreek).find(".even > .ToWrd").text().length){
							outGreek = $(dataGreek).find(".even > .ToWrd").first().children().remove().end().text();
						}else{outGreek = "null";}
					 }, "html");
			var g3 = $.get( "http://dictionary.reference.com/browse/"+text,  function(sound){
						soundlink = $(sound).find(".audio-wrapper > .speaker").attr('href');
						//console.log(soundlink);
					 }, "html");
			$.when(g1, g2, g3).done(function() {
				openDialog(text,outGreek, soundlink, out, position, scroll );
			});
		}else {text="";}
		
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
}


function openDialog(definition, translation, sound, text, pos, scrolled) {
	if($('#DialogMM').dialog('isOpen')==true) {
		$('#DialogMM').dialog('destroy');
	}
	var posX = pos.left;
	var posY = pos.top - scrolled;
	
	$("<div id='DialogMM' class='yui3-cssreset'" + text + "</div>")
    .dialog({
		open: function(event, ui) { 
			$(".ui-dialog-titlebar-close").hide(); //gia na mi fainetai to close button
		}, 
		create: function () { 
			var imgURL = chrome.extension.getURL("sound.png");
			if(translation== "null"){
				$(this).siblings().find(".ui-dialog-title").html("<div>"+definition + " ➞ <i>No translation found</i></div>");
			}else{
				$(this).siblings().find(".ui-dialog-title").html("<div>"+definition + " ➞ " + translation+ "&nbsp;&nbsp;&nbsp;<img name='track1' src='"+ imgURL+"' width='25' height='25' border='0' id='track1' alt='' class='play' /></div>");
			}
		},
		modal: false,
		minHeight: 20,
        height:'auto', 
		draggable: false,
		width:'auto',
		position: { my: "center+"+posX+" bottom+"+posY, at: "left top", of: window},
		dialogClass : "yui3-cssreset"
    });
	
	var audioElement = document.createElement('audio');
	audioElement.setAttribute('src', soundlink);
	$('.play').click(function() {
		console.log("paizo");
		audioElement.play();
	});

}	


