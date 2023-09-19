using Microsoft.EntityFrameworkCore;
using server.DAL;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Gwy0hwYp2G1/EmrcV98gVOPoQFbJx+ecLigyQhsJVSw=")),
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
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder
            .WithOrigins("http://localhost:5173")
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

app.UseCors("AllowReactApp");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

