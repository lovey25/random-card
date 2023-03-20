#!/bin/sh
echo "웹페이지 빌드"
npm run build

echo "기존 파일 삭제"
rm -rf /usr/share/hassio/homeassistant/www/randomcard/* 

echo "새로운 빌드로 배포"
cp -r /home/pi/VS_Workspace_JS/random-card/build/* /usr/share/hassio/homeassistant/www/randomcard

echo "배포완료"