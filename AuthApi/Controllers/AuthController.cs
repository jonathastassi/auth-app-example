using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthApi.Interfaces;
using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService userService;

        public AuthController(
            IUserService userService
        )
        {
            this.userService = userService;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            try
            {
                return Ok(this.userService.Login(user));            
            }
            catch (System.Exception ex)
            {                
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //  POST api/auth/register
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                this.userService.Create(user);

                return Ok(user);            
            }
            catch (System.Exception ex)
            {        
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET api/auth/me
        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            var currentUser = HttpContext.User;

            string idUser = string.Empty;
            string nameUser = string.Empty;
            string emailUser = string.Empty;
            
            if (currentUser.HasClaim(c => c.Type == ClaimTypes.Email))
            {
                idUser = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.PrimarySid).Value;
                nameUser = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;                
                emailUser = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
            }

            return Ok(new User { Id = idUser, Name = nameUser, Email = emailUser });
        }

        // POST api/auth/refresh
        [HttpPost("refresh")]
        [Authorize]
        public IActionResult Refresh([FromBody] User user)
        {
            var teste = User;

            var teste1 = HttpContext.User;
            

            var currentUser = HttpContext.User;

            string emailUser = string.Empty;
            if (currentUser.HasClaim(c => c.Type == ClaimTypes.Email))
            {
                emailUser = currentUser.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
            }

            return Ok("Refresh " + emailUser);
        }
    }
}