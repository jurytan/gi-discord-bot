docker build -t katheryne-bot ..
docker run --env-file "../.env" -d katheryne-bot 