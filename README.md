# twitter-bot-pigii
黒澤ルビィちゃんが12時にピギィと鳴く。


## SETUP ENVIRONMENT VARIABLES
Set these value to `EC2 Parameter Store`.

 * `/pigii/consumer_key`: Twitter's consumer key
 * `/pigii/consumer_secret`: Twitter's consumer secret
 * `/pigii/access_token_key`: Twitter's access token
 * `/pigii/access_token_secret`: Twitter's access secret

## SETUP SERVERLESS SCRIPT
```
git clone https://github.com/celeron1ghz/twitter-bot-pigii.git
cd twitter-bot-pigii
sls deploy
```


## SEE ALSO
 * https://github.com/celeron1ghz/twitter-bot-pigii.git
 * https://twitter.com/noon_pigii_bot
 * http://qiita.com/celeron1ghz/items/530c5f6d9c1af449a2f4
