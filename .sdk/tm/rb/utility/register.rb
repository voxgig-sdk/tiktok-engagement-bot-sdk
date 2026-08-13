# TiktokEngagementBot SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TiktokEngagementBotUtility.registrar = ->(u) {
  u.clean = TiktokEngagementBotUtilities::Clean
  u.done = TiktokEngagementBotUtilities::Done
  u.make_error = TiktokEngagementBotUtilities::MakeError
  u.feature_add = TiktokEngagementBotUtilities::FeatureAdd
  u.feature_hook = TiktokEngagementBotUtilities::FeatureHook
  u.feature_init = TiktokEngagementBotUtilities::FeatureInit
  u.fetcher = TiktokEngagementBotUtilities::Fetcher
  u.make_fetch_def = TiktokEngagementBotUtilities::MakeFetchDef
  u.make_context = TiktokEngagementBotUtilities::MakeContext
  u.make_options = TiktokEngagementBotUtilities::MakeOptions
  u.make_request = TiktokEngagementBotUtilities::MakeRequest
  u.make_response = TiktokEngagementBotUtilities::MakeResponse
  u.make_result = TiktokEngagementBotUtilities::MakeResult
  u.make_point = TiktokEngagementBotUtilities::MakePoint
  u.make_spec = TiktokEngagementBotUtilities::MakeSpec
  u.make_url = TiktokEngagementBotUtilities::MakeUrl
  u.param = TiktokEngagementBotUtilities::Param
  u.prepare_auth = TiktokEngagementBotUtilities::PrepareAuth
  u.prepare_body = TiktokEngagementBotUtilities::PrepareBody
  u.prepare_headers = TiktokEngagementBotUtilities::PrepareHeaders
  u.prepare_method = TiktokEngagementBotUtilities::PrepareMethod
  u.prepare_params = TiktokEngagementBotUtilities::PrepareParams
  u.prepare_path = TiktokEngagementBotUtilities::PreparePath
  u.prepare_query = TiktokEngagementBotUtilities::PrepareQuery
  u.graphql_body = TiktokEngagementBotUtilities::GraphqlBody
  u.graphql_errors = TiktokEngagementBotUtilities::GraphqlErrors
  u.result_basic = TiktokEngagementBotUtilities::ResultBasic
  u.result_body = TiktokEngagementBotUtilities::ResultBody
  u.result_headers = TiktokEngagementBotUtilities::ResultHeaders
  u.transform_request = TiktokEngagementBotUtilities::TransformRequest
  u.transform_response = TiktokEngagementBotUtilities::TransformResponse
}
