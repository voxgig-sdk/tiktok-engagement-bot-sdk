# frozen_string_literal: true

# Typed models for the TiktokEngagementBot SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Engagement entity data model.
#
# @!attribute [rw] action
#   @return [String, nil]
#
# @!attribute [rw] estimated_completion
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] request_id
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Engagement = Struct.new(
  :action,
  :estimated_completion,
  :quantity,
  :request_id,
  :url,
  keyword_init: true
)

# Request payload for Engagement#create.
#
# @!attribute [rw] action
#   @return [String, nil]
#
# @!attribute [rw] estimated_completion
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] request_id
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
EngagementCreateData = Struct.new(
  :action,
  :estimated_completion,
  :quantity,
  :request_id,
  :url,
  keyword_init: true
)

