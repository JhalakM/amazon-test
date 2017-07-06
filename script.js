var notesData = [];

$(document).ready(function(){
	$("[name=btnAdd]").click(function(){
		$("#list-notes").hide();
		$("#add-form").show();
	});
	
	$("[name=saveNote]").click(function(){
		if(!$("#add-form").hasClass("edit") && $("[name=noteName]").val() != ''){
			var addNoteJson = {};
			addNoteJson["name"] = $("[name=noteName]").val();
			addNoteJson["content"] = $("[name=noteContent]").val();
			addNoteJson["color"] = $("[name=noteColor]").val();
			notesData.push(addNoteJson);
			generateNotesList();
		} else{
			var noteID = $("#add-form").attr('data-id');
			notesData[noteID].name = $("[name=noteName]").val();
			notesData[noteID].content = $("[name=noteContent]").val();
			notesData[noteID].color = $("[name=noteColor]").val();
			$("#add-form").removeClass("edit");
			generateNotesList();
		}
		$("#list-notes").show();
		$("#add-form").hide();
		$("#add-form :input").val('');
		$("#add-form select option:first").prop('selected',true);
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
	
	$(document).delegate("#notes-list .edit-note a","click",function(){
		var noteID = $(this).parents('li').attr('data-index');
		$("#list-notes").hide();
		$("#add-form").show().addClass("edit").attr("data-id",noteID);
		$("#add-form").find("[name=noteName]").val(notesData[noteID].name);
		$("#add-form").find("[name=noteContent]").val(notesData[noteID].content);
		$("#add-form").find("[name=noteColor]").val(notesData[noteID].color);
	});
});
function generateNotesList(){
	var listWrapper = $('#notes-list');
	listWrapper.html('');
	if(notesData.length > 0){
		for(var i=0; i< notesData.length; i++){
			listWrapper.append('<li data-index='+i+'><span class="note-name"><a href="javascript:void(0);">'+notesData[i].name+'</a></span><span class="edit-note"><a href="javascript:void(0);"></a></span><span class="delete-note"><a href="javascript:void(0);">&times;</a></span></li>');
			listWrapper.find("li:last").css({'background-color': notesData[i].color});
		}
	}else{
		listWrapper.append("<li>No list available</li>");
	}
}