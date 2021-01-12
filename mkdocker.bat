docker build ./authApi -t bettingspree-auth
echo 'Tagging'
docker tag bettingspree-auth:latest bragamann/bettingspree-auth:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-auth:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-auth:2020-01-12'


docker build ./chatApi -t bettingspree-chat
echo 'Tagging'
docker tag bettingspree-chat:latest bragamann/bettingspree-chat:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-chat:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-chat:2020-01-12'


docker build ./betsApi -t bettingspree-bets
echo 'Tagging'
docker tag bettingspree-bets:latest bragamann/bettingspree-bets:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-bets:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-bets:2020-01-12'


docker build ./dataApi -t bettingspree-data
echo 'Tagging'
docker tag bettingspree-data:latest bragamann/bettingspree-data:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-data:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-data:2020-01-12'


docker build ./manutencao_DB -t bettingspree-manutencaoDB
echo 'Tagging'
docker tag bettingspree-manutencaoDB:latest bragamann/bettingspree-manutencaoDB:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-manutencaoDB:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-manutencaoDB:2020-01-12'


docker build ./interface -t bettingspree-interface
echo 'Tagging'
docker tag bettingspree-interface:latest bragamann/bettingspree-interface:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-interface:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-interface:2020-01-12'


docker build ./NGINX -t bettingspree-nginx
echo 'Tagging'
docker tag bettingspree-nginx:latest bragamann/bettingspree-nginx:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-nginx:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-nginx:2020-01-12'














docker build ./authDB -t bettingspree-authDB
echo 'Tagging'
docker tag bettingspree-authDB:latest bragamann/bettingspree-authDB:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-authDB:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-authDB:2020-01-12'


docker build ./chatDB -t bettingspree-chatDB
echo 'Tagging'
docker tag bettingspree-chatDB:latest bragamann/bettingspree-chatDB:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-chatDB:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-chatDB:2020-01-12'


docker build ./betsDB -t bettingspree-betsDB
echo 'Tagging'
docker tag bettingspree-betsDB:latest bragamann/bettingspree-betsDB:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-betsDB:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-betsDB:2020-01-12'


docker build ./dataDB -t bettingspree-dataDB
echo 'Tagging'
docker tag bettingspree-dataDB:latest bragamann/bettingspree-dataDB:2020-01-12
echo 'Pushing'
docker push bragamann/bettingspree-dataDB:2020-01-12
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/bettingspree-dataDB:2020-01-12'