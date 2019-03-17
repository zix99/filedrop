#!/bin/bash
npm version patch
git push
git push --tags

npm publish --access public

docker build . \
  --tag zix99/filedrop:latest \
  --tag zix99/filedrop:$(npm info @zix99/filedrop version)

docker push zix99/filedrop