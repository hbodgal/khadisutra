//var servicepath = "http://192.168.1.12:8080/khadi/webapi/controller";
//var imgpath = "http://192.168.1.12:8081/image/photos";
   var servicepath = "http://localhost:8080/khadi/webapi/controller";
//  var imgpath = "http://192.168.0.100:8083/photos";
// var servicepath = "http://localhost:8080/khadi/webapi/controller";
var imgpath = "http://localhost:8083/";

angular
  .module('MyApp', ['ui.router', 'ngRoute','checkoutCtrl','gridctrl','show'])
  .config(function($stateProvider) {
    var indexState = {
      name: 'index',
      url: '/index',
      template: '/webpages/index_content.html'
    }
    var helloState = {
      name: 'hello',
      url: '/hello',
      template: '<h3>hello world!</h3>'
    }
  
    var aboutState = {
      name: 'about',
      url: '/about',
      template: '<h3>Its the UI-Router hello world app!</h3>'
    }
  
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
    // var aboutState = {
    //   name: 'about',
    //   url: '/about',
    //   template: '<h3>Its the UI-Router hello world app!</h3>'
    // }
  
    $stateProvider.state(indexState);
    // $stateProvider.state(aboutState);
  })
 























  .controller('cartctrl', function ($scope, $http, $rootScope) {
    $scope.imgpath = imgpath;
    console.log($scope.imgpath);
    $scope.cart_empty = false;
    var data = $.param({
      user_id: 'jugal'

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

    $http.post(servicepath + '/viewcart1', data, config)

      .success(function (data, status, headers, config) {


        console.log(data.products);
        if(data.products.length > 0)
        {
        $scope.cart_empty = false;
        $scope.cart_data = data.products;
        console.log("data filled : ");
        console.log(" "+$scope.cart_data);
        console.log(" "+$scope.cart_empty);

        }
        else{
          $scope.cart_empty = true;
        }
        // console.log($scope.data[0].p_display_photo);





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
    var data = $.param({
      user_id: 'jugal'

    });

    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json'
      }
    }


    $http.post(servicepath + '/viewcart1', data, config)  //change path

      .success(function (data, status, headers, config) {
        console.log(data.products);
        $scope.wishlist_data = data.products;




        setTimeout(function(){

          $('#loader').css('display', 'none')

        },150);

      }


      )
      .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        console.log("fail");
       




      });
    $scope.openproduct = function (main_cat,cat,id) {

      $scope.id = id;
      var name = $rootScope.main_category_name;

      window.open('/webpages/product.html?' + main_cat + '&' + cat + '&' + id, '_parent');


    };
    $scope.checkout = function()
    {

    // if(user)
    
      window.open('../webpages/checkout.html', '_parent');

    }
    $scope.splice_cart_product = function (index,id) {
// alert("delete paused");
      document.getElementById(id).style.opacity="0";
// $("#"+id).remove();

      console.log("item no : "+id+" is deleted.");
      if($scope.cart_data.length < 1)
      {
        $scope.cart_empty=true;
        alert("hide");
      }
      //function to remove item from db
      $scope.cart_data.splice(index, 1);
// alert("hey");


    };
    $scope.splice_wishlist_product = function (index,id) {

      $scope.wishlist_data.splice(index, 1);
      console.log("item no : "+id+" is deleted.");
      if($scope.wishlist_data.length < 1)
      {
        $scope.cart_empty=true;
        alert("hide");
      }

      //function to remove item from db


    };

  })





  .controller('loggedin', function ($scope, $http, $rootScope) {     //signin.html, signup.html, forgotpass.html controller 
    // alert($rootScope.admin);
    $rootScope.isloggedIn = false;
    $scope.password_violation = false;
    $scope.email_violation = false;
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    setTimeout(function(){

      $('#loader').css('display', 'none')

    },50);
    
    var pass_reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,20}$/;
//length 8 to 20, 

    // $scope.userDetais = {}; //fetches signup user details
    //
    // signup()
    //
    $scope.userDetails = {}; 



    $scope.resetpass = function () {
      $('#loader').css('display','none');

      var e = document.getElementById("emailid").value;
      var modal = document.getElementById("emailsent");

      if (reg.test(e) == false) {
        $scope.email_violation = true;
        console.log(e + ": violated");
        modal.style.display = "none";

      }
      else {
        $scope.email_violation = false;
        console.log(e);
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        modal.onclick = function () {
          modal.style.display = "none";
          document.body.style.overflow = "scroll";
          // window.open('../index.html', '_parent');


        }


        // When the user clicks anywhere outside of the modal, close it

      }
      // window.onclick = function (event) {
      //   if (event.target == modal) {
      //     modal.style.display = "none";
      //   }
      // }

      // When the user clicks on <span> (x), close the modal


    };
    $scope.signin = function () {

      $scope.emailid = document.getElementById("emailid").value;
      $scope.password = document.getElementById("password").value;
      $scope.email_message = "";
      $scope.password_message = "";

      // console.log($scope.emailid);
      // console.log($scope.password);

      // if ($scope.emailid == "" && $scope.password == "") {
      //   console.log("required fields are empty.");
      //   $scope.email_violation = true;
      //   $scope.password_violation = true;
      //   $scope.email_message = "Required Field is Empty."
      //   $scope.password_message = "Required Field is Empty."

      // }

      if ($scope.emailid != "") {

        // checkemail

        var e = $scope.emailid;
        if (reg.test(e) == false) {
          $scope.email_message = "Please Enter Email in Proper Format.";
          $scope.email_violation = true;
                }

        else {
          $scope.email_violation = false;
        }
      }
      else{

        $scope.email_message = "Required Field is Empty.";
        $scope.email_violation = true;

      }
        // checkpass
        var p = $scope.password;
if($scope.password.length != 0)
{
  console.log(pass_reg.test(p));
          if (pass_reg.test(p) == false) {
          $scope.password_message = "Please Enter Password in Proper Format.";
          $scope.password_violation = true;

        }
        else {
          $scope.password_violation = false;

        }
      }
      else{
        $scope.password_violation = true;
        $scope.password_message = "Required Field is Empty.";

      }
      




        if ($scope.password_violation == false && $scope.email_violation == false) {

          console.log("welcome...you will be redirected soon....");
          $scope.email_violation = false;
          $scope.password_violation = false;

          // var data = $.param({
          //   email : e ,
          //   password : p
          // });

          // var config = {
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
          //     'Access-Control-Allow-Origin': '*',
          //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          //     'Accept': 'application/json'
          //   }
          // }

          // $http.post(servicepath + '/subscribenewsletter', data, config)  //change the path here

          //   .success(function (data, status, headers, config) {
          //     console.log(data);
          //     $scope.category = data;
          //     console.log("success");  

          // //   if data== 0 --> logged in else not

          //     $rootScope.isloggedIn = true;
         // window.history.back();

          // // window.open('../index.html', '_parent'); 

          //   })
          //   .error(function (data, status, header, config) {
          //     $scope.ResponseDetails = "Data: " + data +
          //       "<hr />status: " + status +
          //       "<hr />headers: " + header +
          //       "<hr />config: " + config;
          //     console.log("fail");



          //   });



          $rootScope.isloggedIn = true;     //remove this after uncommenting http request code.


        }
      };


    //  window.history.back();//remove this after uncommenting http request code.


    $scope.signup = function () {


      $scope.fname_violation = false;
      $scope.lname_violation = false;
      $scope.email_violation = false;
      $scope.phn_no_violation = false;
      $scope.pwd_violation = false;
      $scope.conf_pwd_violation = false;

      $scope.email_format_error = false;
      $scope.pwd_format_error = false;
      $scope.conf_pwd_format_error = false;
      $scope.phn_no_format_error = false;



      var e = document.getElementById("email").value;
      var fn = document.getElementById("fname").value;
      var ln = document.getElementById("lname").value;
      var pwd = document.getElementById("pwd").value;
      var conf_pwd = document.getElementById("pwd_repeat").value;
      var phn_no = document.getElementById("phn_no").value;


      // if($scope.fn  $scope.ln +" "+$scope.pwd +" "+ $scope.conf_pwd +" "+$scope.phn_no +" "+ $scope.e)

      if (fn == "") {
        //show error
        $scope.fname_violation = true;

      }
      if (ln == "") {
        //show error
        $scope.lname_violation = true;

      }
      if (e == "") {
        //show error
        $scope.email_violation = true;
        $scope.email_format_error = false;


      }
      if (pwd == "") {

        //show error
        $scope.pwd_violation = true;
        $scope.pwd_format_error = false;




      }
      if (conf_pwd == "") {
        //show error
        $scope.conf_pwd_violation = true;
        $scope.conf_pwd_format_error = false;
        $scope.pwd_match_error = false;



      }
      if (phn_no == "") {
        //show error
        $scope.phn_no_violation = true;
        $scope.phn_format_error = false;


      }


      if (fn != "") {
        //remove error
        $scope.fname_violation = false;


      }
      if (ln != "") {
        //remove error
        $scope.lname_violation = false;


      }
      if (e != "") {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(e) == false) {
          $scope.email_violation = false;
          $scope.email_format_error = true;

        }
        else {
          $scope.email_violation = false;
          $scope.email_format_error = false;



          // $scope.email_violation = false;

        }
        //remove error
      }
      if (pwd != "") {
        //remove error
        if (pwd.length < 8) {
          $scope.pwd_violation = false;
          $scope.pwd_format_error = true;



        }
        else {
          // $scope.password_violation = false;
          $scope.pwd_violation = false;
          $scope.pwd_format_error = false;

        }
      }
      if (conf_pwd != "") {

        if (pwd != conf_pwd) {
          $scope.conf_pwd_violation = false;
          $scope.conf_pwd_format_error = false;
          $scope.pwd_match_error = true;

        }
        if (pwd == conf_pwd) {
          if ($scope.pwd_format_error == false) {
            //remove error
            $scope.conf_pwd_violation = false;
            $scope.conf_pwd_format_error = false;
            $scope.pwd_match_error = false;



          }
          else {
            $scope.conf_pwd_violation = false;
            $scope.conf_pwd_format_error = true;
            $scope.pwd_match_error = false;


          }

        }

      }
      if (phn_no != "") {
        if (phn_no.length < 8 || phn_no.length > 12) {
          // $scope.password_violation = true;
          $scope.phn_no_violation = false;
          $scope.phn_format_error = true;

        }
        else {
          $scope.phn_no_violation = false;
          $scope.phn_format_error = false;



        }
        //remove error
      }
      console.log($scope.fname_violation + "&&" + $scope.lname_violation + "&&" +
        $scope.pwd_violation + "&&" + $scope.conf_pwd_violation + "&&" +
        $scope.email_violation + "&&" + $scope.phn_no_violation + "&&" +
        $scope.phn_format_error + "&&" + $scope.email_format_error + "&&" +
        $scope.pwd_format_error + "&&" + $scope.conf_pwd_format_error)


      if ($scope.fname_violation == false && $scope.lname_violation == false &&
        $scope.pwd_violation == false && $scope.conf_pwd_violation == false &&
        $scope.email_violation == false && $scope.phn_no_violation == false &&
        $scope.phn_format_error == false && $scope.email_format_error == false &&
        $scope.pwd_format_error == false && $scope.conf_pwd_format_error == false && $scope.pwd_match_error == false) {
        console.log("welcome!!");
        return;



        //http code goes here...

      }
      else {
        console.log("there is an error");
        return;
      }








    };

  })



  .controller('menuctrl', function ($scope, $location, $window, $http, $rootScope) {


    $scope.imgpath = imgpath;
    $rootScope.flag = true;
    $scope.isopen=false;
    $scope.currency ="inr";
    $rootScope.openid = "mySidenav";
    $rootScope.show = false;
    $rootScope.childflag = true;
    //   $rootScope.showclose=false;
    $scope.redirect = function () {
      window.open('../index.html', '_parent');

    };
    $scope.opencart = function () {

      window.open('../webpages/cart.html', '_parent');


    };
    $scope.opencart_index = function () {

      window.open('webpages/cart.html', '_parent');


    };
    $scope.opensignin_index = function () {

      window.open('webpages/signin.html', '_parent');


    };
    $scope.opensignin = function () {

      window.open('../webpages/signin.html', '_parent');


    };
    $scope.opensignup_index = function () {

      window.open('webpages/signup.html', '_parent');


    };
    $scope.opensignup = function () {

      window.open('../webpages/signup.html', '_parent');


    };
    $scope.openWishlist_index = function () {

      window.open('webpages/wishlist.html', '_parent');


    };
    $scope.openWishlist = function () {

      window.open('../webpages/wishlist.html', '_parent');


    };
    $scope.openproducts = function (cat_name,id) {

      $http.get(servicepath + '/filter?main_category=' + cat_name + '&cat_id=' + id + '&page_no=0' + query, data, config)

      // $http.get(servicepath + '/filter?main_category=' + cat_name + '&cat_id=' + id + '&page_no=0&color=' + i, data, config)

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
    $scope.openWishlist = function () {

      window.open('../webpages/wishlist.html', '_parent');


    };
    $scope.openWishlist = function () {

      window.open('../webpages/wishlist.html', '_parent');


    };
    // angular.element(document).bind('mouseup', function (e) {

    //   var element = document.getElementById('mySidenav');
    //   var ele = document.getElementById("nav-icon1");
    //   if (e.target !== element && !element.contains(e.target) && e.target !== ele && !ele.contains(e.target) && ele.classList.contains("open")) {
    //     $scope.isopen = false;

    //     $("#nav-icon1").toggleClass('open');

    //     $rootScope.show = false;
    //     console.log("from 2536" + $rootScope.show);
    //     // document.body.style.backgroundColor = "white";

    //     // document.getElementById("mySidenav").style.zIndex = "-100";

    //     // document.getElementById("main").style.zIndex = "10";
    //     document.getElementById("main").style.marginLeft = "0";
    //     document.getElementById("nav-icon1").style.margin = "20px";
    //     document.getElementById("menu-overlay").style.display = "none";

    //     document.getElementById("mySidenav").style.transform = "translate(-100%,0)";
    //     document.getElementById("mySidenav").style.boxShadow = "none";

    //     // document.getElementById("main").style.backgroundColor = "WHITE";

    //     // document.getElementById("main").style.position = "unset";
    //     // document.getElementById("mySidenav").style.position = "unset";
    //     // document.getElementById("main").style.transform = "translate(0,0)";
    //     document.body.style.overflow = "scroll";



    //   }

    // });
    var data = [
      {
        "a_cat_id": "001",
        "atitle": "men",
        "category": [
          {
            "a_cat_id": "002",
            "atitle": "Kurtas",
            "category": [
              {
                "a_cat_id": "003",
                "atitle": "Basic Kurta",
                "category": []
              },
              {
                "a_cat_id": "004",
                "atitle": "Shalwar Kameez",
                "category": []
              },
              {
                "a_cat_id": "005",
                "atitle": "Kurta Shalwar",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "006",
            "atitle": "Waistcoats",
            "category": [
              {
                "a_cat_id": "007",
                "atitle": "Classic",
                "category": []
              },
              {
                "a_cat_id": "008",
                "atitle": "Embroidered",
                "category": []
              }
            ]
          }
        ]
      },
      {
        "a_cat_id": "010",
        "atitle": "women",
        "category": [
          {
            "a_cat_id": "012",
            "atitle": "Bottoms",
            "category": [
              {
                "a_cat_id": "019",
                "atitle": "Pants",
                "category": []
              },
              {
                "a_cat_id": "020",
                "atitle": "Shalwar",
                "category": []
              },
              {
                "a_cat_id": "021",
                "atitle": "Denims",
                "category": []
              },
              {
                "a_cat_id": "022",
                "atitle": "Tights",
                "category": []
              },
              {
                "a_cat_id": "023",
                "atitle": "Formal Pants",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "013",
            "atitle": "Unstitched",
            "category": [
              {
                "a_cat_id": "016",
                "atitle": "Lawn Spring",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "014",
            "atitle": "Khaas",
            "category": [
              {
                "a_cat_id": "017",
                "atitle": "Casual",
                "category": []
              },
              {
                "a_cat_id": "018",
                "atitle": "Semi Formal",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "029",
            "atitle": "Pret",
            "category": [
              {
                "a_cat_id": "015",
                "atitle": "Kurta",
                "category": []
              }
            ]
          }
        ]
      },
      {
        "a_cat_id": "011",
        "atitle": "kids",
        "category": [
          {
            "a_cat_id": "024",
            "atitle": "Girls Ethnic",
            "category": [
              {
                "a_cat_id": "028",
                "atitle": "Kurta",
                "category": []
              },
              {
                "a_cat_id": "030",
                "atitle": "Pants",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "026",
            "atitle": "Boys Ethnic",
            "category": [
              {
                "a_cat_id": "036",
                "atitle": "Kurta",
                "category": []
              },
              {
                "a_cat_id": "037",
                "atitle": "Kurta Pyjama",
                "category": []
              },
              {
                "a_cat_id": "038",
                "atitle": "Waistcoat",
                "category": []
              },
              {
                "a_cat_id": "039",
                "atitle": "Shalwar",
                "category": []
              }
            ]
          }
        ]
      },
      {
        "a_cat_id": "040",
        "atitle": "Home Linen",
        "category": [
          {
            "a_cat_id": "044",
            "atitle": "Bed Linen",
            "category": [
              {
                "a_cat_id": "050",
                "atitle": "Bed Covers & Bed Sheets",
                "category": []
              },
              {
                "a_cat_id": "051",
                "atitle": "Cushion Covers",
                "category": []
              },
              {
                "a_cat_id": "052",
                "atitle": "Dohars, Quilts & Throws",
                "category": []
              },
              {
                "a_cat_id": "053",
                "atitle": "Pillow Covers",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "045",
            "atitle": "Collections",
            "category": [
              {
                "a_cat_id": "054",
                "atitle": "Christmas Collection",
                "category": []
              },
              {
                "a_cat_id": "055",
                "atitle": "Aangan Collection",
                "category": []
              },
              {
                "a_cat_id": "060",
                "atitle": "White on White Collection",
                "category": []
              },
              {
                "a_cat_id": "061",
                "atitle": "Indigo Collection",
                "category": []
              },
              {
                "a_cat_id": "062",
                "atitle": "Brahmaputra Collection",
                "category": []
              },
              {
                "a_cat_id": "063",
                "atitle": "Festive Collection",
                "category": []
              },
              {
                "a_cat_id": "064",
                "atitle": "Spring Collection",
                "category": []
              },
              {
                "a_cat_id": "065",
                "atitle": "Summer Collection",
                "category": []
              },
              {
                "a_cat_id": "066",
                "atitle": "Monsoon Collection",
                "category": []
              },
              {
                "a_cat_id": "067",
                "atitle": "Hard Black Print ",
                "category": []
              },
              {
                "a_cat_id": "068",
                "atitle": "Ikat Collection",
                "category": []
              },
              {
                "a_cat_id": "069",
                "atitle": "Kalamkari",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "046",
            "atitle": "Table Linen",
            "category": [
              {
                "a_cat_id": "070",
                "atitle": "Mats, Napkins & Runners",
                "category": []
              },
              {
                "a_cat_id": "071",
                "atitle": "Table Covers",
                "category": []
              },
              {
                "a_cat_id": "072",
                "atitle": "Kitchen Linen",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "047",
            "atitle": "Bath Linen",
            "category": [
              {
                "a_cat_id": "073",
                "atitle": "Towels",
                "category": []
              },
              {
                "a_cat_id": "074",
                "atitle": "Bath Accessories",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "048",
            "atitle": "Floor Coverings",
            "category": []
          },
          {
            "a_cat_id": "049",
            "atitle": "Curtains",
            "category": []
          }
        ]
      },
      {
        "a_cat_id": "041",
        "atitle": "Decor & Gifts",
        "category": [
          {
            "a_cat_id": "075",
            "atitle": "Gifts",
            "category": [
              {
                "a_cat_id": "082",
                "atitle": "Fragrances & Candles",
                "category": []
              },
              {
                "a_cat_id": "083",
                "atitle": "Stationery",
                "category": []
              },
              {
                "a_cat_id": "084",
                "atitle": "Games & Toys",
                "category": []
              },
              {
                "a_cat_id": "085",
                "atitle": "Frames",
                "category": []
              },
              {
                "a_cat_id": "086",
                "atitle": "Others",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "076",
            "atitle": "Collections",
            "category": [
              {
                "a_cat_id": "089",
                "atitle": "Christmas Collection",
                "category": []
              },
              {
                "a_cat_id": "090",
                "atitle": "Aangan Collection",
                "category": []
              },
              {
                "a_cat_id": "091",
                "atitle": "White on White Collection",
                "category": []
              },
              {
                "a_cat_id": "092",
                "atitle": "Indigo Collection",
                "category": []
              },
              {
                "a_cat_id": "093",
                "atitle": "Brahmaputra Collection",
                "category": []
              },
              {
                "a_cat_id": "094",
                "atitle": "Festive Collection",
                "category": []
              },
              {
                "a_cat_id": "095",
                "atitle": "Spring Collection",
                "category": []
              },
              {
                "a_cat_id": "096",
                "atitle": "Summer Collection",
                "category": []
              },
              {
                "a_cat_id": "097",
                "atitle": "Monsoon Collection",
                "category": []
              },
              {
                "a_cat_id": "098",
                "atitle": "Wellness & Spa Collection",
                "category": []
              },
              {
                "a_cat_id": "098",
                "atitle": "Wellness & Spa Collection",
                "category": []
              },
              {
                "a_cat_id": "098",
                "atitle": "Wellness & Spa Collection",
                "category": []
              }

            ]
          },
          {
            "a_cat_id": "078",
            "atitle": "Tableware",
            "category": [
              {
                "a_cat_id": "099",
                "atitle": "Dinnerware",
                "category": []
              },
              {
                "a_cat_id": "100",
                "atitle": "Drinkware",
                "category": []
              },
              {
                "a_cat_id": "101",
                "atitle": "Flatware",
                "category": []
              },
              {
                "a_cat_id": "102",
                "atitle": "Serveware",
                "category": []
              },
              {
                "a_cat_id": "103",
                "atitle": "Others",
                "category": []
              }
            ]
          },
          {
            "a_cat_id": "079",
            "atitle": "Decor",
            "category": []
          },
          {
            "a_cat_id": "080",
            "atitle": "Basketry",
            "category": []
          },
          {
            "a_cat_id": "081",
            "atitle": "Lighting",
            "category": []
          }
        ]
      },
      {
        "a_cat_id": "042",
        "atitle": "Food",
        "category": []
      }
    ];

    $scope.loadslides = function()
    {
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

    $http.get(servicepath + '/getSlideShow?path=home', data, config)
      //  .success(function (data, status, headers, config) {
      //      $scope.PostDataResponse = data;
      //  })

      .success(function (data, status, headers, config) {

        console.log(data.list);
        $scope.slides = data.list;
        $('#body').css('display', 'block');

        $('#loader').css('display', 'none');


        $scope.$watch($scope.slides, function () {

          var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            centeredSlides: true,
             loop: true,

            autoplay: {
              delay: 35000000000,
              disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
              // clickable: true,
            },
            //   navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            //   },


          });
          // swiper-slide-prev   swiper-slide-active
          // swiper-slide-duplicate-active swiper-slide-duplicate-prev
          // setTimeout(function(){
          //   console.log( document.getElementsByClassName('swiper-slide-active')[0].src);
          //   console.log(document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src);
      
          //   // document.getElementsByClassName('swiper-slide-duplicate-active')[0].ngSrc =  document.getElementsByClassName('swiper-slide-active')[0].ngSrc;
          //   //   document.getElementsByClassName('swiper-slide-duplicate-prev')[0].ngSrc =  document.getElementsByClassName('swiper-slide-prev')[0].ngSrc;
          //     document.getElementsByClassName('swiper-slide-duplicate-active')[0].src =  document.getElementsByClassName('swiper-slide-active')[0].src;
          //     document.getElementsByClassName('swiper-slide-prev')[0].src = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src;
          //     document.getElementsByClassName('swiper-slide-duplicate-active')[0].id =  document.getElementsByClassName('swiper-slide-active')[0].id;
          //     document.getElementsByClassName('swiper-slide-prev')[0].id = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].id;
            
            
            
            
          //   }),1000;
          console.log("triggered");
          document.body.style.overflow = "scroll";
        })

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
    $scope.data = data;
    $scope.show = function (id) {
      console.log(id);
    };


    $scope.callagain = function () {

    setTimeout(function(){
      console.log( document.getElementsByClassName('swiper-slide-active')[0].src);
      console.log(document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src);

      // document.getElementsByClassName('swiper-slide-duplicate-active')[0].ngSrc =  document.getElementsByClassName('swiper-slide-active')[0].ngSrc;
      //   document.getElementsByClassName('swiper-slide-duplicate-prev')[0].ngSrc =  document.getElementsByClassName('swiper-slide-prev')[0].ngSrc;
        document.getElementsByClassName('swiper-slide-duplicate-active')[0].src =  document.getElementsByClassName('swiper-slide-active')[0].src;
        document.getElementsByClassName('swiper-slide-prev')[0].src = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src;
        document.getElementsByClassName('swiper-slide-duplicate-active')[0].id =  document.getElementsByClassName('swiper-slide-active')[0].id;
        document.getElementsByClassName('swiper-slide-prev')[0].id = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].id;
      
      
      
      
      }),1000;


    };
    $scope.isObjectEmpty = function (card) {
      if(Object.keys(card).length === 0)
      {
    // e.preventDefault();

        return true;
      }
      else{
        return false;
      }
      
    }

    $scope.openNav = function (name, id) {
      // console.log(Object.keys(id));
      if(Object.keys(id).length === 0)
      {
        
        getProduct(name,id);

        
      }
      else{

      if (document.getElementById(id)) {
        // console.log("this is id");
        $rootScope.openid = id;
        // console.log(id);
        document.getElementById(id).style.width = "100%";
        // document.getElementById(id).style.visibility = "visible";
        document.getElementById(id).style.transform = "translate(0,0)";
         document.getElementById("content").style.transform = "translate(-100%,0)";
        document.body.overflow = "hidden";


        // document.getElementById("main").style.marginLeft = "94%";
        // document.getElementById("mySidenav").style.zIndex="-100";

        // document.getElementById(id).style.zIndex="0";

        // $rootScope.showclose=true;
      }
     
    
      else {

        console.log("element not found");
        window.open('../webpages/home.html?' + name + '&' + id + '&1', '_parent');

      }
    }
    };
    $scope.closesingleNav = function (id) {
      console.log(id);
      $rootScope.openid = "mySidenav";
      // $rootScope.childflag=false;
      // document.getElementById(id).style.zIndex="0";

      // document.getElementById("mySidenav").style.zIndex=1;

      document.getElementById(id).style.width = "0";
      // document.getElementById(id).style.display = "g";
      document.getElementById(id).style.transform = "translate(110%,0)";
      // document.body.overflow = "scroll";
      document.getElementById("content").style.transform = "translate(0%,0)";

      //  document.getElementById("content").style.transform = "translate(0,0)";

      // document.getElementById("mySidenav").style.transform = "translate(0,0)";



    };
    $scope.closesingle_child_Nav = function (id) {
      console.log(id);
      $rootScope.openid = "mySidenav";
      // $rootScope.childflag=false;
      // document.getElementById(id).style.zIndex="0";

      // document.getElementById("mySidenav").style.zIndex=1;

      document.getElementById(id).style.width = "0";
      // document.getElementById(id).style.display = "g";
      document.getElementById(id).style.transform = "translate(110%,0)";
      // document.body.overflow = "scroll";
      // document.getElementById("content").style.transform = "translate(0%,0)";

      //  document.getElementById("content").style.transform = "translate(0,0)";

      // document.getElementById("mySidenav").style.transform = "translate(0,0)";



    };
    $scope.toggleN = function () {
      

      if ($rootScope.show == false) {
        // $('#nav-icon1').classList.add("open");

        $rootScope.show = true;
        $scope.isopen = true;
        console.log($rootScope.show);
        // document.getElementById("mySidenav").style.visibility = "visible";
        // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

        document.getElementById("main").style.marginLeft = "90%";
        document.getElementById("nav-icon1").style.margin = "2.5%";
        document.getElementById("nav-icon1").classList.add("open");
        // document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";

        document.getElementById("mySidenav").style.transform = "translate(0,0)";
        // document.getElementById("menu-overlay").style.display = "block";

        document.getElementById("mySidenav").style.boxShadow = "0px 0px 24px rgba(0,0,0,0.3), 0 10px 0px rgba(0,0,0,0.22)";


        // document.getElementById("main").style.transform = "translate(90%,0)";
        // document.getElementById("mySidenav").style.zIndex = "10";
        // document.getElementById("main").style.zIndex = "-100";

        // document.getElementById("main").style.position = "fixed";
        // document.getElementById("mySidenav").style.position = "fixed";
        // document.body.classList.add("scrollOff");
        document.body.style.overflow = "hidden";


      }
      else {
        // document.getElementById("mySidenav").style.visibility = "hidden";
        // $('#nav-icon1').classList.remove("open");

        $rootScope.show = false;
        $scope.isopen = false;

        console.log($rootScope.show);
        // document.body.style.backgroundColor = "white";

        // document.getElementById("mySidenav").style.zIndex = "-100";

        // document.getElementById("main").style.zIndex = "10";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("nav-icon1").style.margin = "20px";
        document.getElementById("nav-icon1").classList.remove("open");

        // document.getElementById("menu-overlay").style.display = "none";

        document.getElementById("mySidenav").style.transform = "translate(-100%,0)";
        document.getElementById("mySidenav").style.boxShadow = "none";

        // document.getElementById("main").style.backgroundColor = "WHITE";

        // document.getElementById("main").style.position = "unset";
        // document.getElementById("mySidenav").style.position = "unset";
        // document.getElementById("main").style.transform = "translate(0,0)";
        document.body.style.overflow = "scroll";
        // document.body.classList.remove("scrollOff");





      }
    };

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




    $http.get(servicepath + '/getallcategories', data, config)

      .success(function (data, status, headers, config) {
        console.log(data);
        $scope.category = data;
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

    $scope.getProduct = function (name, id) {

      window.open('../webpages/home.html?' + name + '&' + id + '&1', '_parent');



    };
    $scope.getProduct_index = function (name, id) {

      window.open('webpages/home.html?' + name + '&' + id + '&1', '_parent');



    };
  })

  
  .controller('paginationctrl', function ($scope, $rootScope, $location) {


    $scope.changepage = function (page) {
      console.log(page);

      var name = $rootScope.main_category_name;
      var id = $rootScope.id;

      $scope.page = page;
      console.log("from change" + $scope.page);
      if ($rootScope.filterurl != undefined && $rootScope.filterurl != "") {
        window.open('home.html?' + name + '&' + id + '&' + page + '&&' + $rootScope.filterurl, '_parent');
      }
      else {
        window.open('home.html?' + name + '&' + id + '&' + page, '_parent');
      }
    };
    $scope.next = function () {

      // var p;
      var name = $rootScope.main_category_name;
      var id = $rootScope.id;
      // $scope.p=$rootScope.page;
      $scope.get_page_no = $location.absUrl().split('?')[1].split('&')[2];
      console.log("from getpageno " + $scope.get_page_no);
      var page = parseInt($scope.get_page_no);
      var one = 1;
      page = page + parseInt(one);
      console.log(page);
      console.log($rootScope.pages);

      if (page <= $rootScope.pages) {
        if ($rootScope.filterurl != undefined && $rootScope.filterurl != "") {
          window.open('home.html?' + name + '&' + id + '&' + page + '&&' + $rootScope.filterurl, '_parent');
        }
        else {

          window.open('home.html?' + name + '&' + id + '&' + page, '_parent');
        }
      }





    };
    $scope.previous = function () {

      // var p;
      var name = $rootScope.main_category_name;
      var id = $rootScope.id;
      // $scope.p=$rootScope.page;
      $scope.get_page_no = $location.absUrl().split('?')[1].split('&')[2];
      console.log("from getpageno " + $scope.get_page_no);
      var page = parseInt($scope.get_page_no);
      var one = 1;
      page = page - parseInt(one);
      if (page > 0) {
        if ($rootScope.filterurl != undefined && $rootScope.filterurl != "") {
          window.open('home.html?' + name + '&' + id + '&' + page + '&&' + $rootScope.filterurl, '_parent');
        }
        else {
          window.open('home.html?' + name + '&' + id + '&' + page, '_parent');
        }
      }





    };

  })


 








  
  .controller('footerctrl', function ($scope, $rootScope, $location, $http) {

    // Please enter Your Email ID.</p>Please enter Email ID in proper format
    $scope.newsletter = function (flag) {
      $scope.validEmail = false;
      $scope.success_alert = false;
      $scope.emailalert = false;
      $scope.error_message ;
      // $scope.email_empty = false;
      // $scope.validateEmail();
      console.log("reached");

      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var e = $scope.email_add;
      if (reg.test(e) == false) {

        if (e == "" || e == undefined ) {
          $scope.error_message = "Please enter Your Email ID.";
          $scope.emailalert = true;
          $scope.success_alert = false;
          // document.getElementById("alert_message").style.color = "red";

          // $scope.email_empty = true;

        }
        else {
          // alert('Invalid Email Address');
          // document.getElementById("email_add").style.borderColor = "red";
          $scope.error_message = "Please enter Email ID in proper format.";
          $scope.emailalert = true;
          $scope.success_alert = false;
          // document.getElementById("alert_message").style.color = "red";

          // $scope.email_empty = false;

        }
        // return false;
      }
      else {
        if (reg.test(e) == true) {
          // document.getElementById("email_add").style.borderColor = "lightgray";
          $scope.emailalert = false;

          // $scope.email_empty = false;
          $scope.validEmail = true;

          console.log("Email id : " + e);

        }
        // return true;
      }


      if ($scope.validEmail == true && e != "") {

        // $scope.emailalert = false;
        // $scope.email_empty = false;

        // var data = $.param({

        
        //   email: e
         $scope.success_message = "Thanks!! We'll keep you posted.";
         $scope.emailalert = false;
         $scope.success_alert = true;
        //  document.getElementById("alert_message").style.color = "green";

        // });

        // var config = {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        //     'Accept': 'application/json'
        //   }
        // }

        // $http.post(servicepath + '/subscribenewsletter', data, config)  //change the path here

        //   .success(function (data, status, headers, config) {
        //     console.log(data);
        //     $scope.subscriber = data;
        //     console.log("success");
                
        //   })
        //   .error(function (data, status, header, config) {
        //     $scope.ResponseDetails = "Data: " + data +
        //       "<hr />status: " + status +
        //       "<hr />headers: " + header +
        //       "<hr />config: " + config;
        //     console.log("fail");
        //   });

      }
      // if($scope.emailalert == true)
      // {
      //   document.getElementById("alert_message").style.color = "red";
      // }
      // if($scope.success_message == true)
      // {
      //   document.getElementById("alert_message").style.color = "green";
      // }
      $scope.email_add = "";


    };




  });








