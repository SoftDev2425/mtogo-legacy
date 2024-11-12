#!/bin/bash

echo "Stopping and removing existing Docker Compose services..."
docker-compose down --remove-orphans

echo "Services stopped and removed successfully."

echo "Pulling the latest Docker images..."
docker-compose pull
echo "Docker images pulled successfully."

echo "Starting Docker Compose services with a rebuild..."
docker-compose up --build --remove-orphans -d
echo "Docker Compose services started successfully!"
