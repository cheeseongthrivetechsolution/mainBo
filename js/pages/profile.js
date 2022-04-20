//Index page function declaration
const Profile = {
  loadData : function(data){
    $(".profileImage").attr('src', data.avatar);
    $(".profileName").text(data.name);
    $(".profileUsername").text(" ( " + data.username + " )");
    $(".positionName").text(data.position + " / " + data.department + " ( " + data.role + ' ) ');
    $(".profileLastLogin").text(data.last_login + " / " + data.login_ip);
    $("#name").val(data.name);
    $("#email").val(data.email);
    $("#phone").val(data.phone);
    $("#dob").val(data.dob);
    $("#gender").val(data.gender);
  },
  getUserInfo : function(){
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: API_ENDPOINT + "user/getUserInfo",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200){
              Profile.loadData(data.row);
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
  },
  validateBasic : function(){
    $(".errorMsg").hide();
    if($('#name').val().trim() == "" ) {
       $('#name').focus();
       $(".profile_nameErr").show();
       return false;
    }
    if($('#email').val().trim() != "" ) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test($('#email').val())) {
        $('#email').focus();
        $(".profile_emailErr").show();
        return false;
      }
    }
    $('#saveProfileBtn').find('i').removeClass('d-none');
    $('#saveProfileBtn').prop("disabled",true);
    Profile.updateBasic()
  },
  updateBasic : function(){
    var params = {
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      dob: $("#dob").val(),
      gender: $("#gender").val(),
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: API_ENDPOINT + "user/updateBasic",
        type: "PUT",
        data: params,
        success: function(data) {
            $('#saveProfileBtn').find('i').addClass('d-none');
            $('#saveProfileBtn').prop("disabled",false);
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200){
              $('.profileName').text($("#name").val());
            }
            Common.addAlert(data.msg,data.code);
        },
        error: function(data) {
          $('#saveProfileBtn').find('i').addClass('d-none');
          $('#saveProfileBtn').prop("disabled",false);
          console.log(data);
        }
    });
  },
  validatePassword : function(){
    $(".errorMsg").hide();
    if($('#current_pass').val().trim() == "" ) {
       $('#current_pass').focus();
       $(".profile_curPassErr").show();
       return false;
    }
    if($('#new_pass').val().trim() == "" ) {
       $('#new_pass').focus();
       $(".profile_newPassErr").show();
       return false;
    } else {
      if ($('#new_pass').val().length < 6) {
         $('#new_pass').focus();
         $(".profile_password_description2").addClass("text-danger");
         return false;
      } else if (/^[a-zA-Z0-9- ]*$/.test($('#new_pass').val()) == true) {
        $('#new_pass').focus();
        $(".profile_password_description1").addClass("text-danger");
        return false;
      }
    }
    if($('#confirm_new_pass').val().trim() == "" ) {
       $('#confirm_new_pass').focus();
       $(".profile_conNewPassErr").show();
       return false;
    } else {
      if ($('#confirm_new_pass').val().trim() != $('#new_pass').val().trim()) {
        $('#confirm_new_pass').focus();
        $(".profile_conNewPassErrEqual").show();
        return false;
      }

    }
    if($('#email').val().trim() != "" ) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test($('#email').val())) {
        $('#email').focus();
        $(".profile_emailErr").show();
        return false;
      }
    }
    $('#savePasswordBtn').find('i').removeClass('d-none');
    $('#savePasswordBtn').prop("disabled",true);
    Profile.updatePassword();
  },
  updatePassword : function(){
    var params = {
      current: $("#current_pass").val(),
      new: $("#new_pass").val(),
      confirm_new: $("#confirm_new_pass").val(),
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: API_ENDPOINT + "user/updatePassword",
        type: "PUT",
        data: params,
        success: function(data) {
            $('#savePasswordBtn').find('i').addClass('d-none');
            $('#savePasswordBtn').prop("disabled",false);
            data = Common.parseObj(data);
            Common.skipIndex(data);
            Common.addAlert(data.msg,data.code);
            $("#current_pass").val("");
            $("#new_pass").val("");
            $("#confirm_new_pass").val("");
        },
        error: function(data) {
          $('#savePasswordBtn').find('i').addClass('d-none');
          $('#savePasswordBtn').prop("disabled",false);
          console.log(data);
        }
    });
  },
}

$(function() {
  //Get basic info
  Profile.getUserInfo();
  //apply datepicker
  $('.datePicker').datetimepicker({
    language: config.lang == 'EN' ? 'en' : 'zh-CN',
    format: 'yyyy-mm-dd',
    autoclose: true,
    weekStart: 1,
    //minuteStep: 1,
    minView: 2,
    maxView: 5,
    todayHighlight: true,
  });
  //Define actions
  $( "#saveProfileBtn" ).click(function(e) {
    Profile.validateBasic();
  });
  $( "#savePasswordBtn" ).click(function(e) {
    $("#passwordRequirement span").removeClass("text-danger");
    Profile.validatePassword();
  });

});
