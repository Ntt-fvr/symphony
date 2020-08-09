#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from gql.gql.datetime_utils import DATETIME_FIELD
from gql.gql.graphql_client import GraphqlClient
from gql.gql.client import OperationException
from gql.gql.reporter import FailedOperationException
from functools import partial
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional, Dict
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from ..fragment.work_order_type import WorkOrderTypeFragment, QUERY as WorkOrderTypeFragmentQuery

QUERY: List[str] = WorkOrderTypeFragmentQuery + ["""
query WorkOrderTypeDetailsQuery($id: ID!) {
  workOrderType: node(id: $id) {
    ... on WorkOrderType {
      ...WorkOrderTypeFragment
    }
  }
}

"""]

@dataclass
class WorkOrderTypeDetailsQuery(DataClassJsonMixin):
    @dataclass
    class WorkOrderTypeDetailsQueryData(DataClassJsonMixin):
        @dataclass
        class Node(WorkOrderTypeFragment):
            pass

        workOrderType: Optional[Node]

    data: WorkOrderTypeDetailsQueryData

    @classmethod
    # fmt: off
    def execute(cls, client: GraphqlClient, id: str) -> Optional[WorkOrderTypeDetailsQueryData.Node]:
        # fmt: off
        variables: Dict[str, Any] = {"id": id}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.from_json(response_text).data
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("WorkOrderTypeDetailsQuery", variables, network_time, decode_time)
            return res.workOrderType
        except OperationException as e:
            raise FailedOperationException(
                client.reporter,
                e.err_msg,
                e.err_id,
                "WorkOrderTypeDetailsQuery",
                variables,
            )
