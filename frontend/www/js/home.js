angular.module('gridctrl', ['ui.router', 'ngRoute','ngMaterial'])

.controller('gridctrl', function ($scope, $location, $window, $http, $rootScope) {          //GRID CONTROLLER
  
  
  // $scope.mobile = $rootScope.mobile;
  // $scope.desk = $rootScope.desk;

  $rootScope.showloader = true;
  // myutils.showWait();
  // window.open('home.html?' + name + '&' + id + '&1', '_parent');
  $scope.showmsg = false;
  $rootScope.showpageno = true;

  $scope.sort_options = ["High to Low", "Low to High", "Best Seller", "Newest First"];
  // $rootScope.filters=$location.absUrl().split('?')[1].split('&&')[1];;
  // $scope.filters=$rootScope.filters;
  console.log("from out" + $rootScope.filters);
  $scope.sortby = "";
  $scope.order = "";
  $rootScope.images = [];
  $rootScope.imgpath = imgpath;
  $scope.cat_name = $rootScope.main_category_name;
  $scope.id = $rootScope.id;
  $scope.selectedcolor = [];
  $scope.selectedfabric = [];
  // $scope.discountfrom;
  // $scope.discountto;
  // $scope.price_from;
  // $scope.price_to;


  



  try {
    var url = $location.absUrl().split('?')[1].split('&');
    console.log(url.length);
    if(url.length < 3)
    {
    
      alert("url"+url[2]);
      // alert("error");
      // window.open('../index.html', '_parent');
     
        $scope.showmsg = true;
        $rootScope.showpageno = false;
        console.log($rootScope.showpageno);
        // $scope.showpagenumber = false;
      
    }
    // if(url[2] == '')
    //   {
    //     $scope.showmsg = true;
    //     $rootScope.showpageno = false;
    //   }
    //alert(url);
  }
  catch (e) {
    $scope.showmsg = true;
    $rootScope.showpageno = false;

    // window.open('../index.html', '_parent');

  }
  
  if(url[2] == '')
    {
      $scope.showmsg = true;
      $rootScope.showpageno = false;
    }
  // alert(url);

//if length of url is more than three..it means there is  something appended (filter or orderby) 
// start 
  if (url.length > 3) {

    try{
    //var url = $location.absUrl().split('?')[1].split('&&')[0].split('&');
    $scope.filterurl = $location.absUrl().split('?')[1].split('&&')[1];
    $rootScope.filterurl = $scope.filterurl;
    //alert($scope.filterurl);
    var x = $scope.filterurl.split('&');
    //alert(x);
    $scope.filters = "";
    for (i = 0; i < x.length; i++) {
      if (angular.lowercase(x[i].split('=')[0]) == "color" || angular.lowercase(x[i].split('=')[0]) == "fabric") {

        if ($scope.filters != undefined && $scope.filters != "") {

          $scope.filters = $scope.filters + '&' + x[i];
          $rootScope.filters = $scope.filters;
          console.log($rootScope.filters);
          // document.getElementById(x[i]+"").style.listStyle = "disc";

        }
        else {
          $scope.filters = '&' + x[i];
          $rootScope.filters = $scope.filters;
          console.log($rootScope.filters);
          // document.getElementById(x[i]+"").style.listStyle = "disc";


        }

      }
      if (angular.lowercase(x[i].split('=')[0]) == "discount_from") {
        $scope.discountfrom = '&' + x[i];
        $scope.discountto = '&' + x[i + 1];
        $rootScope.discountfrom = $scope.discountfrom;
        $rootScope.discountto = $scope.discountto;

        $scope.disc_filter = '&' + x[i] + '&' + x[i + 1];
        $rootScope.disc_filter = $scope.disc_filter;
      }
      if (angular.lowercase(x[i].split('=')[0]) == "price_from") {
        $scope.pricefrom = '&' + x[i];
        $scope.priceto = '&' + x[i + 1];
        $rootScope.pricefrom = $scope.pricefrom;
        $rootScope.priceto = $scope.priceto;
        $scope.price_filter = '&' + x[i] + '&' + x[i + 1];
        $rootScope.price_filter = $scope.price_filter;
      }
      if (angular.lowercase(x[i].split('=')[0]) == "orderby") {
        $scope.orderby = '&' + x[i];
        //alert( document.getElementById("sorting").setAttribute("selected","selected"));
        $rootScope.orderby = $scope.orderby;
        $scope.sorting = angular.lowercase(x[i].split('=')[1]);
        // document.getElementById("sorting").value = angular.lowercase(x[i].split('=')[1]);

      }

    }


    for (i = 0; i < x.length; i++) {
      if (angular.lowercase(x[i].split('=')[0]) == "color") {
        var tempcolor = x[i].split('=')[1];
        var a = $scope.selectedcolor.indexOf(tempcolor);

        if (a > -1) {
          $scope.selectedcolor.splice(a, 1);
        }
        else {

          $scope.selectedcolor.push(tempcolor);

          //console.log($scope.filt+tempcolor);
          var a = 'filt' + tempcolor;

          console.log(a);
console.log("this is tempcolor : "+tempcolor);
          $scope[a] = true;
          // console.log(document.getElementById(tempcolor));

          //here here
          //  document.getElementById("yellow").style.listStyle = "disc";

          console.log($scope[a]);


        }

      }
      if (angular.lowercase(x[i].split('=')[0]) == "fabric") {
        var tempfabric = x[i].split('=')[1];
        var b = $scope.selectedfabric.indexOf(tempfabric);
        if (b > -1) {
          $scope.selectedfabric.splice(b, 1);
        }
        else {

          $scope.selectedfabric.push(tempfabric);
          // document.getElementById(tempfabric).style.listStyle = "disc";

          var b = 'filt' + tempfabric;
          console.log(b);
          // document.getElementById(tempfabric+"").style.listStyle = "disc";

          $scope[b] = true;

          console.log($scope[b]);

        }

      }




    }
  }
  catch
  {

    // alert("error");
    // window.open('../index.html', '_parent');
      $scope.showmsg = true;
      $rootScope.showpageno = false;

      // $scope.showpagenumber = false;

    


  }
  }
//end

  // if sorting is not defined before than here it will be defined and "none" will be assigned to it.

  console.log($scope.sorting);
  if($scope.sorting == undefined)
  {
    $scope.sorting = "none";

  }


  console.log(document.getElementsByName('filt' + $scope.selectedcolor));

  for (var i = 0; i < $scope.selectedcolor.length; i++) {

    console.log(document.getElementsByName('filt' + $scope.selectedcolor));
    var q = document.getElementsByTagName("md-checkbox");
    console.log(q);

    // console.log("yeah");

  }


  var data = $.param({
    //  fName: $scope.firstName,
    //  lName: $scope.lastName
  });

  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate'
    }
  }


  $http.get(servicepath + '/getCategoryBgImg?cat_id=' + url[1] , data, config)

  .success(function (data, status, headers, config) {
    // console.log(data);

    $scope.wall_imgpath= data.imgpath;
    $scope.category_name = data.category_name;

  })
  .error(function (data, status, header, config) {
    $scope.ResponseDetails = "Data: " + data +
      "<hr />status: " + status +
      "<hr />headers: " + header +
      "<hr />config: " + config;
    console.log("fail");
    // myutils.hideWait();
    // alert("pachi aavjo");


  });












  // console.log(x);
