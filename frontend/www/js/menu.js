angular
.module('MyApp', ['ui.router'])
     .controller('menuctrl', function ($scope, $location, $window, $http, $rootScope) { 
            $rootScope.flag=true;
            $rootScope.openid="mySidenav";
            $rootScope.show=false;
            $rootScope.open=true;
            $rootScope.childflag=true;
          //   $rootScope.showclose=false;

        


        //   if ($(window).width() < 1101) {
        //     console.log('Less than 960');
        //     $scope.desk_footer = false;

        //     $scope.mobile_footer = true;
        //  }
        //  else {
        //     console.log('More than 960');
        //     $scope.desk_footer = true;
        //     $scope.mobile_footer = false;

        //  }
         
        //  $rootScope.desk = $scope.desk_footer;
        //  $rootScope.mobile = $scope.mobile_footer;

         







      var data=[
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
              "category": [
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
          }
      ];
      $scope.data=data;
      $scope.show = function(id) {
      console.log(id);
      };
        
      $scope.openNav = function (id) { 
      console.log("status : "+$rootScope.open);
          if($rootScope.open==true)
          {
              $rootScope.open=false;
              console.log("status after : "+$rootScope.open);
      
          console.log("this is id");
      $rootScope.openid=id;
          console.log(id);
          document.getElementById(id).style.width = "90%";
      
          
          // document.getElementById("main").style.marginLeft = "94%";
          // document.getElementById("mySidenav").style.zIndex="-100";
      
          // document.getElementById(id).style.zIndex="0";
      
          // $rootScope.showclose=true;
      
          }
      
        };
        $scope.closesingleNav = function (id) {
      
          $rootScope.open=true;
          console.log(id);
          $rootScope.openid="mySidenav";
          // $rootScope.childflag=false;
          // document.getElementById(id).style.zIndex="0";
      
          // document.getElementById("mySidenav").style.zIndex=1;
      
          document.getElementById(id).style.width = "0";
      
          // document.getElementById("mySidenav").style.transform = "translate(0,0)";
      
      
      
        };
      $scope.toggleN = function() {
          if($rootScope.show==false)
          {
              $rootScope.show=true;
              console.log( $rootScope.show);
              // document.getElementById("mySidenav").style.opacity = "1";
              // document.getElementById("mySidenav").style.transform = "translate(0,0)";
      
      // document.getElementById("main").style.transform = "translate(90%,0)";
      document.getElementById("main").style.zIndex = "-100";
      // document.getElementById("mySidenav").style.width = "90%";
      
      document.getElementById("mySidenav").style.zIndex = "10";
      document.getElementById("main").style.marginLeft = "90%";
      
      // document.getElementById("main").style.position = "fixed";
      // document.getElementById("mySidenav").style.position = "fixed";
       document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      //  document.body.style.overflow = "hidden";
      
          }
          else
          {
              // document.getElementById("mySidenav").style.opacity = "0";
      
      $rootScope.show = false; 
      console.log( $rootScope.show);
      document.body.style.backgroundColor = "white";
      document.getElementById("main").style.zIndex = "10";
      
      document.getElementById("mySidenav").style.zIndex = "-100";
      
      document.getElementById("main").style.marginLeft = "0";
      // document.getElementById("mySidenav").style.width = "0";
      
      // document.getElementById("mySidenav").style.transform = "translate(-90%,0)";
      
      // document.getElementById("main").style.position = "unset";
      // document.getElementById("mySidenav").style.position = "unset";
      // document.getElementById("main").style.transform = "translate(0,0)";
      // document.body.style.overflow = "scroll";
      
      
      
      
       }
      };
      
      }
      );