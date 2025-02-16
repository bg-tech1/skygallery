FROM golang:1.23.4-alpine3.21 as dev

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go install github.com/air-verse/air@v1.61.7

CMD ["go", "run", "./app/main.go"]