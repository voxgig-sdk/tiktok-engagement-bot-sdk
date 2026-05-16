package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEngagementEntityFunc func(client *TiktokEngagementBotSDK, entopts map[string]any) TiktokEngagementBotEntity

