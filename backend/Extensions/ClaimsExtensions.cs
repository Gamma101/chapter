using System.Security.Claims;

namespace backend.Extensions
{
  
        public static class ClaimsExtensions
        {
            public static string GetUsername(this ClaimsPrincipal user)
            {
                var nameClaim = user.Claims
                    .SingleOrDefault(x => x.Type == ClaimTypes.GivenName);
                return nameClaim?.Value;
            }      
        } 
}
