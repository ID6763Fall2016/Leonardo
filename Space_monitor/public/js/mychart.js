/**
 * Created by RC on 9/17/16.
 */
// Data retrieved from http://vikjavev.no/ver/index.php?spenn=2d&sluttid=16.06.2015.
$(function () {

    /**
     * Dark theme for Highcharts JS
     * @author Torstein Honsi
     */

// Load the fonts
    Highcharts.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Unica+One',
        rel: 'stylesheet',
        type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

    Highcharts.theme = {
        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
            "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        chart: {
            backgroundColor: 'rgba(22,22,22,0.85);',
            style: {
                fontFamily: "'Unica One', sans-serif"
            },
            plotBorderColor: '#606063'
        },
        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            }
        },
        legend: {
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        credits: {
            style: {
                color: '#666'
            }
        },
        labels: {
            style: {
                color: '#707073'
            }
        },

        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },

        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },

        // scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },

        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },

        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(22,22,22,0.75)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
    };

// Apply the theme
    Highcharts.setOptions(Highcharts.theme);


    var chartInterval=1000;
    var chartNum=40;



    $('#lineChart').highcharts({
        chart: {
            type: 'spline',
            animation: false, // don't animate in old IE
            marginRight: 10

        },
        title: {
            text: 'Wind speed during two days'
        },
        subtitle: {
            text: 'May 31 and and June 1, 2015 at two locations in Vik i Sogn, Norway'
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: 'Sound value'
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{ // Light air
                from: 20,
                to: 30,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Light air',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 30,
                to: 40,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Light breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 40,
                to: 60,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Gentle breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 60,
                to: 70,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Moderate breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 80,
                to: 110,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Fresh breeze',
                    style: {
                        color: '#606060'
                    }
                }

            }]
        },
        tooltip: {
            valueSuffix: ' Db',
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
                //pointInterval: 10 // one hour
                //ointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
            }
        },
        series: [{
            name: 'Average value',
            data: (function() {
                // generate an array of random data

                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -chartNum; i <= 0; i++) {
                    data.push({
                        x: time + i * chartInterval,
                        y: Math.random()*10+40
                    });
                }
                return data;
            })()
        }, {
            name: 'Current value',
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -chartNum; i <= 0; i++) {
                    data.push({
                        x: time + i * chartInterval,
                        y: Math.random()*10+40
                    });
                }
                return data;
            })()
        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });


    mapboxgl.accessToken = 'pk.eyJ1IjoicmNtZW5nOTMiLCJhIjoiYWNTRWZIdyJ9.pTxGaGk5tFqB_-R1KO1fmg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        zoom: 17,
        doubleClickZoom:false,
        scrollZoom:false,
        //zoom: 15,
        pitch: 10,
        //center: [-71.97722138410576, -13.517379300798098]
        center: [-84.396,33.776]
    });


    map.on('load', function () {
        map.addSource('study', {
            "type": "geojson",
            "data": "js/study.geojson"
        });
        map.addSource('key', {
            "type": "geojson",
            "data": {
                "type"      : "Feature",
                "properties": {},
                "geometry"  : {
                    "coordinates": [
                        -84.396038,
                        33.776182
                    ],
                    "type"       : "Point"
                },
                "id"        : "82247790a3f91dd0cb62fc3390eb652a"
            }
        });

        map.addLayer({
            'id'          : 'study',
            'type'        : 'circle',
            'source'      : 'study',
            'layout'      : {
                'visibility': 'visible'
            },
            'paint'       : {
                'circle-radius': 10,
                'circle-color' : 'rgba(143,237,126,0.8)'
            }
        });
        map.addLayer({
            'id'          : 'key',
            'type'        : 'circle',
            'source'      : 'key',
            'layout'      : {
                'visibility': 'visible'
            },
            'paint'       : {
                'circle-radius': 20,
                'circle-color' : 'rgba(143,237,126,0.8)'
            }
        });







        map.on('click', function (e) {
            // Use queryRenderedFeatures to get features at a click event's point
            // Use layer option to avoid getting results from other layers
            var features = map.queryRenderedFeatures(e.point, { layers: ['study','key'] });
            // if there are features within the given radius of the click event,
            // fly to the location of the click event

            if (features.length) {
                var c=features[0].geometry.coordinates;
                map.flyTo({center: [c[0]+0.0008,c[1]-0.0005]});
            }
            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.
            var popup = new mapboxgl.Popup()
                .setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.description)
                .addTo(map);
        });





// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
        map.on('mousemove', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['symbols'] });
            map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });








        var socket = io();

        socket.on('messageFromServerToClient', function(data) {
            var chart = $('#lineChart').highcharts();

            socket.emit('messageFromClientToServer', "received: "+data);


            var colorP, sizeP;
            var f=data[1]-data[0];
            console.log(f);
            sizeP=data[1]/6+8;
            if(f<-30){
                colorP="#A5B8FF";
            }
            else if(f>-30&&f<-10){
                colorP="#97EAFF";
            }
            else if(f>-10&&f<10){
                colorP="#7bc66d";
            }
            else if(f>10&&f<30){
                colorP="#FFDE74";
            }
            else{
                colorP="#FF7458";
            }





            map.setPaintProperty('key', 'circle-color', colorP);
            map.setPaintProperty('key', 'circle-radius', sizeP);


            var x = (new Date()).getTime();
            chart.series[0].addPoint([x,data[0]], true, true);
            chart.series[1].addPoint([x,data[1]], true, true);

        });






    });







});