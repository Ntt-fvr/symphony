#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import argparse
import sys
from typing import List

from pyinventory import InventoryClient
from pyinventory.graphql.fragment.user import UserFragment


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("email", help="email to connect to inventory with", type=str)
    parser.add_argument("password", help="inventory connection password", type=str)
    parser.add_argument("tenant", help="Tenant name", type=str)
    args: argparse.Namespace = parser.parse_args()

    username: str = args.email
    password: str = args.password
    tenant: str = args.tenant
    result: List[str] = []
    users: List[UserFragment] = []
    try:
        client = InventoryClient(username, password, tenant)
    except Exception as e:
        print(f"User {username} unaible to connect to {tenant} tenant")
        print(f"ERROR - {str(e)}")

    try:
        users = client.get_users()  # pyre-ignore
    except Exception as e:
        print(f"ERROR collectng users - {str(e)}")
    finally:
        client.session.close()

    for user in users:
        try:
            client = InventoryClient(user.auth_id, user.auth_id, tenant)
            result.append(user.auth_id)
            client.session.close()
        except Exception:
            continue

    print(f"{tenant}")
    for user in result:
        print(f"\t{user}")

    sys.exit(0)
