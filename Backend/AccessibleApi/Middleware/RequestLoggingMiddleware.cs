using System.Diagnostics;

namespace AccessibleApi.Middleware;

public sealed class RequestLoggingMiddleware(
    RequestDelegate next,
    ILogger<RequestLoggingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var timer = Stopwatch.StartNew();
        try
        {
            await next(context);
        }
        finally
        {
            timer.Stop();
            logger.LogInformation(
                "HTTP {Method} {Path} responded {StatusCode} in {ElapsedMilliseconds} ms; TraceId {TraceId}",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                timer.ElapsedMilliseconds,
                context.TraceIdentifier);
        }
    }
}
