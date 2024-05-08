using StudentApi.Mediatr.Students;
using StudentApi.Models.Students;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private IMediator mediator;

        /// <summary>
        /// Gets the Mediator object.
        /// </summary>
        protected IMediator Mediator => mediator ??= (IMediator)HttpContext.RequestServices.GetService(typeof(IMediator))!;

        private readonly ILogger<StudentsController> _logger;

        public StudentsController(ILogger<StudentsController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Gets the current students
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            var reponse = await Mediator.Send(new GetStudentsRequest());

            return reponse.Students;
        }

        /// <summary>
        /// adds a student
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Student student)
        {
            var response = await Mediator.Send(new AddStudentRequest { Student = student });

            if (response)
            {
                return Ok(new { message = "Student added successfully" });
            }
            else
            {
                return StatusCode(500, new { message = "Failed to add student" });
            }
        }

        /// <summary>
        /// delete a student
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]Student student)
        {
            var response = await Mediator.Send(new DeleteStudentRequest { Student = student });

            if (response)
            {
                return Ok(new { message = "Student deleted successfully" });
            }
            else
            {
                return StatusCode(500, new { message = "Failed to delete student" });
            }
        }

    }
}
