#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from functools import partial
from gql.gql.datetime_utils import DATETIME_FIELD
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional

from dataclasses_json import DataClassJsonMixin

@dataclass
class SurveyWiFiScanData(DataClassJsonMixin):
    timestamp: int
    frequency: int
    channel: int
    bssid: str
    strength: int
    ssid: Optional[str] = None
    band: Optional[str] = None
    channelWidth: Optional[int] = None
    capabilities: Optional[str] = None
    latitude: Optional[Number] = None
    longitude: Optional[Number] = None
    altitude: Optional[Number] = None
    heading: Optional[Number] = None
    rssi: Optional[Number] = None

