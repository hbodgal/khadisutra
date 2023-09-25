angular.module('router', ['ngRoute'])
.config(function($routeProvider){
$routeProvider
.when("/index",{
templateUrl : "webpages/index_content.html",
controller : "menuctrl"
})
.when("/home",{
    templateUrl : "webpages/home.html",
    controller : "gridctrl"
})
});
