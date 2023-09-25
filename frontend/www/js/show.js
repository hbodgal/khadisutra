angular.module('show', [])

  .controller('show', function ($timeout, $scope, $location, $window, $http, $rootScope) {          //show product  CONTROLLER
    $scope.imagepath = imgpath;
    $scope.data_received = false;
    $scope.show_size_div = false;
    console.log("this is  path" + imgpath);
    console.log("reached");
    $scope.Answers = {};
    $scope.customize = {};
    $scope.Math = $window.Math;


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

          $scope.data_length_flag = false;
          alert("The product you are looking for seems to be unavailable right now!!\nEnjoy Shopping! ");
          window.open('../index.html', '_parent');

        }
        else {
          $scope.data_length_flag = true;
        }
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
          angular.element(document).ready(function () {
            $('#loader').css('display', 'none');

          });
        });
        setTimeout(function () {

          if ($('.mobile').css('display') == "block") {
            console.log(document.getElementsByClassName('swiper-slide-active')[0].src);
            console.log(document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src);

            // document.getElementsByClassName('swiper-slide-duplicate-active')[0].ngSrc =  document.getElementsByClassName('swiper-slide-active')[0].ngSrc;
            //   document.getElementsByClassName('swiper-slide-duplicate-prev')[0].ngSrc =  document.getElementsByClassName('swiper-slide-prev')[0].ngSrc;
            document.getElementsByClassName('swiper-slide-duplicate-active')[0].src = document.getElementsByClassName('swiper-slide-active')[0].src;
            document.getElementsByClassName('swiper-slide-prev')[0].src = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src;
          }
        }, 1000);

        // var w = angular.element($window);

        //   w.bind('resize', function () {
        //     setTimeout(function(){
        //       if($('.mobile').css('display')=="block")
        //       {
        //       console.log( document.getElementsByClassName('swiper-slide-active')[0].src);
        //       console.log(document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src);

        //       // document.getElementsByClassName('swiper-slide-duplicate-active')[0].ngSrc =  document.getElementsByClassName('swiper-slide-active')[0].ngSrc;
        //       //   document.getElementsByClassName('swiper-slide-duplicate-prev')[0].ngSrc =  document.getElementsByClassName('swiper-slide-prev')[0].ngSrc;
        //         document.getElementsByClassName('swiper-slide-duplicate-active')[0].src =  document.getElementsByClassName('swiper-slide-active')[0].src;
        //         document.getElementsByClassName('swiper-slide-prev')[0].src = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src;
        //         alert('resize');
        //       }
        //       },1000);
        //   });

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
        $('#loader').css('display', 'none');

        // $scope.$watch("photos[i]", function () {

        //   var swiper = new Swiper('.swiper-container', {
        //      loop: true,
        //     spaceBetween: 60,
        //     navigation: {
        //       nextEl: '.swiper-button-next',
        //       prevEl: '.swiper-button-prev',

        //     },
        //     // pagination: {
        //     //   el: '.swiper-pagination',
        //     // },

        //   });
        //   console.log("triggered");
        //   $('#loader').css('display', 'none');

        // });
        // setTimeout(function(){
        //         console.log( document.getElementsByClassName('swiper-slide-active')[0].src);
        //         console.log(document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src);

        //         // document.getElementsByClassName('swiper-slide-duplicate-active')[0].ngSrc =  document.getElementsByClassName('swiper-slide-active')[0].ngSrc;
        //         //   document.getElementsByClassName('swiper-slide-duplicate-prev')[0].ngSrc =  document.getElementsByClassName('swiper-slide-prev')[0].ngSrc;
        //           document.getElementsByClassName('swiper-slide-duplicate-active')[0].src =  document.getElementsByClassName('swiper-slide-active')[0].src;
        //           document.getElementsByClassName('swiper-slide-prev')[0].src = document.getElementsByClassName('swiper-slide-duplicate-prev')[0].src;
        //         }),1000;



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



 
    $scope.ShowAnswersss = function () {
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
        $scope.size_partially_selected = false;

        $("#sizealert").scrollTop(0);

        error_count++;


      }
      else {
        if ($scope.check_Size_flag == 1) {
          if ($scope.Answers['height'] == "select") {
            $scope.size_not_selected = false;
            $scope.height_not_selected = true;
            $scope.size_partially_selected = false;

            $("#heightalert").scrollTop(0);

            error_count++;
          }
        }
        if ($scope.check_Size_flag == 2) {
          for (i = 0; i < Object.keys($scope.Answers).length; i++) {   //this will loop in Answers array
            if ($scope.Answers[Object.keys($scope.Answers)[i]] == "select") {   //this will find if option selected is "select" or not
              // alert("fill required feild : " + Object.keys($scope.Answers)[i]);

              if (Object.keys($scope.Answers)[0] != 'height')    //if name is not "height" than user has not given input of size so make "partially selected true" 
              {
                $scope.size_not_selected = false;
                $scope.size_partially_selected = true;
                $scope.height_not_selected = false;
                $('.modal-content').animate({
                  scrollTop: $("#empty_feilds_alert").offset().top
                },
                  'slow');
                $("#empty_feilds_alert").scrollTop(0);

              }
              if (Object.keys($scope.Answers)[i] == 'height')   // if name is height than scroll to "hight div".
              {
                $scope.size_not_selected = false;
                $scope.size_partially_selected = false;

                $scope.height_not_selected = true;
                $('.modal-content').animate({
                  scrollTop: $("#heightalert").offset().top
                },
                  'slow');
                $("#heightalert").scrollTop(0);

              }
              error_count++;  // this will count errors

            }
          }
        }
      }
      if (error_count == 0) {    //error count should be zero
        console.log("added to cart");
        console.log($scope.Answers);
        $scope.size_not_selected = false;
        $scope.height_not_selected = false;
        $scope.size_partially_selected = false;
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
        console.log($scope.orderdetails);
        // window.open('../webpages/cart.html', '_parent');


        /////this code is to hide size selection pop up.
        var modal = document.getElementById("myModal");
        setTimeout(function () {
          modal.style.display = "none";
          $('body').css('overflow', 'scroll');
        }, 500);



        //////till here
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
        document.getElementById("" + pic).classList.remove("activeimg");
      }
      document.getElementById("" + path).classList.add("activeimg");



      $rootScope.displayimg = path;
      zoom();
      var path = imgpath + '/' + $rootScope.displayimg;


      //alert(path);
      imageZoom("myimage", "myresult", path);
      removezoom();



    };



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
        // $(".size_icon").removeClass("size_icon_selected");
        // $target = $(event.target);   
        // $('#'+id).addClass('size_icon_selected');
        // $(event.target).find('.radio_icon').prop('checked','checked');
        // $scope.Answers['presize']= $('input[name=same]:checked').value;
        // $('input[name=same]:checked').parent().addClass('size_icon_selected');
        // $('.size_icon').find('.radio_icon').prop('checked', 'checked');
        // console.log("n");
        // alert("reached");

      }
      else {

        if (val == 1 && mea_flag == 0) {
          mea_flag = 1;
          for (i = 0; i < $scope.predef_sizes.length; i++) {
            // console.log($scope.predef_sizes[i].pre_size_id);
            // console.log(document.getElementById($scope.predef_sizes[i].pre_size_id));

            document.getElementById($scope.predef_sizes[i].pre_size_id).checked = false;  //  this is to uncheck radio button
            $scope.Answers['presize'] = null;
          }
          mea_flag = 0;
          $scope.check_Size_flag = 2;

          $(".size_icon").removeClass("size_icon_selected");
          // $(this).next().prop("checked", "checked");

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

    //   $("td.size_icon").click(function () {
    //     alert("came");
    //     $(this).find('input:radio').attr('checked', true);
    //  });



    $(".close").click(function () {
      // alert( "Handler for .click() called." );
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      $('body').css('overflow', 'scroll');

    });


    $(window).click(function (e) {
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
        $('body').css('overflow', 'scroll');
        // alert("clicked");
      }

    });
    //size selection popup view management code starts


    $scope.call_size_div = function () {

      $scope.show_size_div = true;
      //   setTimeout(function(){
      //           $('html,body').animate({
      //     scrollTop: $("#size_div").offset().top},
      //     'slow');
      //           },100);
      // };
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      $('body').css('overflow', 'hidden');


    };


    $scope.isSizeSelected = function () {                                       // IS_SIZE_SELECTED // TO CHECK SIZE IS SELECTED OR NOT

      var check_size_flag = 0;
      if ($scope.Answers['presize'] == null) {
        for (i = 0; i < $scope.size.length; i++) {


          if ($scope.Answers[$scope.size[i].size_id + ""] == "select") {

            check_size_flag++;
          }
        }
        if(check_size_flag > 0)
        {
          if(check_size_flag == $scope.size.length)
          {
          $scope.size_not_selected = true;
          $scope.size_partially_selected = false;
          setTimeout(function () {
            $('.modal-content').animate({
              scrollTop: $("#size_div").offset().top
            },
              'slow');
          }, 100);
          return false;
          }
          $scope.size_not_selected = false;
          $scope.size_partially_selected = true;
          setTimeout(function () {
            $('.modal-content').animate({
              scrollTop: $("#size_div").offset().top
            },
              'slow');
          }, 100);
          return false;

        }
      }

      if (check_size_flag == 0) {
        $scope.size_partially_selected = false;
        $scope.size_not_selected = false;
        return true;

      }
    };
    $scope.isHeightSelected = function () { 
      
      console.log($scope.Answers['height']);
      if ($scope.Answers['height'] == "select") {

        $scope.height_not_selected = true;
        setTimeout(function () {
          $('.modal-content').animate({
            scrollTop: $("#height_div").offset().top
          },
            'slow');
        }, 100);
        return false;
      }
      else{
        $scope.height_not_selected = false;
        
        return true;

      }
    };

    $scope.call_height_div = function () {

      if ($scope.isSizeSelected()) {
      
        $('#show_height_div_button').css('display', 'none');
        $('#height_div').css('display', 'block');
        setTimeout(function () {
          $('.modal-content').animate({
            scrollTop: $("#height_div").offset().top
          },
            'slow');
        }, 100);
      }

    };

    $scope.call_customization_div =  function ()
    {
      if($scope.isSizeSelected() && $scope.isHeightSelected())
      {
        $scope.size_not_selected = false;
        $scope.height_not_selected = false;
        $scope.size_partially_selected = false;

        // $('#show_height_div_button').css('display', 'none');
        $('#customization_div').css('display', 'block');
        $('#cust_buttons').css('display','none');
        $('#buttons_div').css('display','block');
        setTimeout(function () {
          $('.modal-content').animate({
            scrollTop: $("#customization_div").offset().top
          },
            'slow');
        }, 300);
       
      }

    };
    $scope.call_buttons_div =  function ()
    {
      if(document.getElementById('not_customize_checkbox').checked)
      {
        document.getElementById('buttons_div').style.display = "block";
        // setTimeout(function () {
        //   $('.modal-content').animate({
        //     scrollTop: $("#buttons_div").offset().top
        //   },
        //     'slow');
        // }, 100);
      }
      else
      {
       
          document.getElementById('buttons_div').style.display = "none";
  

      }
      // document.getElementById('buttons_div').style.display = document.getElementById('not_customize_checkbox').checked ? "block" : "none";
   
  };

    $scope.predef_selected = function (id) { 

      for (i = 0; i < $scope.size.length; i++) {
        // document.getElementById($scope.size[i].size_id).checked = false;
        // console.log($scope.Answers[$scope.size[i].size_id+""]);
        $scope.Answers[$scope.size[i].size_id + ""] = "select";
        // document.getElementById("m"+$scope.size[i].size_id).selectedIndex = 1;

        // console.log($scope.Answers);
        $(".size_icon").removeClass("size_icon_selected");
        $(event.target).addClass('size_icon_selected');         //add selected_icon code

        //  $('#scope.size[i].size_id').prop('selectedIndex',0);
        //  console.log(document.getElementById($scope.size[i].size_id));
        // console.log($scope.size[i].size_id);
      }
      $scope.Answers['presize']= id;





      // $(".size_icon").removeClass("size_icon_selected");
      // $target = $(event.target);   
      // $('#'+id).addClass('size_icon_selected');
      // $(event.target).find('.radio_icon').prop('checked','checked');
      // $scope.Answers['presize']= $('input[name=same]:checked').value;
      // $('input[name=same]:checked').parent().addClass('size_icon_selected');
      // $('.size_icon').find('.radio_icon').prop('checked', 'checked');
      // console.log("n");
      // alert("reached");
    };
    $scope.custom_size_selected = function () {

      // for (i = 0; i < $scope.predef_sizes.length; i++) {
      // console.log($scope.predef_sizes[i].pre_size_id);
      // console.log(document.getElementById($scope.predef_sizes[i].pre_size_id));

      // document.getElementById($scope.predef_sizes[i].pre_size_id).checked = false;  //  this is to uncheck radio button
      $scope.Answers['presize'] = null;


      $(".size_icon").removeClass("size_icon_selected");       //code to remove class "selected_icon"



      // }



    };



    $scope.ShowAnswers = function () {

      if($scope.isSizeSelected() && $scope.isHeightSelected())
      {
        $scope.size_not_selected = false;
        $scope.height_not_selected = false;
        $scope.size_partially_selected = false;
        alert("yeah..ordered !!");
      }

    };


    // $('#heart_container').click(function(){

    //   $('.like-button').toggleClass('liked');

    //   if($('#icon').attr('src')=='../image/hearts.svg')
    //   {
    //     $('#icon').attr('src') == '../image/heart-outline.svg';

    //   }
    //   else{
    //     $('#icon').attr('src') == '../image/hearts.svg';
    //   }


    // });
  });

