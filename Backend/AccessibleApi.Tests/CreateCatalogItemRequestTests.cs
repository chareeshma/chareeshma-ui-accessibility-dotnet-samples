using System.ComponentModel.DataAnnotations;
using AccessibleApi.Models;
using Xunit;

namespace AccessibleApi.Tests;

public sealed class CreateCatalogItemRequestTests
{
    [Fact]
    public void Validate_WhenFieldsAreValid_ReturnsNoErrors()
    {
        var request = new CreateCatalogItemRequest
        {
            Name = "Keyboard",
            Description = "An accessible input device",
        };

        Assert.Empty(Validate(request));
    }

    [Theory]
    [InlineData("", "Description")]
    [InlineData("Valid name", "")]
    [InlineData("x", "Description")]
    public void Validate_WhenRequiredOrMinimumLengthIsNotMet_ReturnsErrors(
        string name,
        string description)
    {
        var request = new CreateCatalogItemRequest { Name = name, Description = description };

        Assert.NotEmpty(Validate(request));
    }

    [Fact]
    public void Validate_WhenFieldsExceedMaximumLength_ReturnsErrors()
    {
        var request = new CreateCatalogItemRequest
        {
            Name = new string('n', 101),
            Description = new string('d', 501),
        };

        Assert.NotEmpty(Validate(request));
    }

    private static IReadOnlyList<ValidationResult> Validate(CreateCatalogItemRequest request)
    {
        var results = new List<ValidationResult>();
        Validator.TryValidateObject(request, new ValidationContext(request), results, validateAllProperties: true);
        return results;
    }
}
