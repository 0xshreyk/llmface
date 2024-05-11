package main

import (
	// "bufio"
	"context"
	// "encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	// "time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " +
			"www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	r := mux.NewRouter()
	r.HandleFunc("/accounts/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Health is up")
	})
	r.HandleFunc("/get/account/info/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		fmt.Print(id)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(""))
	})

	http.ListenAndServe(":8080", r)
}
