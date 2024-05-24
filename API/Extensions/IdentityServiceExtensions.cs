
using System.Data;
using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions 
    {
        
        public static IServiceCollection AddIdentityService( this IServiceCollection services,IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(
                opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.User.RequireUniqueEmail = true;
                }
            )
            .AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey= key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddScoped<TokenService>();
            return services;
        }
    }
}