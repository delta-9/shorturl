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
 - https://shorter.now.sh/

## Stack
 - 2 Lambda functions: 
   - Api endpoint to create and save the short URL
   - Handlers to redirect short url to their original urls
 - Node.js
 - Mysql
 - Nanoid - https://github.com/ai/nanoid/
 - Next.js
 - React
 - Robot - https://thisrobot.life/
 - CSS - https://github.com/zeit/styled-jsx
 
## Possible security/scalability issue
 - Environment and library security updates
   - One could monitor security channels and put alert in place to update the libraries / environment.
 - API floods
   - One could implement some API limitations (time and count)
 - Database overflow.
   - One could use database clusters.
 - Too many request to the API (memory / CPU issue)
   - The api functions are designed to be used in a serverless configuration, or in a cluster, so one could configure the infrastructure accordingly. 

