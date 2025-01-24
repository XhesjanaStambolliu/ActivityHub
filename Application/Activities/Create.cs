using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Unit>
        {
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler( DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //add the activity to the memory
               _context.Activities.Add(request.Activity);
                //save the changes to the database
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}