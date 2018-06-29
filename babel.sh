#bin/#!/usr/bin/env bash

echo "Babel watching:" $1 "-> scripts/"$1
babel src/$1 --out-file=public/scripts/app.js --presets=env,react --watch
