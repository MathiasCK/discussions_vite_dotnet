using Microsoft.EntityFrameworkCore;
using server.DAL;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        .AddJsonFile("env.config.json")
        .Build();

var secretToken = configuration["SecretToken"] ?? throw new Exception("secret token not configured in env.config.json");
var viteApp = configuration["Client_URL"] ?? throw new Exception("Client url not configured in env.config.json");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretToken)),
            };
        });

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IDiscussionsRepository, DiscussionsRepository>();
builder.Services.AddScoped<ICommentsRepository, CommentsRepository>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddDbContext<DB>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:DbConnection"]);
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteApp", builder =>
    {
        builder
            .WithOrigins(viteApp)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{

    app.UseHsts();
}
else
{
    DbInit.Seed(app);
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowViteApp");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

