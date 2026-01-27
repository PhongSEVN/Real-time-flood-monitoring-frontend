#!/bin/bash

# ===========================================
# Deploy Script for Flood Monitoring Backend
# ===========================================
# Chạy: chmod +x deploy.sh && ./deploy.sh
# ===========================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Flood Monitoring Backend Deploy     ${NC}"
echo -e "${BLUE}========================================${NC}"

# Di chuyển đến thư mục project
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "\n${YELLOW}[1/5] Pulling latest code from Git...${NC}"
git fetch origin
git pull origin main

echo -e "\n${YELLOW}[2/5] Building Java application...${NC}"
./mvnw clean package -DskipTests

echo -e "\n${YELLOW}[3/5] Stopping existing containers...${NC}"
docker-compose down

echo -e "\n${YELLOW}[4/5] Starting Docker containers...${NC}"
docker-compose up -d

echo -e "\n${YELLOW}[5/5] Waiting for services to be ready...${NC}"
sleep 10

# Kiểm tra trạng thái các container
echo -e "\n${GREEN}Container Status:${NC}"
docker-compose ps

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}   Deploy completed successfully!      ${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e ""
echo -e "Services:"
echo -e "  - PostgreSQL/PostGIS: ${BLUE}localhost:5432${NC}"
echo -e "  - PgAdmin:            ${BLUE}http://localhost:5050${NC}"
echo -e "  - GeoServer:          ${BLUE}http://localhost:8081/geoserver${NC}"
echo -e "  - Backend API:        ${BLUE}http://localhost:8080${NC}"
echo -e ""
echo -e "To view logs: ${YELLOW}docker-compose logs -f${NC}"
