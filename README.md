# NNMarketplace App
- NN NFTMarketplace application which can list, purchase and upgrade NFTs
- Frontend: Next.js + Typescript + Redux + Wagmi
- Backend: Node.js + Express.js + Mysql

## Preview
https://failiem.lv/u/752u5fare#/view/fukz7v74p

## Frontend Installation

To run this application, you need to have Node.js and NPM (or Yarn) installed on your computer.

```
cd marketplace-frontend
npm install
```

Create a .env file in the root directory by coping .env.example

### Start the application:

In the project directory, you can run:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Backend Installation

To run this application, you need to have Node.js and Mysql installed on your computer.

```
cd marketplace-backend
npm install
```

Create a .env file in the root directory by coping .env.example

### Start the application:

In the project directory, you can run:

`npm run start`


## Doc

- Buyer wants to buy the NFT A (ERC-721) that is owned by the Seller
- For Seller to their NFT, they have to list the NFT for sale first
- Once the NFT has been lifted for Sale, it should have a price
- Seller will Transfer the NFT to Middleman. Middleman will then tell the Buyer to transfer the funds to Seller. Once Seller has received the funds, Middleman will release the NFT to Buyer
- Middleman is the platform - it operates in the form of a smart contract
- Fee earned by Middleman for this TRX is 5%. If the Buyer buys for 1000 X, then Middleman earns 50 X
- Fee earners by Middleman should be further divided into three equal parts - Middleman has to pay its service providers
- Now Buyer is the new owner of the NFT
...

API Response

```
{
    "status": 200,
    "data": [
      {id: 1, token_id: 1, image: "//image_url/1", owner: "0xABC..", listed: false, price: 100},
      {id: 2, token_id: 2, image: "//image_url/2", owner: "0xABC..", listed: true, price: 300},
      ...
    ]
}
```



## License
