$(function(){
    $('textarea.limited').inputlimiter({
        remText: '%n character%s remaining...',
        limitText: 'max allowed : %n.'
    });

    $(".chosen-select").chosen();
    
    $("#artisan_image").ace_file_input({
        style : 'well',
        no_file: 'No file...',
        btn_choose: 'Choose image',
        btn_change: null,
        droppable: false,
        onchange: null,
        thumbnail: true,
        preview_error : function(filename, error_code) {
            //name of the file that failed
            //error_code values
            //1 = 'FILE_LOAD_FAILED',
            //2 = 'IMAGE_LOAD_FAILED',
            //3 = 'THUMBNAIL_FAILED'
            alert(error_code);
        },
        whitelist:'gif|png|jpg|jpeg',
        blacklist:'exe|php|zip|txt'
    })/*.on('change', function(){
        alert('image');
    });*/
	
	$('.status-button').on('click', function(){
		var stats = $(this).attr('data-status');
		var id = $(this).attr('data-status-id');
		var type = $(this).attr('data-status-type');
				
		if ( stats == 0 ) {
			stats_label = "Unpublish";
		}
		else if (stats == 1) {
			stats_label = "Publish";
		}
				
		$('#status-modal #myModalLabel').html( stats_label + " this " + type + "?");
		$('#status-modal #update-status-type').html( type );
		$('#status-modal #btn-status-yes').attr('data-status', stats);
		$('#status-modal #btn-status-yes').attr('data-status-id', id);
		$('#status-modal #btn-status-yes').attr('data-status-type', type);
		$('#status-modal').modal('show');
	});
	
	$('#status-modal #btn-status-yes').on('click', function(){
		var stats = $(this).attr('data-status');
		var id = $(this).attr('data-status-id');
		var type = $(this).attr('data-status-type');
	
		if(isNaN(stats) && isNaN(id) && type == ''){
			alert('Hacker Detected!');
			// logout
		}
		else{			
			$('#status-modal #label-msg').html('<i class="icon-spinner icon-spin"></i> Updating status...');
			
			if (type == "product") {
				post_url = site_url + "product/update_status";
				redirect_url = site_url + 'product/' + id;
			}
			else if (type == "artisan") {
				post_url = site_url + "artisan/update_status";
				redirect_url = site_url + 'artisan/details/' + id;	
			}
			else if (type == "enterprise") {
				post_url = site_url + "enterprise/update_status";
				redirect_url = site_url + 'enterprise/details/' + id;	
			}
			
			$.post( post_url , {
				id : id,
				status : stats
			}, function(data){
				$('#status-modal').modal('hide');
				$("#alert-modal").modal('show');
				
				if(data.status == 1){
					$("#alert-modal .modal-body h5 span").html(data.response);
				}
				else if (data.status == 2){
					alert(data.response);
				}
				else {
					// an error occured					
					$("#alert-modal").on('hidden', function(){						
						$("#alert-modal").modal('hide');
					});
				}
			}, 'json');
		}
	});
	
	$('body').on('click', '#edit-artisan-name #save_art_name', function(event){
		$('#edit-artisan-name #save-msg').html('<i class="icon-spinner icon-spin"></i> updating artisan\'s name...');
		
		if($('#edit-artisan-name #artisan_name').val() == ''){
			$('#edit-artisan-name #save-msg').html('<span class="label label-lg label-danger arrowed-right">Enter artisan\'s name</span>');
			$('#edit-artisan-name #artisan_name').focus();
		}
		else{
			$.post(site_url + 'artisan/update', {
				art_id : $(this).attr('data-artisan'),
				name : $('#edit-artisan-name #artisan_name').val()
			}, function(data){
				if(data.status == 1){
					$('#edit-artisan-name #save-msg').html('<span class="label label-lg label-success arrowed-right">'+ data.response +'</span>');
					$('div#artisan_name').html($('#edit-artisan-name #artisan_name').val());
				}
				else if(data.status == 2){
					alert(data.response);
					window.location = document.URL;
				}
				else{
					$('#edit-artisan-name #save-msg').html('<span class="label label-lg label-danger arrowed-right">'+ data.response +'</span>');
				}
			}, 'json');
		}
	});
	
	$('body').on('click', '#edit-artisan-desc #save_art_desc', function(event){
		$('#edit-artisan-desc #save-msg').html('<i class="icon-spinner icon-spin"></i> updating artisan\'s description...');
		
		if($('#edit-artisan-desc #artisan_description').val() == ''){
			$('#edit-artisan-desc #save-msg').html('<span class="label label-lg label-danger arrowed-right">Enter artisan\'s description</span>');
			$('#edit-artisan-desc #artisan_description').focus();
		}
		else{
			$.post(site_url + 'artisan/update', {
				art_id : $(this).attr('data-artisan'),
				desc : $('#edit-artisan-desc #artisan_description').val()
			}, function(data){
				if(data.status == 1){
					$('#edit-artisan-desc #save-msg').html('<span class="label label-lg label-success arrowed-right">'+ data.response +'</span>');
					$('div#art_description').html($('#edit-artisan-desc #artisan_description').val());
				}
				else if(data.status == 2){
					alert(data.response);
					window.location = document.URL;
				}
				else{
					$('#edit-artisan-desc #save-msg').html('<span class="label label-lg label-danger arrowed-right">'+ data.response +'</span>');
				}
			}, 'json');
		}
	});
		
	$('body').on('click', '#edit-artisan-entr #save_art_entr', function(event){
		$('#edit-artisan-entr #save-msg').html('<i class="icon-spinner icon-spin"></i> updating artisan\'s enterprise...');
		
		if($('#edit-artisan-entr #enterprise_id').val() == ''){
			$('#edit-artisan-entr #save-msg').html('<span class="label label-lg label-danger arrowed-right">Select artisan\'s enterprise</span>');
			$('#edit-artisan-entr #enterprise_id').focus();
		}
		else{
			$.post(site_url + 'artisan/update', {
				art_id : $(this).attr('data-artisan'),
				entr : $('#edit-artisan-entr #enterprise_id').val()
			}, function(data){
				if(data.status == 1){
					$('#edit-artisan-entr #save-msg').html('<span class="label label-lg label-success arrowed-right">'+ data.response +'</span>');
					$('div#art_entr').html($('#edit-artisan-entr #enterprise_id option#entr_' + $('#edit-artisan-entr #enterprise_id').val()).html());
				}
				else if(data.status == 2){
					alert(data.response);
					window.location = document.URL;
				}
				else{
					$('#edit-artisan-entr #save-msg').html('<span class="label label-lg label-danger arrowed-right">'+ data.response +'</span>');
				}
			}, 'json');
		}
	});
	
	$('body').on('click', '#delete-artisan #btn_del_art', function(event){
		/* delete artisan */
		
		$('#delete-artisan #delete-msg').html('<i class="icon-spinner icon-spin"></i> deleting artisan...');
		
		if(!$('#delete-artisan #btn_del_art').attr('data-artisan-id')) {
			 window.location.reload();
		}
		
		artisan_id=$('#delete-artisan #btn_del_art').attr('data-artisan-id');				
		if(isNaN(artisan_id)) {
			window.location.reload();
		}
		
		$.post(site_url + 'artisan/delete', {
			artisan_id : artisan_id
		}, function(data){
			if(data.status == 1){
				$('#delete-artisan #delete-msg').html('<span class="label label-lg label-success arrowed-right">'+ data.response +'</span>');
				
				$('#delete-artisan .modal-footer #modal-buttons .btn').hide();
                $('#delete-artisan .modal-footer #modal-buttons #close_btn').show();
				
				$('#delete-artisan').on('hidden', function() {
					window.location = site_url + 'artisan/listings';
				});
			}
			else if(data.status == 2){
				$('#delete-artisan #delete-msg').html('<span class="label label-lg label-danger arrowed-right">'+ data.response +'</span>');  
				window.location = document.URL;
			}
			else{
				$('#delete-artisan #delete-msg').html('<span class="label label-lg label-danger arrowed-right">'+ data.response +'</span>'); 
			}
		}, 'json');
	});
	
	$('#edit-artisan-desc, #edit-artisan-name, #edit-artisan-entr #delete-artisan, #upload_artisan_image, #alert-modal').on('hidden', function(){ window.location = document.URL; });
});
