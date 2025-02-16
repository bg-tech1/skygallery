FROM golang:1.23-alpine as dev

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go install github.com/air-verse/air@v1.61.7

CMD ["go", "run", "./main.go"]