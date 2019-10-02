# shorturl
Makes long url ... short

## Testing
 - Clone this repo and run `make start` at the root
 - Open http://localhost:9556
 
## Development
 - Clone this repo and run `make start` at the root
 - Run `yarn install`
 - Run `yarn dev`
 - Open http://localhost:3000

## Deployment
 - use the serverless service now.sh to run the api.
 - use the AWS free tiers for the mysql database.
 - https://shorturl.vincentb.now.sh/

## Stack
 - Node.js
 - Mysql
 - Nanoid - https://github.com/ai/nanoid/
 - Next.js
 - React
 - Robot - https://thisrobot.life/
 - CSS - https://github.com/zeit/styled-jsx
 
## Possible security/scalability issue
 - One could flood the API with requests
   - To solve that, one could implement some API limitations (time and count)
 - The database table that store the short urls could overflow.
   - To solve that one could use database clusters.
 - Too many request to the API
   - The api is already designed to be used in a serverless configuration, or in a cluster of servers. 

