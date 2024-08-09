namespace Shopping_Cart_NEXT.Utils;
using FluentValidation;
using Shopping_Cart_NEXT.Controllers;

public class RegistrationRequestValidator : AbstractValidator<RegistrationRequest>
{
    public RegistrationRequestValidator()
    {
        RuleFor(x => x.UserEmail)
            .NotEmpty().WithMessage("Email is required")
            .Matches(@"^[^\s@]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$").WithMessage("Email must be a valid email address with a domain consisting only of Latin letters, numbers, or hyphens");

        RuleFor(x => x.UserPasswordHash)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long")
            .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|[\W_])).+$").WithMessage("Password must contain at least one capital Latin letter, one small Latin letter, and either a number or a special symbol.");

        RuleFor(x => x.UserFname)
            .NotEmpty().WithMessage("First name is required")
            .MinimumLength(2).WithMessage("First name must be at least 2 characters long")
            .Matches(@"^[A-Za-z-\s]+$").WithMessage("First name can only contain Latin letters, hyphens and spaces.");

        RuleFor(x => x.UserLname)
            .NotEmpty().WithMessage("Last name is required")
            .MinimumLength(2).WithMessage("Last name must be at least 2 characters long")
            .Matches(@"^[A-Za-z-\s]+$").WithMessage("Last name can only contain Latin letters, hyphens and spaces.");
    }
}