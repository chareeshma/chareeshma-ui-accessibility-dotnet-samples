using System.ComponentModel.DataAnnotations;

namespace AccessibleApi.Models;

public sealed record CatalogItem(
    int Id,
    string Name,
    string Description,
    DateTimeOffset CreatedAt);

public sealed class CreateCatalogItemRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; init; } = string.Empty;

    [Required]
    [StringLength(500, MinimumLength = 1)]
    public string Description { get; init; } = string.Empty;
}
