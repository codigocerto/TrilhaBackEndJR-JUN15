FROM golang:1.18.1

WORKDIR /app

COPY go.mod .
COPY go.sum .

COPY . .

RUN go build -o main ./cmd/app/

CMD [ "./main" ]