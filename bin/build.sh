#/bin/bash

rm -r ../server/build/*
rm -r ../react/build/*
cd ../react/
npm install --only=prod
npm install --only=dev
npm run build
cp -R build/* ../server/build/