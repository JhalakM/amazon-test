var notesData = [];

$(document).ready(function(){
	$("[name=btnAdd]").click(function(){
		$("#list-notes").hide();
		$("#add-form").show();
		var addNotesVal = $("[type=textarea]").val();
		if(addNotesVal != null)
			$(".note-list").html();
	});
	
	$("[name=saveNote]").click(function(){
		if($("[name=noteName]").val() != ''){
			var addNoteJson = {};
			addNoteJson["name"] = $("[name=noteName]").val();
			addNoteJson["content"] = $("[name=noteContent]").val();
			addNoteJson["color"] = $("[name=noteColor]").val();
			notesData.push(addNoteJson);
			generateNotesList();
			$("#list-notes").show();
			$("#add-form").hide();
		} 
		//localStorage.setItem("noteData",addNoteJson);
	});
	
	$(document).delegate("#notes-list .note-name a","click",function(){
		var noteID = $(this).parents('li').attr('data-index');
		var wrapper = $("#view-note");
		wrapper.find(".title").text(notesData[noteID].name);
		wrapper.find(".view-content").text(notesData[noteID].content).css({'background-color': notesData[noteID].color});
		$("#view-note").show();
		$("#list-notes").hide();
	});
	
	$('.back-to-list,[name=back]').click(function(){
		$("#add-form").hide();
		$("#view-note").hide();
		$("#list-notes").show();
	});
	
	$(document).delegate("#notes-list .delete-note a","click",function(){
		var noteID = $(this).parents('li').attr('data-index');
		notesData.splice(noteID,1)
		generateNotesList();
	});
	
});
function generateNotesList(){
	var listWrapper = $('#notes-list');
	listWrapper.html('');
	if(notesData.length > 0){
		for(var i=0; i< notesData.length; i++){
			listWrapper.append('<li data-index='+i+'><span class="note-name"><a href="javascript:void(0);">'+notesData[i].name+'</a></span><span class="delete-note"><a href="javascript:void(0);">&times;</a></span></li>');
			listWrapper.find("li:last").css({'background-color': notesData[i].color});
		}
	}else{
		listWrapper.append("<li>No list available</li>");
	}
}