using AccessibleApi.Data;
using AccessibleApi.Models;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace AccessibleApi.Tests;

public sealed class SqliteCatalogRepositoryTests : IAsyncLifetime
{
    private readonly string _directory = Path.Combine(Path.GetTempPath(), $"accessible-api-tests-{Guid.NewGuid():N}");
    private SqliteCatalogRepository _repository = null!;

    public Task InitializeAsync()
    {
        Directory.CreateDirectory(_directory);
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ConnectionStrings:Catalog"] = $"Data Source={Path.Combine(_directory, "catalog.db")}",
            })
            .Build();
        _repository = new SqliteCatalogRepository(configuration);
        return Task.CompletedTask;
    }

    public Task DisposeAsync()
    {
        Directory.Delete(_directory, recursive: true);
        return Task.CompletedTask;
    }

    [Fact]
    public async Task CreateAndRead_PersistsTrimmedValues()
    {
        await _repository.InitializeAsync();
        var request = new CreateCatalogItemRequest
        {
            Name = "  Keyboard  ",
            Description = "  Accessible input device  ",
        };

        var created = await _repository.CreateAsync(request, CancellationToken.None);
        var fetched = await _repository.GetByIdAsync(created.Id, CancellationToken.None);
        var all = await _repository.GetAllAsync(CancellationToken.None);

        Assert.True(created.Id > 0);
        Assert.Equal("Keyboard", created.Name);
        Assert.Equal("Accessible input device", created.Description);
        Assert.Equal(created, fetched);
        Assert.Contains(created, all);
    }

    [Fact]
    public async Task GetById_WhenItemDoesNotExist_ReturnsNull()
    {
        await _repository.InitializeAsync();

        var result = await _repository.GetByIdAsync(123, CancellationToken.None);

        Assert.Null(result);
    }
}
