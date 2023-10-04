using Microsoft.EntityFrameworkCore;
using server.DAL;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

/* Initialize enviroment variables */
var (keyVaultName, clientSecret, tenantId, clientId) = Utils.GenerateConnectionString();
var vault = new SecretClient(new Uri($"https://{keyVaultName}.vault.azure.net/"), new ClientSecretCredential(tenantId, clientId, clientSecret));

/* Create app builder */
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            string secretToken = vault.GetSecret("SecretToken").Value.Value;

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretToken)),
            };
        });

builder.Services.AddTransient<IKeyVaultService>(provider =>
{
    IConfiguration config = provider.GetRequiredService<IConfiguration>();

    return new KeyVaultService(keyVaultName, tenantId, clientId, clientSecret);
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
            .AllowAnyOrigin()
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
    app.UseDeveloperExceptionPage();
}

DbInit.Seed(app);

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

