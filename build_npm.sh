# Package Build Script
#
# FURI - Fast Uniform Resource Identifier
#
# The Fast and Furious Node Router
# Copyright(c) 2016 Rajinder Yadav
#
# Labs DevMentor.org Corp. <info@devmentor.org>

#!/usr/bin/env bash

printf "Building NPM Package\n";

if [ -d "furi_npm_module/lib/" ]; then
   printf "Clearning up module lib folder\n"
   pushd furi_npm_module/lib/ > /dev/null
   mv index.ts ../
   rm *
   mv ../index.ts .
   popd > /dev/null
fi

cp furi_node_router/src/furi.ts furi_npm_module/lib

if [ -e furi_node_router/src/furi.ts ]; then
   pushd furi_npm_module/ > /dev/null

   if [ -e "furi-*.tgz" ]; then
      printf "Deleting old zipped furi package\n"
      rm furi-*.tgz
   fi

   printf "Creating NPM package\n"
   ./node_modules/typescript/bin/tsc -d

   if [ ! -f "lib/furi.js" ]; then
      printf "Error : Compiling furi\n"
      exit 1
   fi

   printf "Minifying furi.js\n"
   #npm run uglifyjs

   FURI_TGZ=$(npm pack)
   if [ $? -eq 0 ]; then
      printf "Success!\n"
   fi
   popd > /dev/null
fi

printf "Copying NPM package to furiapp folder\n";
pushd furiapp/ > /dev/null
rm furi-*.tgz
rm -rf node_modules/
cp ../furi_npm_module/furi-*.tgz .

printf "Install NPM package\n";
npm install ${FURI_TGZ}
popd
if [ $? -eq 0 ]; then
   printf "Success!\n"
fi

