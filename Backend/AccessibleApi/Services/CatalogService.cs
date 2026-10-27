using AccessibleApi.Data;
using AccessibleApi.Models;

namespace AccessibleApi.Services;

public sealed class CatalogService(SqliteCatalogRepository repository) : ICatalogService
{
    public Task<IReadOnlyList<CatalogItem>> GetAllAsync(CancellationToken cancellationToken) =>
        repository.GetAllAsync(cancellationToken);

    public Task<CatalogItem?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
        repository.GetByIdAsync(id, cancellationToken);

    public Task<CatalogItem> CreateAsync(
        CreateCatalogItemRequest request,
        CancellationToken cancellationToken) =>
        repository.CreateAsync(request, cancellationToken);
}
