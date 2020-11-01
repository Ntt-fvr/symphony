#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import functools
import time
import requests

from typing import Callable
from gql_client.runtime.graphql_client import GraphqlClient
from psym.client import SymphonyClient
from psym.common.endpoint import LOCALHOST_SERVER

from .constant import PLATFORM_SERVER_HEALTH_CHECK_URL, TestMode

TEST_MODE: TestMode = TestMode.DEV
TENANT = "fb-test"


def wait_for_platform() -> None:
    if TEST_MODE == TestMode.REMOTE:
        return
    platform_server_health_check = PLATFORM_SERVER_HEALTH_CHECK_URL
    if TEST_MODE == TestMode.LOCAL:
        platform_server_health_check = "https://fb-test.localtest.me/healthz"

    deadline = time.monotonic() + 60
    while time.monotonic() < deadline:
        try:
            response = requests.get(
                platform_server_health_check, timeout=0.5, verify=False
            )
            if response.status_code == 200:
                return
            print(
                f"Response failed with status code {response.status_code}"
                f' and with message "{response.text}"'
            )
        except Exception as e:
            print(f"Request failed with exception {e}")
            time.sleep(0.5)
    raise Exception("Failed to wait for platform")


def init_client(email: str, password: str) -> SymphonyClient:
    if TEST_MODE == TestMode.LOCAL:
        return SymphonyClient(email, password, tenant=TENANT, is_local_host=True)
    elif TEST_MODE == TestMode.REMOTE:
        return SymphonyClient(email, password, tenant=f"{TENANT}.staging")
    else:
        return SymphonyClient(email, password, is_dev_mode=True)


def init_cleaner() -> Callable:
    if TEST_MODE == TestMode.LOCAL:
        endpoint = f"https://admin.{LOCALHOST_SERVER}/query"
    elif TEST_MODE == TestMode.REMOTE:
        raise NotImplementedError("T64902729")
    else:
        endpoint = "http://admin/query"

    session = requests.Session()
    session.verify = False
    client = GraphqlClient(endpoint, session, headers={"User-Agent": "psym"})
    mutation = """
        mutation TruncateTenant($name: String!) {
            truncateTenant(input: { name: $name }) {
                clientMutationId
            }
        }
    """
    variables = {"name": TENANT}
    return functools.partial(client.call, query=mutation, variables=variables)
