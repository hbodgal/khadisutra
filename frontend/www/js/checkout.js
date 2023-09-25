



angular.module('checkoutCtrl', ['ui.router','ngRoute'])


.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            abstract:true,
            controller: 'checkoutCtrl'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
          url: '/profile',
          templateUrl: 'form-profile.html'
      })
      
      // url will be /form/interests
      .state('form.interests', {
          url: '/interests',
          templateUrl: 'form-interests.html'
      })
      
      // url will be /form/payment
      .state('form.payment', {
          url: '/payment',
          templateUrl: 'form-payment.html'
      });
     
  // catch all route
  // send users to the form page 
  $urlRouterProvider.otherwise('/form/profile');
})



.controller('checkoutCtrl', function($scope,$rootScope,$http) {
    $scope.content="yes!!";

    // we will store all of our form data in this object
    $scope.formData = {};
    //  if($rootScope.isloggedIn != true )
    //  {
    //     window.open('../webpages/signin.html', '_parent');
    // }
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };

    $scope.imgpath = imgpath;
    console.log($scope.imgpath);

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

    $http.post(servicepath + '/viewcart', data, config)

      .success(function (data, status, headers, config) {
        console.log(data.products);
        $scope.cart_data = data.products;
        $('#loader').css('display','none');

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
});