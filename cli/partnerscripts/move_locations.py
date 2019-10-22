#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

import argparse
import sys

from pyinventory import InventoryClient


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("email", help="email to connect to inventory with", type=str)
    parser.add_argument("password", help="inventory connection password", type=str)
    parser.add_argument("tenant", help="Tenant name", type=str)
    parser.add_argument("new_parent", help="new parent ID", type=str)
    parser.add_argument(
        "locations_to_move", help="list of location IDs to move", nargs="+"
    )
    # pyre-fixme[5]: Global expression must be annotated.
    args = parser.parse_args()
    client = InventoryClient(args.email, args.password, args.tenant)
    for location_id in args.locations_to_move:
        # pyre-fixme[16]: `InventoryClient` has no attribute `move_location`.
        client.move_location(location_id, args.new_parent_id)
    sys.exit(0)
