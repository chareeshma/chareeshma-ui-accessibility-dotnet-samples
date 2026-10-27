using AccessibleApi.Models;
using Microsoft.Data.Sqlite;

namespace AccessibleApi.Data;

public sealed class SqliteCatalogRepository(IConfiguration configuration)
{
    private readonly string _connectionString =
        configuration.GetConnectionString("Catalog")
        ?? throw new InvalidOperationException("Connection string 'Catalog' is required.");

    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        await using var connection = new SqliteConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);
        await using var command = connection.CreateCommand();
        command.CommandText = """
            CREATE TABLE IF NOT EXISTS CatalogItems (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                Description TEXT NOT NULL,
                CreatedAt TEXT NOT NULL
            );
            """;
        await command.ExecuteNonQueryAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<CatalogItem>> GetAllAsync(CancellationToken cancellationToken)
    {
        await using var connection = new SqliteConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);
        await using var command = connection.CreateCommand();
        command.CommandText =
            "SELECT Id, Name, Description, CreatedAt FROM CatalogItems ORDER BY Id;";

        var items = new List<CatalogItem>();
        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        while (await reader.ReadAsync(cancellationToken))
        {
            items.Add(ReadItem(reader));
        }

        return items;
    }

    public async Task<CatalogItem?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        await using var connection = new SqliteConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);
        await using var command = connection.CreateCommand();
        command.CommandText =
            "SELECT Id, Name, Description, CreatedAt FROM CatalogItems WHERE Id = $id;";
        command.Parameters.AddWithValue("$id", id);

        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        return await reader.ReadAsync(cancellationToken) ? ReadItem(reader) : null;
    }

    public async Task<CatalogItem> CreateAsync(
        CreateCatalogItemRequest request,
        CancellationToken cancellationToken)
    {
        var createdAt = DateTimeOffset.UtcNow;
        await using var connection = new SqliteConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);
        await using var command = connection.CreateCommand();
        command.CommandText = """
            INSERT INTO CatalogItems (Name, Description, CreatedAt)
            VALUES ($name, $description, $createdAt)
            RETURNING Id;
            """;
        command.Parameters.AddWithValue("$name", request.Name.Trim());
        command.Parameters.AddWithValue("$description", request.Description.Trim());
        command.Parameters.AddWithValue("$createdAt", createdAt.ToString("O"));

        var id = Convert.ToInt32(await command.ExecuteScalarAsync(cancellationToken));
        return new CatalogItem(id, request.Name.Trim(), request.Description.Trim(), createdAt);
    }

    private static CatalogItem ReadItem(SqliteDataReader reader) =>
        new(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetString(2),
            DateTimeOffset.Parse(reader.GetString(3), System.Globalization.CultureInfo.InvariantCulture));
}
