# docker/go/Dockerfile
FROM mcr.microsoft.com/devcontainers/go:1-1.23-bookworm

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
RUN go install github.com/air-verse/air@latest

COPY . .