if($rootScope.showpageno == true)
{
  url[2] = parseInt(url[2]) - 1;
  console.log("this is url" + url);
  // console.log("this is filterurl " +$scope.filterurl);

  $rootScope.main_category_name = url[0];
  $rootScope.id = url[1];



  var data = $.param({
    //  fName: $scope.firstName,
    //  lName: $scope.lastName
  });

  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate'
    }
  }

  //  $http.post('http://192.168.1.23:8080/demo/khadisutra/controller/getAllProducts', data, config)
  //  .success(function (data, status, headers, config) {
  //      $scope.PostDataResponse = data;
  //  })
  if ($scope.filterurl != undefined && $scope.filterurl != "") {
    console.log(servicepath + '/getNumberOfPages?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=0' + '&&' + $scope.filterurl);

    $http.get(servicepath + '/getNumberOfPages?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=0' + '&&' + $scope.filterurl, data, config)

      .success(function (data, status, headers, config) {
        console.log(data);
        console.log("above" + $rootScope.showpageno);

        $rootScope.showpageno = true;
        console.log("below" + $rootScope.showpageno);

        if (data.length < 1) {


          $rootScope.showpageno = false;
          console.log($rootScope.showpageno);

        }
        console.log($rootScope.showpageno);

        var pages;
        $rootScope.pages = data.length;
        pages = $rootScope.pages;
        console.log(pages);
        console.log("success");


      })
      .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        console.log("fail");
        // myutils.hideWait();
        // alert("pachi aavjo");


      });


  }
  else {

    console.log(servicepath + '/getNumberOfPages?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=0');

    $http.get(servicepath + '/getNumberOfPages?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=0', data, config)

      .success(function (data, status, headers, config) {
        console.log(data);
        $rootScope.showpageno = true;
        console.log($rootScope.showpageno);

        if (data.length < 1) {

          $rootScope.showpageno = false;
          console.log($rootScope.showpageno);


        }
        var pages;
        $rootScope.pages = data.length;
        pages = $rootScope.pages;
        console.log(pages);
        console.log("success");


      })
      .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        console.log("fail");
        // myutils.hideWait();
        // alert("pachi aavjo");


      });
  }
  var data = $.param({
    //  fName: $scope.firstName,
    //  lName: $scope.lastName
  });

  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json'
    }
  }

  //  $http.post('http://192.168.1.23:8080/demo/khadisutra/controller/getAllProducts', data, config)
  //  .success(function (data, status, headers, config) {
  //      $scope.PostDataResponse = data;
  //  })


  $http.get(servicepath + '/getDistinctcolorandfabric?main_category=' + url[0] + '&cat_id=' + url[1], data, config)

    .success(function (data, status, headers, config) {
      console.log(data);
      $scope.colors = data.color;
      // console.log($scope.colors);
      $scope.fabrics = data.fabric;


      // var pages;
      // $rootScope.pages = data;
      // pages=$scope.pages;
      // console.log(pages);
      console.log("success color");


    })
    .error(function (data, status, header, config) {
      $scope.ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
        "<hr />headers: " + header +
        "<hr />config: " + config;
      console.log("fail");
      // myutils.hideWait();
      // alert("pachi aavjo");


    });

  if (url.length > 3) {
    var data = $.param({
    });

    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json'
      }
    }

    //console.log(servicepath + '/filter?main_category=' + $scope.cat_name + '&cat_id=' + $scope.id + '&page_no=0' + $scope.querycolor + '' + $scope.queryfabric+''+$scope.discountfrom+''+$scope.discountto+''+$scope.price_from+''+$scope.price_to);
    console.log(servicepath + '/filter?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=' + url[2] + '&&' + $scope.filterurl);

    // $http.get(servicepath + '/filter?main_category=' + $scope.cat_name + '&cat_id=' + $scope.id + '&page_no=0' + $scope.querycolor + '' + $scope.queryfabric+''+$scope.discountfrom+''+$scope.discountto+''+$scope.price_from+''+$scope.price_to, data, config)

    $http.get(servicepath + '/filter?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=' + url[2] + '&&' + $scope.filterurl, data, config)


      .success(function (data, status, headers, config) {
        console.log(data);
        angular.element(document).ready(function () {
          $('#loader').css('display','none');
        });
        
        $rootScope.images = data;
        if (data.length == 0) {
          $scope.showmsg = true;
          $rootScope.showpageno = false;



        }
        console.log($rootScope.images);


        // var pages;
        // $rootScope.pages = data;
        // pages=$scope.pages;
        // console.log(pages);
        console.log("success");
        $rootScope.currentPage = url[2] + 1;
        
        $rootScope.showloader = false;


      })
      .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        console.log("fail");
        // myutils.hideWait();
        // alert("pachi aavjo"); 




      });
  }
  else {
    var data = $.param({
    });

    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json'
      }
    }

    console.log(servicepath + '/filter?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=' + url[2]);

    $http.get(servicepath + '/filter?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=' + url[2], data, config)

      .success(function (data, status, headers, config) {
        console.log(data);
        angular.element(document).ready(function () {
          $('#loader').css('display','none');
        });
        // $('#loader').css('display','none');
        $rootScope.images = data;
        // angular.element(document).ready(function () {

        // });
        if (data.length == 0) {
          $rootScope.showpageno = false;
          $scope.showmsg = true;
          // $scope.showpagenumber = false;

        }
        console.log($rootScope.images);


        // var pages;
        // $rootScope.pages = data;
        // pages=$scope.pages;
        // console.log(pages);
        console.log("success");
        $rootScope.currentPage = url[2] + 1;
         $rootScope.showloader = false;


      })
      .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        console.log("fail");
        // myutils.hideWait();
        // alert("pachi aavjo"); 




      });

  }
}
  // angular.element(document).ready(function () {
    // $rootScope.showloader = false;
    // });  
  $scope.toggle = function (item, list) {

    var id = $rootScope.id;
    var cat = $rootScope.main_category_name;
    var idx = list.indexOf(item);

    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {

      list.push(item);


    }

    var querycolor;
    var queryfabric;
    var flagcolor = 0;
    var flagfabric = 0;
    $scope.querycolor = $scope.selectedcolor.join("&color=");
    if ($scope.querycolor.length > 0) {
      $scope.querycolor = '&color=' + $scope.querycolor;
      flagcolor = 1;
    }
    $scope.queryfabric = $scope.selectedfabric.join("&fabric=");
    if ($scope.queryfabric.length > 0) {
      $scope.queryfabric = '&fabric=' + $scope.queryfabric;
      flagfabric = 1;

    }
    console.log("color " + flagcolor);
    console.log("fabric " + flagfabric);
    console.log("discount " + $scope.disc_filter);
    console.log("proce " + $scope.price_filter);

    if (flagcolor == 1 || flagfabric == 1 || ($scope.disc_filter != "" && $scope.disc_filter != undefined) || ($scope.price_filter != "" && $scope.price_filter != undefined) || ($rootScope.orderby != undefined && $rootScope.orderby != "")) {


      // console.log("reached in if");
      $scope.filters = $scope.querycolor + '' + $scope.queryfabric;
      $rootScope.filters = $scope.filters;

      //$rootScope.filters=$scope.filters;
      console.log($rootScope.filters);
      query = 'home.html?' + cat + '&' + id + '&1&';
      if ($scope.filters != undefined && $scope.filters != "") {
        query = query + $scope.filters;
        //        


      }

      if ($scope.disc_filter != undefined && $scope.disc_filter != "") {
        $scope.disc_filter = $rootScope.disc_filter;
        query = query + $scope.disc_filter;

      }
      if ($scope.price_filter != undefined && $scope.price_filter != "") {
        $scope.price_filter = $rootScope.price_filter;

        query = query + $scope.price_filter;

      }
      if ($rootScope.orderby != undefined && $rootScope.orderby != "none") {
        // alert("reached");
        $scope.orderby = $rootScope.orderby;

        query = query + $scope.orderby;

      }

      console.log(query);

      window.open(query, '_parent');


    }

    else {
      console.log("zero");
      window.open('home.html?' + cat + '&' + id + '&1', '_parent');

    }

  };

  $scope.mobile_toggle = function (item, list) {

    var id = $rootScope.id;
    var cat = $rootScope.main_category_name;
    var idx = list.indexOf(item);

    $scope.temp = 0;
    if (idx > -1) {
      list.splice(idx, 1);
      // document.getElementById(item).style.color = "unset";
      // document.getElementById(item).style.listStyleType = "none";
      // document.getElementById(item).style.listStyle = "none";
      document.getElementById(item).style.color = "black";


    }
    else {

      // document.getElementById(item).style.color = "red";
      // document.getElementById(id).style.listStyleType = "disc";
      // document.getElementById(item).style.listStyle = "disc";
      document.getElementById(item).style.color = "firebrick";

      list.push(item);


    }

    var querycolor;
    var queryfabric;
    var flagcolor = 0;
    var flagfabric = 0;
    $scope.querycolor = $scope.selectedcolor.join("&color=");
    if ($scope.querycolor.length > 0) {
      $scope.querycolor = '&color=' + $scope.querycolor;
      flagcolor = 1;
    }
    $scope.queryfabric = $scope.selectedfabric.join("&fabric=");
    if ($scope.queryfabric.length > 0) {
      $scope.queryfabric = '&fabric=' + $scope.queryfabric;
      flagfabric = 1;

    }
    console.log("color " + flagcolor);
    console.log("fabric " + flagfabric);
    console.log("discount " + $scope.disc_filter);
    console.log("proce " + $scope.price_filter);

    if (flagcolor == 1 || flagfabric == 1 || ($scope.disc_filter != "" && $scope.disc_filter != undefined) || ($scope.price_filter != "" && $scope.price_filter != undefined) || ($rootScope.orderby != undefined && $rootScope.orderby != "")) {


      // console.log("reached in if");
      $scope.filters = $scope.querycolor + '' + $scope.queryfabric;
      $rootScope.filters = $scope.filters;

      //$rootScope.filters=$scope.filters;
      console.log($rootScope.filters);
      query = 'home.html?' + cat + '&' + id + '&1&';
      if ($scope.filters != undefined && $scope.filters != "") {
        query = query + $scope.filters;
        //        


      }

      if ($scope.disc_filter != undefined && $scope.disc_filter != "") {
        $scope.disc_filter = $rootScope.disc_filter;
        query = query + $scope.disc_filter;

      }
      if ($scope.price_filter != undefined && $scope.price_filter != "") {
        $scope.price_filter = $rootScope.price_filter;

        query = query + $scope.price_filter;

      }
      if ($rootScope.orderby != undefined && $rootScope.orderby != "none") {
        // alert("reached");
        $scope.orderby = $rootScope.orderby;

        query = query + $scope.orderby;

      }

      $scope.temp = 1;
      console.log(query);

      // window.open(query, '_parent');


    }

    else {
      $scope.temp = 0;

      console.log("zero");
      //window.open('home.html?' + cat + '&' + id + '&1', '_parent');

    }

  };
  $scope.executefilter = function () {
    var id = $rootScope.id;
    var cat = $rootScope.main_category_name;
    if ($scope.temp == 1) {
      window.open(query, '_parent');

    }
    else {
      window.open('home.html?' + cat + '&' + id + '&1', '_parent');
    }
  };

  $scope.filter_two = function (valuefrom, valueto, filteroption) {
    if ($scope.filters != undefined) {
      $scope.filters = $rootScope.filters;

      console.log($scope.filters);
    }
    var id = $rootScope.id;
    var cat = $rootScope.main_category_name;
    console.log(id);
    console.log("fopriotn" + filteroption);


    if (filteroption == "discount") {
      // $scope.discountfrom = $rootScope.discountfrom;
      // $scope.discountto =  $rootScope.discountto;
      // $scope.pricefrom = $rootScope.pricefrom;
      // $scope.priceto = $rootScope.priceto;

      if ($rootScope.discountfrom == undefined) {

        $scope.discountfrom = '&discount_from=' + valuefrom;
        $rootScope.discountfrom = $scope.discountfrom;
        $scope.discountto = '&discount_to=' + valueto;
        $rootScope.discountto = $scope.discountto;

        $scope.disc_filter = $scope.discountfrom + $scope.discountto;
        $rootScope.disc_filter = $scope.disc_filter;
        console.log($rootScope.discountfrom);

      }
      else {
        if ($rootScope.discountfrom != undefined && $rootScope.discountfrom != '&discount_from=' + valuefrom) {
          //$scope.discountfrom = $rootScope.discountfrom;
          $scope.discountfrom = '&discount_from=' + valuefrom;
          $scope.discountto = '&discount_to=' + valueto;
          $rootScope.discountfrom = $scope.discountfrom;
          $rootScope.discountto = $scope.discountto;
          $scope.disc_filter = $scope.discountfrom + $scope.discountto;
          $rootScope.disc_filter = $scope.disc_filter;
          console.log("if");


        }
        else {
          $scope.discountfrom = "";
          $scope.discountto = "";
          $rootScope.discountfrom = $scope.discountfrom;
          $rootScope.discountto = $scope.discountto;

          $scope.disc_filter = $scope.discountfrom + $scope.discountto;
          $rootScope.disc_filter = $scope.disc_filter;
          console.log("else");

        }
      }


    }
    if (filteroption == "price") {

      // $scope.discountfrom = $rootScope.discountfrom;
      // $scope.discountto =  $rootScope.discountto;
      // $scope.pricefrom = $rootScope.pricefrom;
      // $scope.priceto = $rootScope.priceto;

      if ($rootScope.pricefrom == undefined) {

        $scope.pricefrom = '&price_from=' + valuefrom;
        $rootScope.pricefrom = $scope.pricefrom;
        $scope.priceto = '&price_to=' + valueto;
        $rootScope.priceto = $scope.priceto;

        $scope.price_filter = $scope.pricefrom + $scope.priceto;
        $rootScope.price_filter = $scope.price_filter;
        console.log($rootScope.pricefrom);

      }
      else {
        if ($rootScope.pricefrom != undefined && $rootScope.pricefrom != '&price_from=' + valuefrom) {
          //$scope.discountfrom = $rootScope.discountfrom;
          $scope.pricefrom = '&price_from=' + valuefrom;
          $scope.priceto = '&price_to=' + valueto;
          $rootScope.pricefrom = $scope.pricefrom;
          $rootScope.priceto = $scope.priceto;
          $scope.price_filter = $scope.pricefrom + $scope.priceto;
          $rootScope.price_filter = $scope.price_filter;
          console.log("if");


        }
        else {
          $scope.pricefrom = "";
          $scope.priceto = "";
          $rootScope.pricefrom = $scope.pricefrom;
          $rootScope.priceto = $scope.priceto;
          $scope.price_filter = $scope.pricefrom + $scope.priceto;
          $rootScope.price_filter = $scope.price_filter;
          console.log("else");

        }
      }

    }


    var flag = 0;
    query = 'home.html?' + cat + '&' + id + '&1&';
    if ($scope.filters != undefined && $scope.filters != "") {
      query = query + $scope.filters;
      //        
      flag = 1;
      console.log("1");
      $rootScope.filters = $scope.filters;
      console.log($rootScope.filters);


    }
    if ($scope.disc_filter != undefined && $scope.disc_filter != "") {
      query = query + $scope.disc_filter;
      flag = 1;
      console.log("2");



    }
    if ($scope.price_filter != undefined && $scope.price_filter != "") {
      query = query + $scope.price_filter;
      flag = 1;
      console.log("3");



    }
    if ($rootScope.orderby != undefined && $rootScope.orderby != "none") {
      $scope.orderby = $rootScope.orderby;
      flag = 1;
      query = query + $scope.orderby;

    }
    if (flag == 0) {
      query = 'home.html?' + cat + '&' + id + '&1';
    }
    $rootScope.price_filter = $scope.price_filter;
    $rootScope.disc_filter = $scope.disc_filter;

    console.log(query);
    window.open(query, '_parent');
  };









  // mobile filter two start






  $scope.mobile_filter_two = function (valuefrom, valueto, filteroption) {
    if ($scope.filters != undefined) {
      $scope.filters = $rootScope.filters;

      console.log($scope.filters);
    }
    var id = $rootScope.id;
    var cat = $rootScope.main_category_name;
    console.log(id);
    console.log("fopriotn" + filteroption);


    if (filteroption == "discount") {
      // $scope.discountfrom = $rootScope.discountfrom;
      // $scope.discountto =  $rootScope.discountto;
      // $scope.pricefrom = $rootScope.pricefrom;
      // $scope.priceto = $rootScope.priceto;

      if ($rootScope.discountfrom == undefined) {

        $scope.discountfrom = '&discount_from=' + valuefrom;
        $rootScope.discountfrom = $scope.discountfrom;
        $scope.discountto = '&discount_to=' + valueto;
        $rootScope.discountto = $scope.discountto;

        $scope.disc_filter = $scope.discountfrom + $scope.discountto;
        $rootScope.disc_filter = $scope.disc_filter;
        console.log($rootScope.discountfrom);


      }
      else {
        if ($rootScope.discountfrom != undefined && $rootScope.discountfrom != '&discount_from=' + valuefrom) {
          //$scope.discountfrom = $rootScope.discountfrom;
          $scope.discountfrom = '&discount_from=' + valuefrom;
          $scope.discountto = '&discount_to=' + valueto;
          $rootScope.discountfrom = $scope.discountfrom;
          $rootScope.discountto = $scope.discountto;
          $scope.disc_filter = $scope.discountfrom + $scope.discountto;
          $rootScope.disc_filter = $scope.disc_filter;
          console.log("if");


        }
        else {
          $scope.discountfrom = "";
          $scope.discountto = "";
          $rootScope.discountfrom = $scope.discountfrom;
          $rootScope.discountto = $scope.discountto;

          $scope.disc_filter = $scope.discountfrom + $scope.discountto;
          $rootScope.disc_filter = $scope.disc_filter;
          console.log("else");

        }
      }


    }
    if (filteroption == "price") {

      // $scope.discountfrom = $rootScope.discountfrom;
      // $scope.discountto =  $rootScope.discountto;
      // $scope.pricefrom = $rootScope.pricefrom;
      // $scope.priceto = $rootScope.priceto;

      if ($rootScope.pricefrom == undefined) {

        $scope.pricefrom = '&price_from=' + valuefrom;
        $rootScope.pricefrom = $scope.pricefrom;
        $scope.priceto = '&price_to=' + valueto;
        $rootScope.priceto = $scope.priceto;

        $scope.price_filter = $scope.pricefrom + $scope.priceto;
        $rootScope.price_filter = $scope.price_filter;
        console.log($rootScope.pricefrom);

      }
      else {
        if ($rootScope.pricefrom != undefined && $rootScope.pricefrom != '&price_from=' + valuefrom) {
          //$scope.discountfrom = $rootScope.discountfrom;
          $scope.pricefrom = '&price_from=' + valuefrom;
          $scope.priceto = '&price_to=' + valueto;
          $rootScope.pricefrom = $scope.pricefrom;
          $rootScope.priceto = $scope.priceto;
          $scope.price_filter = $scope.pricefrom + $scope.priceto;
          $rootScope.price_filter = $scope.price_filter;
          console.log("if");


        }
        else {
          $scope.pricefrom = "";
          $scope.priceto = "";
          $rootScope.pricefrom = $scope.pricefrom;
          $rootScope.priceto = $scope.priceto;
          $scope.price_filter = $scope.pricefrom + $scope.priceto;
          $rootScope.price_filter = $scope.price_filter;
          console.log("else");

        }
      }

    }


    var flag = 0;
    query = 'home.html?' + cat + '&' + id + '&1&';
    if ($scope.filters != undefined && $scope.filters != "") {
      query = query + $scope.filters;
      //        
      flag = 1;
      console.log("1");
      $rootScope.filters = $scope.filters;
      console.log($rootScope.filters);


    }
    if ($scope.disc_filter != undefined && $scope.disc_filter != "") {
      query = query + $scope.disc_filter;
      flag = 1;
      console.log("2");



    }
    if ($scope.price_filter != undefined && $scope.price_filter != "") {
      query = query + $scope.price_filter;
      flag = 1;
      console.log("3");



    }
    if ($rootScope.orderby != undefined && $rootScope.orderby != "none") {
      $scope.orderby = $rootScope.orderby;
      flag = 1;
      query = query + $scope.orderby;

    }
    if (flag == 0) {
      query = 'home.html?' + cat + '&' + id + '&1';
    }
    $rootScope.price_filter = $scope.price_filter;
    $rootScope.disc_filter = $scope.disc_filter;

    console.log(query);
    // window.open(query, '_parent');
    $scope.temp = 1;




  };



    // onchange filter start 
  
  
  
  
  
    $scope.onChange = function () {
      if ($scope.filters != undefined) {
        $scope.filters = $rootScope.filters;
  
        console.log($scope.filters);
      }
  
      var id = $rootScope.id;
      var cat = $rootScope.main_category_name;
      var flag = 0;
      query = 'home.html?' + cat + '&' + id + '&1&';
      if ($scope.filters != undefined && $scope.filters != "") {
        query = query + $scope.filters;
        //        
        flag = 1;
        console.log("1");
        $rootScope.filters = $scope.filters;
        console.log($rootScope.filters);
  
  
      }
      if ($scope.disc_filter != undefined && $scope.disc_filter != "") {
        query = query + $scope.disc_filter;
        flag = 1;
        console.log("2");
        $rootScope.disc_filter = $scope.disc_filter;
  
  
  
  
      }
      if ($scope.price_filter != undefined && $scope.price_filter != "") {
        query = query + $scope.price_filter;
        flag = 1;
        console.log("3");
        $rootScope.price_filter = $scope.price_filter;
  
  
  
  
      }
      if (this.sorting != 'none') {
        // alert("none");
        $scope.orderby = '&orderby=' + this.sorting;
        query = query + $scope.orderby;
        $rootScope.orderby = $scope.orderby;
        flag = 1;
      }
  
      if (flag == 0) {
        query = 'home.html?' + cat + '&' + id + '&1';
      }
      // if (flag == 0) {
      //   query = 'home.html?' + cat + '&' + id + '&1';
      // }
  
  
      console.log(query);
      window.open(query, '_parent');
      $scope.temp = 1;
  
  
  
  
  
    };


  $scope.colorfilter = function (i) {

    var data = $.param({
      //  fName: $scope.firstName,
      //  lName: $scope.lastName
    });

    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json'
      }
    }

    //  $http.post('http://192.168.1.23:8080/demo/khadisutra/controller/getAllProducts', data, config)
    //  .success(function (data, status, headers, config) {
    //      $scope.PostDataResponse = data;
    //  })

    console.log(i);
    var query;
    // if()
    // {



    // }
    $http.get(servicepath + '/filter?main_category=' + cat_name + '&cat_id=' + id + '&page_no=0' + query, data, config)

    $http.get(servicepath + '/filter?main_category=' + cat_name + '&cat_id=' + id + '&page_no=0&color=' + i, data, config)

      .success(function (data, status, headers, config) {
        console.log(data);

        $rootScope.images = data;
        console.log($rootScope.images);


        // var pages;
        // $rootScope.pages = data;
        // pages=$scope.pages;
        // console.log(pages);
        console.log("success");


      })
      .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        console.log("fail");
        // myutils.hideWait();
        // alert("pachi aavjo"); 




      });

  };
  $scope.opencard = function (ev) {            //start

    console.log(ev);

    // $scope.dilog="dilog1.tmpl.html";
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'filterdialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true                                         //this code is for login popup
    })
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };
    // $scope.path="../image/"+$scope.i.display_photo;
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };
    //end


  };
  $scope.status = '  ';
  var userdata = this;
  userdata.array = [];
  
  $scope.openDialog = function ($event) {
    $mdDialog.show({
      controller: function ($timeout, $q, $scope, $mdDialog) {
        var userdata = this;
        $scope.cancel = function ($event) {
          $mdDialog.cancel();
        };
        $scope.finish = function ($event) {
          $mdDialog.hide();
        };
        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
        //   $scope.validateusername = function (name) {
        //     alert(name);

        // };
      },
      controllerAs: 'gridctrl',
      templateUrl: 'filterdialog.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      locals: { parent: $scope },
    })
      .then(function (answer) {
        if (Object.keys(answer).length > 2) {
          console.log(Object.keys(answer).length)
          console.log(answer)
          userdata.array.push({
            firstname: answer.firstname,
            lastname: answer.lastname,
            username: answer.username,
            password: answer.password,
            conf_password: answer.conf_password,
            phone: answer.phone,
            email: answer.email,



          })
          userdata.username = '';
          userdata.firstname = '';
          userdata.lastname = '';
          userdata.password = '';
          userdata.conf_password = '';
          userdata.phone = '';
          userdata.email = '';
          alert("upr thi" + JSON.stringify(userdata.array));

          userdata.array = [];

          alert(JSON.stringify(userdata.array));
          //alert(userdata.array);
          alert(userdata.array.length);

          var data = $.param({
            // user_id='',
            // pass=''

          });

          var config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
              'Accept': 'application/json'
            }
          }

          //console.log(servicepath + '/filter?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=' + url[2]);

          $http.get(servicepath + '/validateuserlogin', data, config)

            .success(function (data, status, headers, config) {
              console.log(data);



            }


            )
            .error(function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
              console.log("fail");
              // myutils.hideWait();
              // alert("pachi aavjo"); 




            });
        }
        else {
          console.log(Object.keys(answer).length)
          console.log(answer)
          userdata.array.push({

            username: answer.username,
            password: answer.password,

          });




          alert("upr thi" + JSON.stringify(userdata.array));

          userdata.array = [];

          alert(JSON.stringify(userdata.array));            //alert(userdata.array);
          alert(userdata.array.length);

          var data = $.param({
            user_id: answer.username,
            pass: answer.password
          });

          var config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
              'Accept': 'application/json'
            }
          }

          //console.log(servicepath + '/filter?main_category=' + url[0] + '&cat_id=' + url[1] + '&page_no=' + url[2]);

          $http.post(servicepath + '/validateuserlogin', data, config)

            .success(function (data, status, headers, config) {
              console.log(data);



            }


            )
            .error(function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
              console.log("fail");
              // myutils.hideWait();
              // alert("pachi aavjo"); 




            });
          userdata.username = '';
          userdata.password = '';

        }

      })






      ;


  };


 
         
  $scope.openproduct = function (id) {


    // $location.url("webpages/product");
    // var elem = e.srcElement;
    // var idattr = elem.attributes.id;
    // var i = idattr;
    // var i = idattr.nodeValue;
    // console.log(i);
    $scope.id = id;
    console.log("this is id " + id);
    //console.log("id=" + $scope.id);
    //alert(i);
    var name = $rootScope.main_category_name;
    console.log("this is name " + name);
    var categoryharsh = $rootScope;




    window.open('../webpages/product.html?' + name + '&' + url[1] + '&' + id, '_parent');





  };





})



