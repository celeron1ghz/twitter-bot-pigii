package main

import (
	"context"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
)

func GetRandomPigiiString() string {
	return strings.Join([]string{
		"ピギィ",
		strings.Repeat("ィ", rand.Intn(10)),
		strings.Repeat("イ", rand.Intn(10)),
		strings.Repeat("ー", rand.Intn(5)),
		"ーーーーー",
	}, "")
}

func CreateTwitterClient() *twitter.Client {
	config := oauth1.NewConfig(os.Getenv("PIGII_CONSUMER_KEY"), os.Getenv("PIGII_CONSUMER_SECRET"))
	token := oauth1.NewToken(os.Getenv("PIGII_ACCESS_TOKEN"), os.Getenv("PIGII_ACCESS_TOKEN_SECRET"))
	httpClient := config.Client(oauth1.NoContext, token)
	return twitter.NewClient(httpClient)
}

const WAIT_THRESHOLD = 300 * time.Second

func handler(ctx context.Context, name interface{}) (interface{}, error) {
	rand.Seed(time.Now().UnixNano())

	client := CreateTwitterClient()

	now := time.Now()
	nextOclock := time.Date(now.Year(), now.Month(), now.Day(), now.Hour()+1, 0, 0, 0, time.Local)

	nowNano := now.UnixNano()
	nextOclockNano := nextOclock.UnixNano()

	diffNano := time.Duration(nextOclockNano - nowNano)

	if diffNano >= WAIT_THRESHOLD {
		fmt.Printf("Too far to invoke. invoke in %s. diff is %s\n", WAIT_THRESHOLD.String(), diffNano.String())
		return "OK", nil
	}

	pigiiString := GetRandomPigiiString()

	fmt.Printf("tweet after %s...\n", diffNano.String())
	time.Sleep(diffNano)
	client.Statuses.Update(pigiiString, &twitter.StatusUpdateParams{})

	return "OK", nil
}

func main() {
	lambda.Start(handler)
}
