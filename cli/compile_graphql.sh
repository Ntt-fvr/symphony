#!/usr/bin/env bash

gql-compiler ../graph/graphql/schema psym/graphql/
python3 ./extract_graphql_deprecations.py ../graph/graphql/schema ../docs/md/graphql-breaking-changes.md
