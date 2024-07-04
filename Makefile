TEST_DIR=tests

test:
	go test -v ./$(TEST_DIR)

.PHONY: test
