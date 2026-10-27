using AccessibleApi.Models;
using AccessibleApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AccessibleApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public sealed class CatalogController(
    ICatalogService catalog,
    ILogger<CatalogController> logger) : ControllerBase
{
    [HttpGet]
    [Authorize]
    [ProducesResponseType<IReadOnlyList<CatalogItem>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<IReadOnlyList<CatalogItem>>> GetAll(
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Listing catalog items");
        return Ok(await catalog.GetAllAsync(cancellationToken));
    }

    [HttpGet("{id:int}")]
    [Authorize]
    [ProducesResponseType<CatalogItem>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CatalogItem>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var item = await catalog.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = "CatalogEditors")]
    [ProducesResponseType<CatalogItem>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<CatalogItem>> Create(
        [FromBody] CreateCatalogItemRequest request,
        CancellationToken cancellationToken)
    {
        var item = await catalog.CreateAsync(request, cancellationToken);
        logger.LogInformation("Created catalog item {CatalogItemId}", item.Id);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }
}
