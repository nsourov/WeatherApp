function geocode(){
  var input = $('input').val();
  let location = input;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyDN96lf2Q1ryYwYevi2QKLZboxk3ILPGCk'
    }
  })
  .then((res)=> {
    let address = res.data.results[0].formatted_address;
    let lat = res.data.results[0].geometry.location.lat;
    let lng = res.data.results[0].geometry.location.lng;
    url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`;
    $.ajax({
      url: url
    }).done(function(data) {
      let f = (data.main.temp) * 1.8 + 32;
      $('.image').attr('src', data.weather[0].icon)
      $('.temp1').text(`${data.main.temp} C`)
      $('.temp2').text(` / ${f} F`)
      $('.city').text(address)
      $('.des').text(data.weather[0].description)
    });
  })
  .catch((err) => {
    console.log(err)
  })
}
$('button.get').on('click',geocode)