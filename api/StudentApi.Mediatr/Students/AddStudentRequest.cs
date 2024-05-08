using StudentApi.Models.Students;
using StudentApi.Services;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StudentApi.Mediatr.Students
{
    public class AddStudentRequest : IRequest<bool>
    {
      public Student Student {get; set;}
    }

    public class AddStudentsHandler : IRequestHandler<AddStudentRequest, bool>
    {
        private readonly IStudentsService _studentsService;

        public AddStudentsHandler(IStudentsService studentsService)
        {
            _studentsService = studentsService;
        }

        public async Task<bool> Handle(AddStudentRequest request, CancellationToken cancellationToken)
        {
            // Add a student
            return  _studentsService.AddStudent(request.Student);
        }
    }
}
