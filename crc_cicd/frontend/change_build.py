#!/usr/bin/python3

import json
import sys

if len(sys.argv) < 3:
    raise SystemExit('Missing parameters')

build_number = sys.argv[1]

try:
    with open('package.json', 'r') as f:
        package = json.load(f)
    package['version'] = build_number
    with open('package.json', 'w') as f:
        json.dump(package, f, indent=2)
except FileNotFoundError:
    raise SystemExit('File package.json not found')

print(f'Successful change build version to {build_number}')
