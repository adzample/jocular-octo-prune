'use strict';

angular.module('jocularOctoPruneApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $window) {
    $scope.awesomeThings = [];
    $scope.makeBlue = makeBlue;
    $scope.clickedBegin = false;
    $scope.notConfirmed = true;
    $scope.readyToBlue = false;
    $scope.clickedUploaded = false;
    $scope.completedDonation = false;
    $scope.counter = 5;
    $scope.step = 'step1'
    $scope.clickedSupport = clickedSupport;
    $scope.confirmDonation = confirmDonation;
    $scope.clickedUpload = clickedUpload;
    $scope.toggledClass = false;
    // $scope.makeBlue2 = makeBlue2;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    if( !HTMLCanvasElement.prototype.toBlob ) {
    Object.defineProperty( HTMLCanvasElement.prototype, 'toBlob', { 
            value: function( callback, type, quality ) {
                const bin = atob( this.toDataURL( type, quality ).split(',')[1] ),
                      len = bin.length,
                      len32 = len >> 2,
                      a8 = new Uint8Array( len ),
                      a32 = new Uint32Array( a8.buffer, 0, len32 );
                for( var i=0, j=0; i < len32; i++ ) {
                    a32[i] = bin.charCodeAt(j++)  |
                        bin.charCodeAt(j++) << 8  |
                        bin.charCodeAt(j++) << 16 |
                        bin.charCodeAt(j++) << 24;
                }
                var tailLength = len & 3;
                while( tailLength-- ) {
                    a8[ j ] = bin.charCodeAt(j++);
                }
                callback( new Blob( [a8], {'type': type || 'image/png'} ) );
            }
        });
    }

    $scope.countdown = function() {
      if($scope.counter>0){
        var stopped = $timeout(function() {
           console.log($scope.counter);
         $scope.counter--;   
         $scope.countdown();   
        }, 1000);
      }else{
        $window.open('https://www.beyondblue.org.au/get-involved/make-a-donation/step-1-make-a-donation', '_blank');
        $scope.step = 'step2'
      }
    };


    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img,0,0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);             
    }


    var canvas = document.getElementById('imageCanvas');


    function makeBlue(){

      console.log('yo')
      Caman('#imageCanvas', function () {
      this.colorize(0, 30, 255, 40);        
      this.newLayer(function () {
          // var context = canvas.getContext('2d');
          // var imageObj = new Image();
          // imageObj.onload = function() {
          //     context.drawImage(imageObj, 40, canvas.height-120);
          // };
          // imageObj.src = 'assets/images/yeoman.png';
          this.overlayImage("assets/images/logo.png");
      });
      this.render(function () {
          // this.toBase64(); 
          canvas.toBlob(function(blob) {
            saveAs(blob, "image.jpg");
            $timeout(function() {$scope.completedDonation=false;}, 1500)
          });         
        });
        

      });
      // this.colorize(0, 50, 255, 40);
      
    // });
    }

    function clickedSupport() {
      $scope.clickedBegin = true;
      $scope.countdown();
    }

    function confirmDonation(){
      $scope.notConfirmed = false
      $timeout(function() {$scope.toggledClass=true}, 500)
      $timeout(function() {$scope.clickedBegin=false; $scope.completedDonation=true;}, 2500)
    }

    function clickedUpload(){
      $scope.clickedUploaded = true;
    }

  });
