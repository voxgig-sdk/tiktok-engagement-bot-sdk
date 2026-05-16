package core

type TiktokEngagementBotError struct {
	IsTiktokEngagementBotError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTiktokEngagementBotError(code string, msg string, ctx *Context) *TiktokEngagementBotError {
	return &TiktokEngagementBotError{
		IsTiktokEngagementBotError: true,
		Sdk:              "TiktokEngagementBot",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TiktokEngagementBotError) Error() string {
	return e.Msg
}
