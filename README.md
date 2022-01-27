# crypto-tracker
### Short description
crypto-tracker is a mobile app made for people who have various crypto currencies in different wallets/services.The application only tracks the values and does not require deposits/logins/verifications or anything else.

### Screenshots from the Application

![imageonline-co-merged-image (1)](https://user-images.githubusercontent.com/23129834/118552468-aa344980-b767-11eb-88b8-888f58a182da.png)



#### Main features of the application:

* Adding crypto currencies to your own page, with the ability to note down which wallet or service the cryoto currency is located. The app support many of the same crypto in different wallets.
* A top 20 cryptos page. The items on this page are ordered by marketcap.
* Euro to crypto converter, to easily calculate how much you could buy of a certain crypto currency
* Daily value reminding notification. You can choose which crypto currency you want to be updated about.

### Technologies used

The application is built using Expo and React-Native.
Data is provided by [CoinMarketCap's API](https://coinmarketcap.com/api/), and for development purposes i have used CMC's sandbox api, which apparently serves historical data. Since the app is not public/in actual use i have not used the proper API due to constraints with the API call credits. If i were to publish the application it would only require changing the subdomain on the api URL from 

> https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1&EUR&convert=eur

To

>https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1&EUR&convert=eur

Also when using the pro-api you have to add your API key to the headers of the requests:

| KEY        | VALUE           
| ------------- |-------------| 
|   X-CMC_PRO_API_KEY  | d3******-****-****-****-**********0c | 
 
Also in the app i have used EXPO notifications

### Link to expo installation

[crypto-tracker on expo](https://expo.io/@komukal/projects/crypto-tracker)
 
### Known issues

* If the app is open for a while, it starts to slow down and might possibly throw some error code. This has most likley something to do with the fetching data from the api many times possibly because of state changes.
* The convert page will crash the app if you dont allow it some time to fetch the data after changing the currency
* Notifications are a bit WIP, i have not been able to display up to date data from the API in the notification. I have not been able yet to find a proper solution since expo's notification package just got renewd and combines multiple packages so the documentation for the notifications are a bit contradictory.



