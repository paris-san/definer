
chrome.browserAction.onClicked.addListener(function callback{
	$("AAAAAAAAAAAAAAAAAAAAAAAA").appendTo( "#status" );
})
	
$(document).ready(function(){
	
	$("*").on("dblclick",function (e){
		getSelectionText();
		e.stopImmediatePropagation(); //to vala giati ekane fire polles fores to idio event
   });
   
   $("AAAAAAAAAAAAAAAAAAAAAAAA").appendTo( "#status" );
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

function getSelectionText() {
	var text = "";
	
	if (window.getSelection) {
		text = window.getSelection().toString();
		
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	
}


document.addEventListener('DOMContentLoaded', function() {


});