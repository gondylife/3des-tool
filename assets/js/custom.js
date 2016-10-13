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
	$("#format2").on("click", function() {
        var jsonSample = {"narration": "Testing", "accountnumber": "1234567890", "bankcode": "123", "passcode": "123456", "amount": "1000.00", "currency": "NGN", "firstname": "Godswill", "lastname": "Okwara", "email": "gondy4life@gmail.com", "transactionreference": "SomeRef123456789"};
        $("#format1").removeAttr("checked");
        $("#format2").attr("checked", "");
        $("#keyvalue").hide();
        $("#raw").show();
        $("#rawParam").html(JSON.stringify(jsonSample, null, 4));
    });

    $("#format1").on("click", function() {
        $("#format2").removeAttr("checked");
        $("#format1").attr("checked", "");
        $("#raw").hide();
        $("#keyvalue").show();
    });

    $("#rawParam").on("focus", function() {
    	$("#rawParam").select();
    });

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

    $("#form_params_raw_encrypt").submit(function(e) {
        e.preventDefault();
        $("#loadingdiv").show();

        var data = {};
        data.encryption_key = $(".raw_encryption_key").val().trim();
        data.jsonparam = JSON.parse(rawParam.value);
        data.is_raw = true;

        function encryptParamRaw () {
			$.ajax({
			    url: '/process/encrypt', 
			    method: 'post',
			    data: data, 
			    success: function(data, status) {
			    	myModal.find("#encryptedPayload").html(JSON.stringify(data, null, 4));
			    	myModal.modal("show");
                	setTimeout(function() {
                    	$("#loadingdiv").hide();
                	}, 2000);
			    }
			});
        }
        encryptParamRaw();
    });

    $("#form_params_encrypt").submit(function(e) {
        e.preventDefault();
        $("#loadingdiv").show();

        function encryptParam () {
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
        encryptParam();
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
        decryptParam(key, param);
    });

    $("#copyButtonDecrypt").on("click", function(e) {
        e.preventDefault();
        $("#decryptedPayload").select();
		document.execCommand('copy');
    });
});