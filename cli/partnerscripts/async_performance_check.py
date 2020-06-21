#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

import argparse
import asyncio
import sys
from argparse import Namespace
from asyncio.events import AbstractEventLoop
from datetime import datetime
from typing import Sequence, Tuple

from pyinventory import InventoryClient
from pyinventory.common.data_class import Location

from .utils import (
    Timer,
    edit_location_with_time,
    get_building_locations,
    get_client,
    get_location,
)


async def a_get_location(
    client: InventoryClient, external_id: str
) -> Tuple[Location, float]:
    return get_location(client, external_id)


async def a_edit_location(client: InventoryClient, location: Location) -> float:
    return edit_location_with_time(client, location)


async def run_it(
    client: InventoryClient, location: Location, external_id: str
) -> Tuple[Location, float, float]:
    new_location, get_location_time = await a_get_location(
        client=client, external_id=external_id
    )

    edit_location_time = await a_edit_location(client=client, location=new_location)
    return (new_location, get_location_time, edit_location_time)


async def main(
    email: str, password: str, tenant: str
) -> Sequence[Tuple[Location, float, float]]:
    client = get_client(email=email, password=password, tenant=tenant)
    locations_with_external_ids = get_building_locations(client)
    t = Timer()
    t.start()
    result = await asyncio.gather(
        *[
            run_it(client=client, location=location, external_id=external_id)
            for location, external_id in locations_with_external_ids
        ]
    )
    print(f"GATHER in {t.stop():.4f} secs")
    client.session.close()
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("email", help="email to connect to inventory with", type=str)
    parser.add_argument("password", help="inventory connection password", type=str)
    parser.add_argument("tenant", help="Tenant name", type=str)
    args: Namespace = parser.parse_args()

    total_run = Timer()
    print(f"STARTED at {datetime.now()}".center(80, "*"))
    total_run.start()
    loop: AbstractEventLoop = asyncio.get_event_loop()
    try:
        # pyre-fixme[5]: Global expression must be annotated.
        result = loop.run_until_complete(main(args.email, args.password, args.tenant))
    finally:
        loop.close()

    # pyre-fixme[5]: Global expression must be annotated.
    number_of_calls = len(result)
    # pyre-fixme[5]: Global expression must be annotated.
    get_location_run = sum([r[1] for r in result]) / number_of_calls
    # pyre-fixme[5]: Global expression must be annotated.
    edit_location_run = sum([r[2] for r in result]) / number_of_calls
    print(f"RESULT".center(80, "*"))
    print(
        f"get_location_by_external_id - avg {get_location_run:.4f} secs per query call"
    )
    print(f"edit_location - avg {edit_location_run:.4f} secs per query call")
    print(f"TOTAL RUNTIME {total_run.stop():.4f} secs".center(80, "*"))
    sys.exit(0)
