using AccessibleApi.Controllers;
using AccessibleApi.Models;
using AccessibleApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace AccessibleApi.Tests;

public sealed class CatalogControllerTests
{
    // TODO: Add host-level authentication and authorization tests using a test issuer.

    [Fact]
    public async Task GetAll_ReturnsItems()
    {
        var item = new CatalogItem(1, "Keyboard", "Accessible input", DateTimeOffset.UtcNow);
        var service = new FakeCatalogService { Items = [item] };
        var controller = new CatalogController(service, NullLogger<CatalogController>.Instance);

        var result = await controller.GetAll(CancellationToken.None);

        var response = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(new[] { item }, Assert.IsAssignableFrom<IReadOnlyList<CatalogItem>>(response.Value));
    }

    [Fact]
    public async Task GetById_WhenItemExists_ReturnsItem()
    {
        var item = new CatalogItem(4, "Keyboard", "Accessible input", DateTimeOffset.UtcNow);
        var service = new FakeCatalogService { Item = item };
        var controller = new CatalogController(service, NullLogger<CatalogController>.Instance);

        var result = await controller.GetById(item.Id, CancellationToken.None);

        var response = Assert.IsType<OkObjectResult>(result.Result);
        Assert.Same(item, response.Value);
    }

    [Fact]
    public async Task GetById_WhenItemDoesNotExist_ReturnsNotFound()
    {
        var controller = new CatalogController(
            new FakeCatalogService(),
            NullLogger<CatalogController>.Instance);

        var result = await controller.GetById(99, CancellationToken.None);

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task Create_ReturnsCreatedLocationAndItem()
    {
        var item = new CatalogItem(8, "Keyboard", "Accessible input", DateTimeOffset.UtcNow);
        var service = new FakeCatalogService { Item = item };
        var controller = new CatalogController(service, NullLogger<CatalogController>.Instance);

        var result = await controller.Create(
            new CreateCatalogItemRequest { Name = item.Name, Description = item.Description },
            CancellationToken.None);

        var response = Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(nameof(CatalogController.GetById), response.ActionName);
        Assert.Equal(item.Id, response.RouteValues!["id"]);
        Assert.Same(item, response.Value);
    }

    private sealed class FakeCatalogService : ICatalogService
    {
        public IReadOnlyList<CatalogItem> Items { get; init; } = [];
        public CatalogItem? Item { get; init; }

        public Task<IReadOnlyList<CatalogItem>> GetAllAsync(CancellationToken cancellationToken) =>
            Task.FromResult(Items);

        public Task<CatalogItem?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
            Task.FromResult(Item);

        public Task<CatalogItem> CreateAsync(
            CreateCatalogItemRequest request,
            CancellationToken cancellationToken) =>
            Task.FromResult(Item ?? throw new InvalidOperationException("No fake item configured."));
    }
}