.controller('show', function ($timeout, $scope, $mdDialog, $interval, $location, $window, $http, $rootScope, sharedProperties, localStorageService) {          //show product  CONTROLLER
  $scope.imagepath = imgpath;
  $scope.data_received = false;
  console.log("this is  path" + imgpath);
  // console.log("reached");
  $scope.Answers = {};
  $scope.customize = {};


  // var d = $rootScope.d;
  // console.log(d);
  // var test=sharedProperties.getProperty();
  // console.log(test);

  // $rootScope.i = localStorageService.get('data');
  var url = $location.absUrl().split('?')[1].split('&');

  console.log("this one " + url);
  var data = $.param({
    //  fName: $scope.firstName,
    //  lName: $scope.lastName
    // product_id : url
  });
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json'
    }
  }

  //  $http.post('http://192.168.1.33:8080/new_demo/webapi/myresource/dbdemo', data, config)
  //  .success(function (data, status, headers, config) {
  //      $scope.PostDataResponse = data;
  //  })
  $scope.photos = [];

  $http.get(servicepath + '/getProduct?main_category=' + url[0] + '&p_id=' + url[2], data, config)
    // $http.get('http:localhost:8080/demo/webapi/myresource/dbdemo', data, config)
    .success(function (data, status, headers, config) {

      if (data.length == 0) {

        $scope.l = false;
        alert("The product you are looking for seems to be unavailable right now!!\nEnjoy Shopping! ");
        window.open('../index.html', '_parent');

      }
      else {
        $scope.l = true;
      }

      console.log(data);
      console.log("success");
      $scope.i = data[0];
      $rootScope.path = $scope.i.p_display_photo;

      console.log("i = " + $scope.i.p_photos);
      $scope.photos.push($scope.i.p_display_photo);

      //  $scope.array=data[0].photos.split(',');
      for (i = 0; i < $scope.i.p_photos.length; i++) {
        // $scope.array=data[0].photos.split(',');
        $scope.photos.push($scope.i.p_photos[i]);

      }
      $rootScope.displayimg = data[0].p_display_photo;
      $scope.$watch("photos[i]", function () {

        var swiper = new Swiper('.swiper-container', {
           loop: true,
          spaceBetween: 60,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',

          },
          // pagination: {
          //   el: '.swiper-pagination',
          // },

        });
        console.log("triggered");
         $rootScope.showloader = false;

      });
setTimeout(function(){
        console.log( document.getElementsByClassName('swiper-slide-active')[0].src);
        console.log(document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src);

        // document.getElementsByClassName('swiper-slide-duplicate-active')[0].ngSrc =  document.getElementsByClassName('swiper-slide-active')[0].ngSrc;
        //   document.getElementsByClassName('swiper-slide-duplicate-prev')[0].ngSrc =  document.getElementsByClassName('swiper-slide-prev')[0].ngSrc;
          document.getElementsByClassName('swiper-slide-duplicate-active')[0].src =  document.getElementsByClassName('swiper-slide-active')[0].src;
          document.getElementsByClassName('swiper-slide-prev')[0].src = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src;
        }),1000;



      //console.log("this is"+array[0]+"   "+array[1]);
      // $scope.photos=
      // $scope.imagepath = $rootScope.imagepath;
      //  $scope.imagepath = imgpath;
      //  zoom();
      //  var path =  $scope.imagepath +'/'+ $rootScope.displayimg;


      //  alert(path);
      //  imageZoom("myimage", "myresult",path);
      //  removezoom();
      // $("#loadimage").load("../webpages/display.html");
      // trigger_swipe();  
      //   $scope.$on('finishLoad',function(){
      //     $scope.swiper.update();
      //  })

    })
    .error(function (data, status, header, config) {
      $scope.ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
        "<hr />headers: " + header +
        "<hr />config: " + config;
      console.log("fail");
    });

  var data = $.param({
    //  fName: $scope.firstName,
    //  lName: $scope.lastName
    // product_id : url
  });
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json'
    }
  }
  console.log(servicepath + '/getSizes?cat_id=' + url[1]);
  $http.get(servicepath + '/getSizes?cat_id=' + url[1], data, config)
    // $http.get('http:localhost:8080/demo/webapi/myresource/dbdemo', data, config)
    .success(function (data, status, headers, config) {
      $scope.size = data;
      console.log(data);
      // $scope.size_flag = 1;


      //     console.log("sizes");

    })

    .error(function (data, status, header, config) {
      $scope.ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
        "<hr />headers: " + header +
        "<hr />config: " + config;
      console.log("fail");
    });
  var data = $.param({
    //  fName: $scope.firstName,
    //  lName: $scope.lastName
    // product_id : url
  });
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept': 'application/json'
    }
  }
  console.log(servicepath + '/getCategoryWisePreDefinedMeasurements?cat_id=' + url[1]);
  $http.get(servicepath + '/getCategoryWisePreDefinedMeasurements?cat_id=' + url[1], data, config)
    // $http.get('http:localhost:8080/demo/webapi/myresource/dbdemo', data, config)
    .success(function (data, status, headers, config) {
      //$scope.predef_measurement=data;
      console.log("predef_measurement");


      console.log(data);
      var predef_measurement = [];
      var i;
      for (i = 0; i < data.length; i++) {
        predef_measurement[i] = data[i].pre_mea_name;
        console.log("name" + [i] + ":" + predef_measurement[i]);

      }
      console.log(predef_measurement);
      $rootScope.predef_measurement = predef_measurement;
      var data = $.param({
        //  fName: $scope.firstName,
        //  lName: $scope.lastName
        // product_id : url
      });
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/json'
        }
      }
      console.log(servicepath + '/getCategoryWisePreDefinedSizes?cat_id=' + url[1]);
      $http.get(servicepath + '/getCategoryWisePreDefinedSizes?cat_id=' + url[1], data, config)
        // $http.get('http:localhost:8080/demo/webapi/myresource/dbdemo', data, config)
        .success(function (data, status, headers, config) {
          $scope.predef_sizes = data;
          console.log("predef_size");


          console.log(data);
          var sizelabel = [];
          var i;
          for (i = 0; i < data.length; i++) {
            sizelabel[i] = data[i].pre_size_label;
            console.log("name" + [i] + ":" + sizelabel[i]);

          }
          console.log(sizelabel);

          var sizename = [];
          var i;
          for (i = 0; i < data.length; i++) {
            sizename[i] = data[i].pre_size_name;
            console.log("name" + [i] + ":" + sizename[i]);

          }
          console.log(sizename);



          //var x = test[0];
          //console.log(a['size'][test[0]]);
          var array = [[]];
          console.log(data.length);
          var predef_measurement = $rootScope.predef_measurement;
          console.log("testing" + $scope.predef_measurement);
          for (i = 0; i < data.length; i++) {
            console.log("1st");
            array[i] = [];
            for (j = 0; j < Object.keys(data[i].measurements).length; j++) {
              console.log("in 2nd");
              console.log(data[i].measurements[predef_measurement[j]]);
              // var s=

              array[i][j] = data[i].measurements[predef_measurement[j]];
            }
          }
          $scope.array = array;
          console.log(array);
          if (data.length > 1) {
            $scope.data_received = true;
          }
          console.log("data received" + $scope.data_received);

        })
        .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          console.log("fail");
        });
      var data = $.param({
        //  fName: $scope.firstName,
        //  lName: $scope.lastName
        // product_id : url
      });
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/json'
        }
      }
      console.log(servicepath + '/getstyles?cat_id=' + url[1]);
      $http.get(servicepath + '/getstyles?cat_id=' + url[1], data, config)
        // $http.get('http:localhost:8080/demo/webapi/myresource/dbdemo', data, config)
        .success(function (data, status, headers, config) {
          $scope.styles = data;
          // console.log($scope.styles);
          // console.log($scope.styles[0].style_values[0].name);
          // console.log(Answers[]);
          // document.getElementById($scope.styles[0].style_values[0].name).checked = true;

          // $("input:radio[name="+$scope.styles[0].style_values[0].name+"][disabled=false]:first").attr('checked', true);

        })

        .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          console.log("fail");
        });

    })
    .error(function (data, status, header, config) {
      $scope.ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
        "<hr />headers: " + header +
        "<hr />config: " + config;
      console.log("fail");
    });

  $scope.$watch($scope.predef_sizes, function () {
    if ($(window).width() > 960) {
      $timeout(function () {
        $("#size_chart").each(function () {
          // alert('Less than 960');

          var $this = $(this);
          var newrows = [];
          $this.find("tr").each(function () {
            var i = 0;
            $(this).find("td").each(function () {
              i++;
              if (newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
              newrows[i].append($(this));
            });
          });
          $this.find("tr").remove();
          $.each(newrows, function () {
            $this.append(this);
          });
        });
      }, 1000);

    }
  })
  $scope.check_Size_flag = 0;
$scope.size_not_selected = false;
$scope.size_partially_selected = false;

$scope.height_not_selected = false;

  $scope.ShowAnswers = function () {
    // console.log($scope.Answers[Object.keys($scope.Answers)[0]]);
    // console.log(Object.keys($scope.Answers).length);
    // for (i = 0; i < Object.keys($scope.Answers).length; i++) {
    //   if ($scope.Answers[Object.keys($scope.Answers)[i]] == "select") {   
    //     alert("fill required feild : "+Object.keys($scope.Answers)[i]);  
    //   }
    // }
    $scope.orderdetails = {};


    var error_count = 0;
    // console.log($scope.orderdetails);
    if ($scope.check_Size_flag == 0) {
       alert("Select Size");
      $scope.size_not_selected = true;
      $scope.height_not_selected = true;
      $scope.size_partially_selected= false;

      $('html,body').animate({
        scrollTop: $("#sizealert").offset().top},
        'fast');
      error_count++;


    }
    else {
      if ($scope.check_Size_flag == 1) {
        if ($scope.Answers['height'] == "select") {
          // alert("fill required feild height");
          $scope.size_not_selected = false;
      $scope.height_not_selected = true;
      $scope.size_partially_selected= false;

      $('html,body').animate({
        scrollTop: $("#heightalert").offset().top},
        'fast');
          error_count++;
        }
      }
      if ($scope.check_Size_flag == 2) {
        for (i = 0; i < Object.keys($scope.Answers).length; i++) {
          if ($scope.Answers[Object.keys($scope.Answers)[i]] == "select") {
            // alert("fill required feild : " + Object.keys($scope.Answers)[i]);
            
      if(Object.keys($scope.Answers)[i] != 'height')
      {
        $scope.size_not_selected = false;
        $scope.size_partially_selected= true;
      $scope.height_not_selected = false;
      $('html,body').animate({
        scrollTop: $("#empty_feilds_alert").offset().top},
        'fast');
      }
        if(Object.keys($scope.Answers)[i] == 'height')
        {
          $scope.size_not_selected = false;
          $scope.size_partially_selected= false;

      $scope.height_not_selected = true;
          $('html,body').animate({
            scrollTop: $("#heightalert").offset().top},
            'fast');
        }
            error_count++;

          }
        }
      }
    }
    if (error_count == 0) {
      console.log("added to cart");
      console.log($scope.Answers);
      $scope.size_not_selected = false;
      $scope.height_not_selected = false;
      $scope.size_partially_selected= false;
      var j = 0;

      for (i = 0; i < Object.keys($scope.Answers).length; i = i) {
        key = Object.keys($scope.Answers)[i];
        value = $scope.Answers[Object.keys($scope.Answers)[i]];
        if (value != "select" && value != null && value != undefined) {
          console.log("inside" + key);



          $scope.orderdetails[Object.keys($scope.Answers)[j]] = value;
          Object.keys($scope.orderdetails)[j] = key;

        }
        j = j + 1;

        i = i + 1;
      }
     alert($scope.orderdetails);
      window.open('../webpages/cart.html', '_parent');

    }

    else {
      console.log("NOT added to cart");
      // $scope.size_not_selected = true;
      // $scope.height_not_selected = true;
      // $('html,body').animate({scrollTop: $("#sizealert").offset().top},'slow');
    }

  };


  $scope.display = function (path) {
    console.log(path);

    for (i = 0; i < $scope.photos.length; i++) {
      console.log(i);

      console.log("" + $scope.photos[i]);
      var pic = $scope.photos[i];
      document.getElementById("checkmark" + pic).classList.remove("active");
    }
    document.getElementById("checkmark" + path).classList.add("active");



    $rootScope.displayimg = path;
    zoom();
    var path = imgpath + '/' + $rootScope.displayimg;


    //alert(path);
    imageZoom("myimage", "myresult", path);
    removezoom();



  };


  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  // var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  $scope.viewLarger = function (src) {
    console.log(src);
    console.log($scope.imagepath + "/" + src.id);

    $scope.viewLargerPath = $scope.imagepath + "/" + src.id;
    modal.style.display = "block";
    // document.body.style.overflow = "hidden";
  };

  // When the user clicks on <span> (x), close the modal
  modal.onclick = function () {
    modal.style.display = "none";
    // document.body.style.overflow = "scroll";

  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // $scope.add_to_wishlist = function () {


  //code for the button add to wishlist goes here

  // }

  var mea_flag = 0;
  $scope.changed = function (i) {
    console.log(i);

    console.log($scope.Answers);

  };
  $scope.setDefault = function (val) {
    // console.log(mea_flag); 
    //   console.log($scope.predef_sizes);
    //   console.log($scope.size);
    if (val == 0 && mea_flag == 0) {
      mea_flag = 1;
      for (i = 0; i < $scope.size.length; i++) {
        // document.getElementById($scope.size[i].size_id).checked = false;
        // console.log($scope.Answers[$scope.size[i].size_id+""]);
        $scope.Answers[$scope.size[i].size_id + ""] = "select";
        // document.getElementById("m"+$scope.size[i].size_id).selectedIndex = 1;

        // console.log($scope.Answers);

        //  $('#scope.size[i].size_id').prop('selectedIndex',0);
        //  console.log(document.getElementById($scope.size[i].size_id));
        // console.log($scope.size[i].size_id);
      }
      mea_flag = 0;
      $scope.check_Size_flag = 1;

    }
    else{
    if (val == 1 && mea_flag == 0) {
      mea_flag = 1;
      for (i = 0; i < $scope.predef_sizes.length; i++) {
        // console.log($scope.predef_sizes[i].pre_size_id);
        // console.log(document.getElementById($scope.predef_sizes[i].pre_size_id));

        document.getElementById($scope.predef_sizes[i].pre_size_id).checked = false;
        $scope.Answers['presize'] = null;
      }
      mea_flag = 0;
      $scope.check_Size_flag = 2;
    }
    // I in predef_sizes
    // I.pre_size_id
    //   var elements = document.getElementById("ddBusinessCategory").options;

    //   for(var i = 0; i < elements.length; i++){
    //     elements[i].selected = false;
    //   }

  }
  };

  $scope.tileSelected = function (val) {

    // get elements by class name 
    // remove class active 
    // and add to getElementById val


  };

  $scope.opencart = function () {

    window.open('../webpages/cart.html', '_parent');


  };



})