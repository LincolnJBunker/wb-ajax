import axios from 'axios';

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  const response = await axios.get('https://dog.ceo/api/breeds/image/random');
  //this code sets a var named response to the api request for dog images
  const imageUrl = response.data.message;
  //this code sets a var named imageURl to the previous var response that filters through it via data.message
  document.querySelector('#dog-image').innerHTML = `<img src=${imageUrl}>`;
  //this a query selector that will display the image of the url of the dog api
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);
//on this event listener, when the get-dog-image is clicked, the function showDogPhoto will run

// PART 2: Show Weather

async function showWeather(evt) {
  // TODO: request weather with that URL and show the forecast in #weather-info
  const zipcode = document.querySelector('#zipcode-field').value;
  //zipcode is a var that is set to the query selector of the text box where you input the zipcode. .value has to do with numbers
  const url = `/weather.txt?zipcode=${zipcode}`;
  //url is a var that will be a link and whatever the zipcode inserted is
  const response = await axios.get(url);
  //response is a var that uses axios to get the url
  document.querySelector("#weather-info").innerText = response.data
  //this a query selctor that will put  the inner text to whatever response.data is
}

document.querySelector('#weather-button').addEventListener('click', showWeather);
//this a query selector , when the weather button is clicked, the function showWeather will run

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  evt.preventDefault();
  // TODO: show the result message after your form
  const cookieType = document.querySelector("#cookie-type-field").value;
  const qty = document.querySelector("#qty-field").value;
  const response = await axios.post(
    '/order-cookies.json',
    { 
      cookieType: cookieType, 
      qty: qty 
    }
  );
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  const orderStatus = document.querySelector("#order-status")
  orderStatus.innerText = response.data.message;
  if (response.data.resultCode === 'ERROR'){
    orderStatus.classList.add('order-error');
  } else {
    orderStatus.classList.remove('order-error')
  }
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search


async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  
  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  
  const response = await axios.get(url)
  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
  let displayStr = "";
  for (const result of response.data.results){
    displayStr += `<li>Artist:${result.artistName} Song: ${result.trackName}</li>`
    console.log(response.data)
  }
  document.querySelector("#itunes-results").innerText = displayStr
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
