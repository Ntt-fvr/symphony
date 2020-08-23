#!/usr/bin/env bash

python3 -m graphql_compiler.gql.cli ../graph/graphql/schema psym/graphql/
# python3 -m graphql_compiler.gql.cli ../../hub/models pyhub/graphql/
python3 ./extract_graphql_deprecations.py ../graph/graphql/schema ../docs/md/graphql-breaking-changes.md
