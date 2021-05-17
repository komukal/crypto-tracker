# crypto-tracker
### Short description
crypto-tracker is a mobile app project made for people who have various crypto currencies in different wallets/services.The application only tracks the values and does not require deposits/logins/verification or anything else. All data is located only on your phone. The project is a part of Haaga-Helia's "Mobile Programming" course
#### Main features of the application:

* Adding crypto currencies to your own page, with the ability to note down which wallet or service the cryoto currency is located. The app support many of the same crypto in different wallets.
* A top 20 cryptos page. The items on this page are ordered by marketcap.
* Euro to crypto converter, to easily calculate how much you could buy of a certain crypto currency
* Daily value reminding notification. You can choose which crypto currency you want to be updated about.

### Technologies used

The application is built using Expo and React-Native.
Data is provided by [CoinMarketCap's API](https://coinmarketcap.com/api/), and for development purposes i have used CMC's sandbox api, which has apparently serves historical data. Since the app is not public/in actual use i have not used the proper API due to constraints with the API call credits. If i were to publish the application it would only require changing the subdomain on the api URL from 

> https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1&EUR&convert=eur

To

>https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1&EUR&convert=eur

Also when using the pro-api you have to add your API key to the headers of the requests:

| KEY        | VALUE           
| ------------- |-------------| 
|   X-CMC_PRO_API_KEY  | d3******-****-****-****-**********0c | 
 
### Screenshots from the Application

## My cryptos page
![Screenshot_20210517-224404](https://user-images.githubusercontent.com/23129834/118551047-2168de00-b766-11eb-9b16-80e8f54aeb94.jpg)

## Top 20 page
![Screenshot_20210517-224426](https://user-images.githubusercontent.com/23129834/118551062-2463ce80-b766-11eb-8dfe-a4787cee1125.jpg)

## Euro to Crypto converter page
![Screenshot_20210517-224453](https://user-images.githubusercontent.com/23129834/118551092-2e85cd00-b766-11eb-92b4-611972732982.jpg)

## Value alerts page
![Screenshot_20210517-224529](https://user-images.githubusercontent.com/23129834/118551112-35acdb00-b766-11eb-9451-e1242c8f6bd1.jpg)

