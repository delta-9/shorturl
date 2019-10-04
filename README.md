# shorturl

Makes long url ... short

## Description

- Create a randomly generated short ID for a given URL.
- If the same URL are provided twice, the short ID is not reused.
- The tool do not use the URL as a seed for the short ID creation.
- The short ID length is 7 and a lookup is done at the creation time to avoid collision, you can look at <https://zelark.github.io/nano-id-cc/> using the alphabet with no look alike `23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstwxyz` to see the chance of ID collision based on utilisation.
- The Short ID is generated from alphabetical and numeric characters only and look alike characters like `0`/`O` or `I`/`1` are prohibited, see <https://github.com/CyberAP/nanoid-dictionary/blob/master/nolookalikes.js>
- You can't short an URL from the tool domain (you can try to short <https://shorter.now.sh/whatever> to see the form error state).

## Testing

- Clone this repo and run `make start` at the root
- Open <http://localhost:9556>

## Development

- Clone this repo and run `make start` at the root
- Run `yarn install`
- Run `yarn dev`
- Open <http://localhost:3000>

## Deployment

- use the serverless service now.sh to run the api.
- use the AWS free tiers for the mysql database.
- <https://shorter.now.sh/>

## Stack

- 2 Lambda functions:
  - Api endpoint to create and save the short URL
  - Handler to redirect the short url to the original url
- Node.js
- Mysql
- Nanoid - <https://github.com/ai/nanoid/>
- Next.js
- React
- Robot - <https://thisrobot.life/>
- CSS - <https://github.com/zeit/styled-jsx>

## Possible security/scalability issue

- Environment and library security updates
  - One could monitor security channels and put alert in place to update the libraries / environment.
- API floods
  - One could implement some Rate limiting or captcha
- Database overflow.
  - One could use database clusters.
- Too many request to the API (memory / CPU issue)
  - The api functions are designed to be used in a serverless configuration, or in a cluster, so one could configure the infrastructure accordingly.
