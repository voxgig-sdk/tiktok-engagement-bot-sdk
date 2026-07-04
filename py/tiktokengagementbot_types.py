# Typed models for the TiktokEngagementBot SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Engagement:
    action: str
    url: str
    data: Optional[dict] = None
    message: Optional[str] = None
    quantity: Optional[int] = None
    status: Optional[str] = None


@dataclass
class EngagementCreateData:
    action: Optional[str] = None
    data: Optional[dict] = None
    message: Optional[str] = None
    quantity: Optional[int] = None
    status: Optional[str] = None
    url: Optional[str] = None

