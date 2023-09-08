using Microsoft.EntityFrameworkCore;
using server.DAL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IDiscussionsRepository, DiscussionsRepository>();
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

app.UseCors("AllowReactApp");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

