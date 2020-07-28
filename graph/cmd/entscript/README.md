# Entscript

This binary should be used to run custom ent "scripts" on the database.
This is safer than performing manual sql queries on database.


## How to test

First add your lines in the relevant function in the tool

Build and re-create graph
```
$ docker-compose build graph
$ docker-compose up -d

```

Connect to graph docker instance
```
$ docker-compose exec graph /bin/sh
```

From docker instance
```
$ /bin/entscript --tenant=fb-test --user=fbuser@fb.com
```

## How to run in production

### Connect to production pods
- Connect to production context
```kubectl config use-context symphony-production```
- Verify you're on the right context (where the "*" is)
```kubectl config get-contexts``` 
- Find the pod names and choose one of the graph's pods (for later use in {graph_pod_name})
```kubectl get pods```

### Prepare and make the changes locally

- Find the github revision that is currently in production. It can be found in the output of the ```kubectl describe```  command, by finding the "Image" field and copying the suffix. for example:
  -  For an output that looks like this :  ```Image:          facebookconnectivity-symphony-docker.jfrog.io/graph:ddfd4f11851c02961d38b9036057887e0cb087f5```
  - The github revision is **ddfd4f11851c02961d38b9036057887e0cb087f5**
```
$ kubectl describe pod {graph_pod_name} # from previous steps
```

- Checkout the symphony github repository to the correct revision
```
$ git reset --hard {github_revision}
```
- Now make the desired changes to `graph/cmd/entscript/main.go` file.

### Upload your changes

Compile and upload the script to the relevant kubernetes container
```
$ cd symphony/graph
$ mkdir build && GOOS=linux go build -o ./build ./cmd/entscript # builds the binary
$ kubectl cp build/entscript {graph_pod_name}:/bin # copy binary to relevant pod
```

Connect to graph kubernetes instance
```
$ kubectl exec {graph_pod_name} -it --container graph sh
```
From kubernetes instance
```
$ /bin/entscript --tenant=fb-test --user=fbuser@fb.com
```

## Migrations

A lot of times we run EntScript to migrate our data from new structures.
All these migrations should be saved in files with the format `entscript\migrations\{migration-name}-{migration-date}.go`