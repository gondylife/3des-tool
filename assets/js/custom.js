$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).ready(function() {
    var max_fields = 10, wrapper = $(".params"), add_button = $(".add_param"), myModal = $("#myModal");
    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            $(wrapper).append('<div class="form-group"><label class="control-label">#' + x + '</label><div><input type="text" placeholder="Insert Parameter Key" class="form-control param_key" name="paramKey" required /></div><div><input type="text" placeholder="Insert Parameter Value" class="form-control param_value" name="paramValue" required /></div><a href="#" class="remove_param">Remove</a></div>');
        }
    });
    $(wrapper).on("click", ".remove_param", function(e) {
        e.preventDefault();
        $(this).parent("div").remove();
        x--;
    });

    $("#form_params_encrypt").submit(function(e) {
        e.preventDefault();
        $("#loadingdiv").show();

        function encryptParam (key, param) {
			$.ajax({
			    url: '/process/encrypt', 
			    method: 'post',
			    data: $('#form_params_encrypt').serializeObject(), 
			    success: function(data, status) {
			    	myModal.find("#encryptedPayload").html(JSON.stringify(data, null, 4));
			    	myModal.modal("show");
                	setTimeout(function() {
                    	$("#loadingdiv").hide();
                	}, 2000);
			    }
			});
        }
        encryptParam(1, 2);
    });

    $("#copyButtonEncrypt").on("click", function(e) {
        e.preventDefault();
        $("#encryptedPayload").select();
		document.execCommand('copy');
    });

    $("#form_params_decrypt").submit(function(e) {
        e.preventDefault();
        $("#loadingdiv").show();

        function decryptParam (key, param) {
			$.ajax({
			    url: '/process/decrypt', 
			    method: 'post',
			    data: $('#form_params_decrypt').serializeObject(), 
			    success: function(data, status) {
			    	myModal.find("#decryptedPayload").html(JSON.stringify(data, null, 4));
			    	myModal.modal("show");
                	setTimeout(function() {
                    	$("#loadingdiv").hide();
                	}, 2000);
			    }
			});
        }
        decryptParam(1, 2);
    });

    $("#copyButtonDecrypt").on("click", function(e) {
        e.preventDefault();
        $("#decryptedPayload").select();
		document.execCommand('copy');
    });
});