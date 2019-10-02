# shorturl
Makes long url ... short

## Stack
 - Node.js
 - Mysql
 - Nanoid - https://github.com/ai/nanoid/
 - Next.js
 - React
 - Robot - https://thisrobot.life/
 - CSS - https://github.com/zeit/styled-jsx
 
## Possible security issue
 - One could flood the API with requests
   - To solve that, one could implement some API limitations (time and count)
 - The database table that store the short urls could overflow.
   - To solve that one could use database clusters. 
