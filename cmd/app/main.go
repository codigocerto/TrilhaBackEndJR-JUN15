package main

import (
	"github.com/andrepreira/shortcut-link-api/api/router/hello"
)

func main() {
	r := hello.SetupRouter()
	r.Run(":8080")
}
