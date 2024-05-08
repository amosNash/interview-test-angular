using Xunit;
using Moq;
using StudentApi.Controllers;
using StudentApi.Mediatr.Students;
using StudentApi.Models.Students;
using MediatR;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace StudentApi.Tests.Controllers
{
    public class StudentsControllerTests
    {
        private readonly StudentsController _controller;
        private readonly Mock<IMediator> _mediatorMock = new Mock<IMediator>();
        private readonly Mock<ILogger<StudentsController>> _loggerMock = new Mock<ILogger<StudentsController>>();

        public StudentsControllerTests()
        {
            _controller = new StudentsController(_loggerMock.Object);
        }

        [Fact]
        public async Task Get_ReturnsListOfStudents()
        {
            var students = new List<Student>() { /* create some test students */ };
            var response = new GetStudentsResponse(students);
            _mediatorMock.Setup(m => m.Send(It.IsAny<GetStudentsRequest>(), default))
                         .ReturnsAsync(response);
            // Act
            var result = await _controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsAssignableFrom<IEnumerable<Student>>(okResult.Value);
            Assert.Equal(students.Count, model.Count());
        }
    }
}
