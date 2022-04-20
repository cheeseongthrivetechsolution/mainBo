//Index page function declaration
const Home = {
  getIndexInfo: function () {
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: API_ENDPOINT + "user/getIndexInfo",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200){
              $(".profileImage").attr('src', data.row.avatar);
              $(".profileName").append(data.row.name);
              $(".departmentName").text(data.row.department);
              $(".positionName").text(data.row.position);
              if (data.row.sound == 0) {
                $(".speakerOnOff i").removeClass("fa-volume-up");
                $(".speakerOnOff i").addClass("fa-volume-mute");
                $('.speakerOnOff:checkbox').prop("checked", false);
              }
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
  },
  logout: function () {
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: API_ENDPOINT + "user/logout.php",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            if(data.code == 200 || data.code == 401) {
              localStorage.clear();
              window.location.replace("../index.html");
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log("data error");
        }
    });
  },
  speaker: function () {
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: API_ENDPOINT + "user/soundSwitch",
        type: "PUT",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200){
              if ($(".speakerOnOff i").hasClass("fa-volume-up")) {
                $(".speakerOnOff i").removeClass("fa-volume-up");
                $(".speakerOnOff i").addClass("fa-volume-mute");
                $('.speakerOnOff:checkbox').prop("checked", false);
              } else {
                $(".speakerOnOff i").addClass("fa-volume-up");
                $(".speakerOnOff i").removeClass("fa-volume-mute");
                $('.speakerOnOff:checkbox').prop("checked", true);
              }
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
  },
  loadIframe: function (url) {
    var $iframe = $('#contentIframe');
    if ($iframe.length) {
        $iframe.attr('src',url);
        return false;
    }
    return true;
  },
};

$(function() {
  //Get basic info for index page
  Home.getIndexInfo();
  //Define actions
  $( "#logout" ).click(function() {
    Home.logout();
  });
  $( ".speakerOnOff" ).click(function() {
    Home.speaker();
  });
  $(".zh_translator").on("click", function() {
    $("button[class*='en_translator']").removeClass("active");
    $("button[class*='zh_translator']").addClass("active");
    Common.setLanguage("ZH");
    Common.translation();
  });
  $(".en_translator").on("click", function() {
    $("button[class*='en_translator']").addClass("active");
    $("button[class*='zh_translator']").removeClass("active");
    Common.setLanguage("EN");
    Common.translation();
  });
  //Get Language for default active Button
  var buttonLanguage = config.lang;
  if (buttonLanguage == "EN") {
    $("button[class*='en_translator']").addClass("active");
    $("button[class*='zh_translator']").removeClass("active");
  } else {
    $("button[class*='en_translator']").removeClass("active");
    $("button[class*='zh_translator']").addClass("active");
  }
  //Get Current page for easy access page reload
  $('.iframePath').on('click', function () {
    window.localStorage.iframePath = $(this).attr('href');
  });
  if (window.localStorage.iframePath != "") {
    Home.loadIframe(window.localStorage.iframePath);
  }
});
