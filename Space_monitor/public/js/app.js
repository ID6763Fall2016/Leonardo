/**
 * Created by RC on 9/17/16.
 */
var App = angular.module('SP', [])

App.controller('SPCtrl',
    function ($scope) {

        $scope.start = function () {
            $scope.test=1;
            $scope.list= ['stu','coc','ds','ss','eer','awr','crc','trsb'];


            var socket = io();
            $scope.average=0;
            socket.on('messageFromServerToClient', function(data) {
                var chart = $('#lineChart').highcharts();
                console.log(data);
                socket.emit('messageFromClientToServer', "received: "+data);


                var x = (new Date()).getTime();
                chart.series[0].addPoint([x,data[0]], true, true);
                chart.series[1].addPoint([x,data[1]/0.9], true, true);

            });





            mapboxgl.accessToken = 'pk.eyJ1IjoicmNtZW5nOTMiLCJhIjoiYWNTRWZIdyJ9.pTxGaGk5tFqB_-R1KO1fmg';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/dark-v9',
                zoom: 17.5,
                scrollZoom:false,
                center: [-84.396,33.776]
            });


        }
        $scope.start();
    }
);
