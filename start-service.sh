git pull origin dev

docker image prune -a -f
docker system prune -f

echo "git pull done for dev branch"

docker-compose build --no-cache

docker-compose up -d

