using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DistanceAlgorithmController : Controller
    {
        //[Authorize]
        [HttpGet("{string1}/{string2}")]
        public ActionResult<object> LevenshteinDistance(string string1, string string2)
        {
            return LevenshteinDistanceCls.LevenshteinDistance(string1, string2);
        }
    }
}