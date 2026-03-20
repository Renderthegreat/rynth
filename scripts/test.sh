#!/bin/bash
set -e;

./scripts/build.sh;

echo "Installing Rynth...";
sudo npm link rynth;

echo "Running tests...";
node dist/index.js;