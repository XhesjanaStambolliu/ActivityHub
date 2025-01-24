using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Unit>
        {
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 var existingActivity = await _context.Activities
                .FirstOrDefaultAsync(a => a.Id == request.Activity.Id, cancellationToken);

            if (existingActivity == null)
                throw new Exception("Activity not found");

            _mapper.Map(request.Activity, existingActivity);

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
            }
        }
    }
}