namespace Shopping_Cart_NEXT.Utils;
using FluentValidation;
using Shopping_Cart_NEXT.Controllers;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.UserEmail)
            .NotEmpty().WithMessage("Email is required")
            .Matches(@"^[^\s@]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$").WithMessage("Invalid email format");

        RuleFor(x => x.UserPassword)
            .NotEmpty().WithMessage("Password is required");
    }
}
