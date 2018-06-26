 $ (function (){ 
     var apiData;
   var C = true;
   //images for the background when the weather changes
   var backgroundImg =[
'https://positively.com/files/THUNDERSTORM_Featured.jpg',
'https://i.ytimg.com/vi/LbAigABOm_E/maxresdefault.jpg',
'http://cdn.abclocal.go.com/content/wtvd/images/cms/automation/images/511280_1280x720.jpg',
'http://cdn.images.express.co.uk/img/dynamic/153/590x/secondary/uk-snow-478595.jpg', 
'https://www.quotemaster.org/images/af/afe2d12019c50287052148c0f00f1c84.jpg',
'https://cn.pling.com/img//hive/content-pre1/54633-1.jpg',
'http://www.airninja.com/pictures/great-ocean-road/beach-sky.jpg',
'https://www.mos.org/sites/dev-elvis.mos.org/files/images/main/uploads/slides/imax_extreme-weather_tornado.jpg']    
   //time month year
   var dt = new Date()
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  $('#day').html(days[dt.getDay()]);
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
  $('#time').html((dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());
   
function displayTemp(F,C){
    if (C) return Math.round ((F*9) / 5 + 32) +'&deg; F';
    return Math.round (F) + '&deg; C';
      }
   
 
   function render(data,C){
     var currentWeather=data.weather[0].main;
     var wind_speed=data.wind.speed;
     var currentTemp=displayTemp(data.main.temp,C);
     var humidity = data.main.humidity;
     var pressure = data.main.pressure;
     var icon = data.weather[0].icon;
      $('#wind_speed').html(wind_speed+" mPs");
      $('#currentWeather').html(currentWeather); 
      $('#currentTemp').html(currentTemp);
      $('#humidity').html(humidity+"%");
      $('#pressure').html(pressure+' mBar');
     
    
     $('#currentTemp').prepend('<img src='+ icon+'>');
   }
    $.getJSON('https://freegeoip.net/json/').done(function(location){  
     //console.log(location); works
 $('#country').html(location.country_name);   
 $('#city').html(location.city);
 $('#latitude').html(location.latitude);   
 $('#longitude').html(location.longitude); 
 $('#zip_code').html(location.zip_code);
 $('#region_code').html(location.region_code);
 $('#country_name').html(location.country_name);  
 
      
   var weaApi='https://fcc-weather-api.glitch.me/api/current?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=06986e2720ce0175dc6f87d8b897dffdf';
    $.getJSON(weaApi,function(data){
        apiData=data;
        render(apiData,C);
     //   console.log(apiData); // works
        $('#toggle').click(function(){
          C=!C
          render(data,C);
          
        })
      var id = data.weather[0].id,
      bgIndex,
      backgroundId=[299,499,599,699,799,800,906];
      backgroundId.push(id);
      bgIndex=backgroundId.sort().indexOf(id);
      
     // console.log(backgroundId);
      $('body').css('background-image','url('+backgroundImg[bgIndex]+')');
    });
                });
 });