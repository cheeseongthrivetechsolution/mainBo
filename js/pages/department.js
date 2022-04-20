//Department page function declaration
const Department = {
  getDepartmentList : function(){
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    var result;
    $.ajax({
        url: API_ENDPOINT + "department/getDepartmentList",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200) {
              // Department.drawTable(data.row);
            }
        },
        error: function(data) {
          console.log(data);
        }
    });

    return result;
  },
  // drawTable : function(data){
  //   var table = $('#example').DataTable();
  //   table.clear().draw();
  //   data.forEach(function(row) {
  //     table.row.add( {
  //         "name":       "Tiger Nixon",
  //         "position":   "System Architect",
  //         "salary":     "$3,120",
  //         "start_date": "2011/04/25",
  //         "office":     "Edinburgh",
  //         "extn":       "5421",
  //         "extn":       "5421"
  //     } ).draw();
  //   });
  // },
}

$(function() {
  Department.getDepartmentList();
});
