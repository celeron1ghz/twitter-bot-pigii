# twitter-bot-pigii
黒澤ルビィちゃんが12時にピギィと鳴く。


## SETUP
### 環境変数の設定
下記の値をEC2 Parameter Storeに設定する。

 * PIGII_CONSUMER_KEY ...
 * PIGII_CONSUMER_SECRET ...
 * PIGII_ACCESS_TOKEN_KEY ...
 * PIGII_ACCESS_TOKEN_SECRET ...

### serverlessでセットアップ
```
git clone https://github.com/celeron1ghz/twitter-bot-pigii.git
cd twitter-bot-pigii
sls deploy
```


## REQUIRED CREDSTASH VARIABLES
 * `PIGII_CONSUMER_KEY`: Twitterのconsumer key
 * `PIGII_CONSUMER_SECRET`: Twitterのconsumer secret
 * `PIGII_ACCESS_TOKEN_KEY`: Twitterのaccess token
 * `PIGII_ACCESS_TOKEN_SECRET`: Twitterのaccess secret


## SEE ALSO
 * https://github.com/celeron1ghz/twitter-bot-pigii.git
 * https://twitter.com/noon_pigii_bot
 * http://qiita.com/celeron1ghz/items/530c5f6d9c1af449a2f4
