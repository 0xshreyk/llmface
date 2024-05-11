package accountsprovider

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"

	"github.com/gorilla/mux"
	"github.com/redis/go-redis/v9"
	"net/http"
)

var ctx = context.Background()

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " +
			"www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().
		ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	r := mux.NewRouter()
	r.HandleFunc("/accounts/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Health is up")
	})
	r.HandleFunc("/get/account/info/:id", func(w http.ResponseWriter, r *http.Request) {

	})
}
