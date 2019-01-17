#/bin/bash

rm -r ../server/build/*
rm -r ../react/build/*
cd ../react/
npm install
npm run build
cp -R build/* ../server/build/