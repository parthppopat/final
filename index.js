  
  //  Get a reference to the "get coin" button
  let getCoinButton = document.querySelector(`.get-coin`)

  // When the "get weather" button is clicked:
  getCoinButton.addEventListener(`click`, async function(event){
  
  // - Ignore the default behavior of the button
  event.preventDefault() 
  
  // Get a reference to the element containing the user-entered country and xxx
  let coinInput = document.querySelector(`#coin`)

  // Get the user-entered location and days from the element's value
  let coin = coinInput.value
  let urlGlobal = `https://api.huobi.pro/market/detail?symbol=${coin}usdt`
  let urlKorea = `https://api.bithumb.com/public/ticker/${coin}_krw`
  let urlExRate = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`

  // Fetch the url, wait for a response, store the response in memory
  let responseGlobal = await fetch(urlGlobal)
  let responseKorea = await fetch(urlKorea)
  let responseExRate = await fetch(urlExRate)

  // Ask for the json-formatted data from the response, wait for the data, store it in memory
  let jsonGlobal = await responseGlobal.json()
  console.log(jsonGlobal)
  let jsonKorea = await responseKorea.json()
  console.log(jsonKorea)
  let jsonExRate = await responseExRate.json()
  console.log(jsonExRate)
  
  // Store the closing price in Global, closing price in Korea, and the exchange rate
  let globalPrice = jsonGlobal.tick.close
  let koreaPrice = jsonKorea.data.closing_price
  let exRateBuy = jsonExRate[0].cashBuyingPrice
  
  // Store the KIMCHI PREMIUM and Arbitrage Yield
  let koreaToGlobal = koreaPrice/exRateBuy
  let globalToKorea = globalPrice*exRateBuy
  let KoreaToGlobalYield = `${(koreaToGlobal-globalPrice)/globalPrice*100}%` 
  // console.log(globalPrice)
  // console.log(koreaPrice)
  // console.log(exRateBuy)
  // console.log(koreaToGlobal) 
  // console.log(koreaToGlobal-globalPrice) 
  // console.log(KoreaToGlobalYield)
  // console.log(globalToKorea)

  // Store a reference to the "displayPrice element"
  let displayPriceElement = document.querySelector(`.display-price`)

  // Fill the global element with the price
  displayPriceElement.insertAdjacentHTML(`beforeend`,`
  <div class= "border-2 p-4">
  <div class="font-bold"> Current price of 1 ${coin} in the Korean exchange: USD${koreaToGlobal}(KRW${koreaPrice}).
  <div class="font-bold"> Current price of 1 ${coin} in the US exchange: USD${globalPrice}(KRW${globalToKorea}).
  <div class="font-bold"> Free retun per 1 ${coin} transaction with the US investors: USD${koreaToGlobal-globalPrice}(KRW${koreaPrice-globalToKorea}).
  </div>`
  )
  
  })

firebase.auth().onAuthStateChanged(async function(user) {
if (user) {
  // Signed in
  console.log(user)
  
  // Build the markup for the sign-out button and set the HTML in the header
  document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
    <button class="text-pink-500 underline sign-out">Sign Out</button>
  `
  // get a reference to the sign out button
  let signOutButton = document.querySelector(`.sign-out`)

  // handle the sign out button click
  signOutButton.addEventListener(`click`, function(event) {
    // sign out of firebase authentication
    firebase.auth().signOut()
  
    // redirect to the home page
    document.location.href = `index.html`
  })

}  


else {
  // Signed out
  console.log('signed out')

  // Initializes FirebaseUI Auth
  let ui = new firebaseui.auth.AuthUI(firebase.auth())

  // FirebaseUI configuration
  let authUIConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: 'index2.html'
  }

  // Starts FirebaseUI Auth
  ui.start('.sign-in-or-sign-out', authUIConfig)
}
})
