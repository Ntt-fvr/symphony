#!/usr/bin/env #!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

import argparse
import sys

from psym import InventoryClient
from psym.api.file import add_files


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("email", help="email to connect to inventory with", type=str)
    parser.add_argument("password", help="inventory connection password", type=str)
    parser.add_argument("tenant", help="Tenant name", type=str)
    parser.add_argument(
        "local_dir_path", help="local directory path to upload", type=str
    )
    parser.add_argument(
        "entity_type",
        help="entity type",
        type=str,
        choices=["LOCATION", "WORK_ORDER", "SITE_SURVEY", "EQUIPMENT"],
    )
    parser.add_argument("entity_id", help="entity ID", type=str)
    # pyre-fixme[5]: Global expression must be annotated.
    args = parser.parse_args()
    client = InventoryClient(args.email, args.password, args.tenant)
    add_files(client, args.local_dir_path, args.entity_type, args.entity_id)
    sys.exit(0)
