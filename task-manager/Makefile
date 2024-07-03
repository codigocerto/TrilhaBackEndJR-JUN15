.PHONY: generate
generate:
	@echo "==> Go Generating"
	@go generate ./...
	@echo "Running swag init"
	@swag init -d app/gateway/http -g router.go -o docs/swagger
