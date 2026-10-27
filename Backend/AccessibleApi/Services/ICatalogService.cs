using AccessibleApi.Models;

namespace AccessibleApi.Services;

public interface ICatalogService
{
    Task<IReadOnlyList<CatalogItem>> GetAllAsync(CancellationToken cancellationToken);
    Task<CatalogItem?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<CatalogItem> CreateAsync(CreateCatalogItemRequest request, CancellationToken cancellationToken);
}
