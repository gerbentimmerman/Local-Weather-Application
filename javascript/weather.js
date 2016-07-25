$(document).ready(function () {
    $('#btnInit').on("click",function() {
        var switchBtn;
        var unit = "metric";
        var type = "degrees celsius";
        var numBtn = 0;

        if (navigator.geolocation) {
            function initiate_geolocation() {
                navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
            }

            function handle_errors(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                        break;
                    case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                        break;
                    case error.TIMEOUT: alert("retrieving position timed out");
                        break;
                    default: alert("unknown error");
                        break;
                }
            }

            function handle_geolocation_query(position) {
                var lat = position.coords.latitude, long = position.coords.longitude;
                var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=73498d4a5a9d4dc897184ae39cbcd239&units=" +unit;

                $.getJSON(openWeatherURL, function (a) {
                    $("#celsiusFahr-btn").html('<button id="btnSwitch" class="btn btn-primary button">Switch to Fahrenheit</button>');
                    $("#degree").html('<img src="http://openweathermap.org/img/w/' + a.weather[0].icon + '.png" class="icon"><br><div id="sign"></div>');
                    $("#sign").html(a.main.temp + ' &deg;C');
                    $("#city").html(a.name + ", " + a.sys.country);
                    $('#tweet').on('click', function() {
                        window.open("https://twitter.com/intent/tweet?hashtags=LocalWeather&text=" + encodeURIComponent('It is ' + a.main.temp + ' ' + type + ' here in ' + a.name + ", " + a.sys.country), "my_window", "height=400, width=400");
                    });
                });

                $("#celsiusFahr-btn").on("click", function () {
                    if (numBtn === 0) {
                        switchBtn = "Switch to Celsius";
                        unit = "imperial";
                        numBtn = 1;
                    }
                    else if (numBtn === 1) {
                        switchBtn = "Switch to Fahrenheit";
                        unit = "metric";
                        numBtn = 0;
                    }
                    var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=73498d4a5a9d4dc897184ae39cbcd239&units=" + unit;
                    $.getJSON(openWeatherURL, function (a) {
                        $("#degree").html('<img src="http://openweathermap.org/img/w/' + a.weather[0].icon + '.png" class="icon"><br><div id="sign"></div>');
                        if (unit == "metric") {
                            type = "degrees celsius";
                            $("#sign").html(a.main.temp + ' &deg;C');
                            $('#tweet').on('click', function() {
                                window.open("https://twitter.com/intent/tweet?hashtags=LocalWeather&text=" + encodeURIComponent('It is ' + a.main.temp + ' ' + type + ' here in ' + a.name + ", " + a.sys.country), "my_window", "height=400, width=400");
                            });
                        }
                        else if (unit == "imperial"){
                            type = "degrees fahrenheit";
                            $("#sign").html(a.main.temp + ' &deg;F');
                            $('#tweet').on('click', function() {
                                window.open("https://twitter.com/intent/tweet?hashtags=LocalWeather&text=" + encodeURIComponent('It is ' + a.main.temp + ' ' + type + ' here in ' + a.name + ", " + a.sys.country), "my_window", "height=400, width=400");
                            });
                        }
                    });
                    $("#celsiusFahr-btn").html('<button id="btnSwitch" class="btn btn-primary button">'+switchBtn+'</button>');

                });

            }

            initiate_geolocation();
        } // End of if navigation statement
    }); // END of Find Location Click
}); // END of Document Ready