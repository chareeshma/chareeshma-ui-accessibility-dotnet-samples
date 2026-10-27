using System.Security.Claims;
using System.Text.Json;
using AccessibleApi.Data;
using AccessibleApi.Middleware;
using AccessibleApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddSingleton<SqliteCatalogRepository>();
builder.Services.AddScoped<ICatalogService, CatalogService>();

var authority = builder.Configuration["Authentication:Authority"]
    ?? throw new InvalidOperationException("Set Authentication:Authority to your trusted OpenID Connect issuer.");
var audience = builder.Configuration["Authentication:Audience"]
    ?? throw new InvalidOperationException("Set Authentication:Audience to the API's registered audience.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = authority;
        options.Audience = audience;
        options.RequireHttpsMetadata = true;
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            RoleClaimType = "roles",
            ClockSkew = TimeSpan.FromMinutes(1),
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CatalogEditors", policy =>
        policy.RequireAuthenticatedUser().RequireRole("CatalogEditor"));
});

var app = builder.Build();

app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

await app.Services.GetRequiredService<SqliteCatalogRepository>().InitializeAsync();
await app.RunAsync();

public partial class Program;
