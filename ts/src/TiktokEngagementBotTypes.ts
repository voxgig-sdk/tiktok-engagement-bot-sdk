// Typed models for the TiktokEngagementBot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Engagement {
  action?: string
  estimated_completion?: string
  quantity?: number
  request_id?: string
  url?: string
}

export interface EngagementCreateData {
  action?: string
  estimated_completion?: string
  quantity?: number
  request_id?: string
  url?: string
}

