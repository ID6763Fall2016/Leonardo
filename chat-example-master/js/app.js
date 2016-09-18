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
            socket.on('messageFromServerToClient', function(incomingData) {
                console.log(incomingData);
                socket.emit('messageFromClientToServer', "received: "+incomingData);

                var chart = $('#container').highcharts();
                var x = (new Date()).getTime();
                chart.series[0].addPoint([x,incomingData], true, true);
                myList=incomingData;
            });
        }
        $scope.start();
    }
);
