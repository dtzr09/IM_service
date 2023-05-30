// Code generated by Kitex v0.5.2. DO NOT EDIT.

package imservice

import (
	"context"
	rpc "github.com/dtzr09/IM_service/http-server/kitex_gen/rpc"
	client "github.com/cloudwego/kitex/client"
	kitex "github.com/cloudwego/kitex/pkg/serviceinfo"
)

func serviceInfo() *kitex.ServiceInfo {
	return iMServiceServiceInfo
}

var iMServiceServiceInfo = NewServiceInfo()

func NewServiceInfo() *kitex.ServiceInfo {
	serviceName := "IMService"
	handlerType := (*rpc.IMService)(nil)
	methods := map[string]kitex.MethodInfo{
		"Send": kitex.NewMethodInfo(sendHandler, newIMServiceSendArgs, newIMServiceSendResult, false),
		"Pull": kitex.NewMethodInfo(pullHandler, newIMServicePullArgs, newIMServicePullResult, false),
	}
	extra := map[string]interface{}{
		"PackageName": "rpc",
	}
	svcInfo := &kitex.ServiceInfo{
		ServiceName:     serviceName,
		HandlerType:     handlerType,
		Methods:         methods,
		PayloadCodec:    kitex.Thrift,
		KiteXGenVersion: "v0.5.2",
		Extra:           extra,
	}
	return svcInfo
}

func sendHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*rpc.IMServiceSendArgs)
	realResult := result.(*rpc.IMServiceSendResult)
	success, err := handler.(rpc.IMService).Send(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newIMServiceSendArgs() interface{} {
	return rpc.NewIMServiceSendArgs()
}

func newIMServiceSendResult() interface{} {
	return rpc.NewIMServiceSendResult()
}

func pullHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*rpc.IMServicePullArgs)
	realResult := result.(*rpc.IMServicePullResult)
	success, err := handler.(rpc.IMService).Pull(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newIMServicePullArgs() interface{} {
	return rpc.NewIMServicePullArgs()
}

func newIMServicePullResult() interface{} {
	return rpc.NewIMServicePullResult()
}

type kClient struct {
	c client.Client
}

func newServiceClient(c client.Client) *kClient {
	return &kClient{
		c: c,
	}
}

func (p *kClient) Send(ctx context.Context, req *rpc.SendRequest) (r *rpc.SendResponse, err error) {
	var _args rpc.IMServiceSendArgs
	_args.Req = req
	var _result rpc.IMServiceSendResult
	if err = p.c.Call(ctx, "Send", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) Pull(ctx context.Context, req *rpc.PullRequest) (r *rpc.PullResponse, err error) {
	var _args rpc.IMServicePullArgs
	_args.Req = req
	var _result rpc.IMServicePullResult
	if err = p.c.Call(ctx, "Pull", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}
