docker compose -f docker-compose.yaml -f docker-compose.test.yaml up -d
docker exec -it c0mmunify_test_api bash -c "npm install && npm run coverage"