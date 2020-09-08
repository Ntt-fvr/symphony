// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package jobrunner

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/facebookincubator/symphony/graph/graphgrpc/schema"
	"github.com/golang/protobuf/ptypes/empty"
	"go.opencensus.io/plugin/ocgrpc"
	"go.opencensus.io/plugin/ochttp"
	"google.golang.org/grpc"
)

const (
	grpcAddr         = "%s:443"
	jobsURL          = "http://%s/jobs/%s"
	graphHostEnv     = "GRAPH_HOST"
	defaultGraphHost = "graph"
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

var httpClient = http.Client{
	Transport: &ochttp.Transport{},
}

func runJob(url, tenant string) error {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}
	req.Header.Add("x-auth-organization", tenant)
	req.Header.Add("x-auth-automation-name", "job_runner")
	req.Header.Add("x-auth-user-role", "OWNER")
	log.Printf("running job on url %s, tenant %s", url, tenant)
	resp, err := httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to get response: %v", err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read response: %v", err)
	}
	log.Printf(
		"job with url %s, tenant %s succeeded with status %s output \"%s\"",
		url,
		tenant,
		resp.Status,
		body)
	return nil
}

func RunJobOnAllTenants(jobs ...string) {
	graphHost := getEnv(graphHostEnv, defaultGraphHost)
	address := fmt.Sprintf(grpcAddr, graphHost)
	log.Printf("connecting to grpc server: %s", address)
	conn, err := grpc.Dial(address,
		grpc.WithInsecure(),
		grpc.WithBlock(),
		grpc.WithStatsHandler(&ocgrpc.ClientHandler{}),
	)
	if err != nil {
		log.Panicf("cannot connect to grpc server: %v", err)
	}
	defer conn.Close()
	client := schema.NewTenantServiceClient(conn)
	tenants, err := client.List(context.Background(), &empty.Empty{})
	if err != nil {
		log.Panicf("cannot get tenant list: %v", err)
	}
	for _, tenant := range tenants.Tenants {
		for _, job := range jobs {
			url := fmt.Sprintf(jobsURL, graphHost, job)
			err := runJob(url, tenant.Name)
			if err != nil {
				log.Printf("cannot run job on url %s: %v", url, err)
			}
		}
	}
}
