//Common use function declaration
const Common = {
  readTextFile: function(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
  },
  translation: function () {
    var lang = config.lang.toLowerCase();
    Common.readTextFile("../../translate/"+lang+".json", function(text){
        var data = JSON.parse(text);
        $('.translation').each(function(index,element){
          var element = $(this);
          if( element.is('input') || element.is('textarea')) {
              $(this).attr("placeholder",data[$(this).attr('key')]);
            } else {
              $(this).text(data[$(this).attr('key')]);
            }
        });
        if ($('#contentIframe').length) {
          $('#contentIframe').contents().find('.translation').each(function(){
            var element = $(this);
            if( element.is('input') || element.is('textarea')) {
                $(this).attr("placeholder",data[$(this).attr('key')]);
              } else {
                $(this).text(data[$(this).attr('key')]);
              }
          });
        }
    });
  },
  parseObj: function (jsondata) {
    var data = null;
    if(typeof jsondata != "object") {
        data = JSON.parse(jsondata);
    } else {
        data = JSON.stringify(jsondata);
        data = JSON.parse(data);
    }
    return data;
  },
  skipIndex: function (data) {
    if(data.code == 401) {
      alert(data.msg)
  	  localStorage.clear();
      parent.location.href = "../../index.html";
    }
  },
  getToken: function () {
    return window.localStorage.token == undefined ? "" : window.localStorage.token;
  },
  popSnack: function (cls) {
    var x = document.getElementById("snackbar");
    x.className = "show "+cls;
    setTimeout(function(){
       x.className = x.className.replace("show", "");
     }, 3000);
  },
  addAlert: function (message,code) {
    if ($('#snackbar').length > 0) {
      $('#snackbar').remove();
    }
    var cls = "bg-success";
    if (code == "500" || code == "401")
      cls = "bg-danger";
    var snackbar = '<div id="snackbar">'+message+'</div>';
    $('body').append(snackbar);
    Common.popSnack(cls);
  },
  setLanguage: function (lang) {
      localStorage.setItem('language', lang);
      config.lang = lang;
  },
  getLanguage: function () {
    localStorage.getItem('language') == null ? Common.setLanguage('ZH') : false;
  	config.lang = localStorage.getItem('language');
  },
};
