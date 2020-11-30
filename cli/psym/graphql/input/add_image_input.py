#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from datetime import datetime
from functools import partial
from gql_client.runtime.datetime_utils import DATETIME_FIELD_METADATA
from numbers import Number
from typing import Any, AsyncGenerator, Callable, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.image_entity import ImageEntity


@dataclass(frozen=True)
class AddImageInput(DataClassJsonMixin):
    entityId: str
    imgKey: str
    fileName: str
    fileSize: int
    contentType: str
    entityType: ImageEntity = field(metadata=enum_field_metadata(ImageEntity))
    modified: datetime = field(metadata=DATETIME_FIELD_METADATA)
    category: Optional[str] = None
    annotation: Optional[str] = None
