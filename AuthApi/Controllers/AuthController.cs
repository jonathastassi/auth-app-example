using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthApi.Interfaces;
using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Authorization;
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
            catch (System.Exception)
            {                
                throw;
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
            catch (System.Exception)
            {                
                throw;
            }
        }

        // POST api/auth/refresh
        [HttpPost("refresh")]
        [Authorize]
        public IActionResult Refresh([FromBody] User user)
        {
            return Ok("Refresh " + user.Email);
        }
    }
}