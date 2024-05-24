package main

import (
	// "bufio"
	"context"
	// "encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"encoding/json"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func delay() any {
	time.Sleep(2 * time.Second)
	return 3
}
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
	coll := client.Database("llmface").Collection("users") // selecting

	r := mux.NewRouter()
	r.HandleFunc("/accounts/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Healthy"))
	})
	/*
	* Function taking the username (id)
	 */
	 r.HandleFunc("/get/account/info/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		fmt.Print(id)
	
		filter := bson.D{{"creds.username", id}}
	
		var result bson.M
		err := coll.FindOne(context.TODO(), filter).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				http.Error(w, "User not found", http.StatusNotFound)
				return
			}
			log.Fatal(err)
		}
		
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		response, err := json.Marshal(result)
		if err != nil {
			http.Error(w, "Error marshalling response", http.StatusInternalServerError)
			return
		}
		w.Write(response)
	})
	
	http.ListenAndServe(":8080", r)
}
