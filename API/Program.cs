using Persistence;
using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Build.Framework;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddDbContext<DataContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//lejohen kerkesat nga front-endi te kete askes ne ne API duke lejuar cdo header dhe cdo metode Get Post Put Delete
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();   
}
//Shton middleware prr CORS (Cross-Origin Resource Sharing) qe lejon kerkesat nga front-endi
app.UseCors("CorsPolicy");

//Shton middleware per autorizimin e kerkesave nga front-endi 
app.UseAuthorization();

//Lejon qe aplikacioni te trajtoje kerkesa bazuar ne routes
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    // var context = services.GetRequiredService<DataContext>();
    // context.Database.Migrate();
    try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await Seed.SeedData(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}

app.Run();
