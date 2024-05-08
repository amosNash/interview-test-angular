using StudentApi.Models.Students;
using StudentApi.Services;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace StudentApi.Mediatr.Students
{
    public class DeleteStudentRequest : IRequest<bool>
    {
      public Student Student {get; set;}
    }

    public class DeleteStudentsHandler : IRequestHandler<DeleteStudentRequest, bool>
    {
        private readonly IStudentsService _studentsService;

        public DeleteStudentsHandler(IStudentsService studentsService)
        {
            _studentsService = studentsService;
        }

        public async Task<bool> Handle(DeleteStudentRequest request, CancellationToken cancellationToken)
        {
            // Delete a student
            return  _studentsService.DeleteStudent(request.Student);
        }
    }
}
