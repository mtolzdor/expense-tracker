using api.Data;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [Route("api/catagories")]
    [ApiController]
    public class CatagoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CatagoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCatagories()
        {

            var catagories = await _context.Catagories.ToListAsync();

            var catagoryDto = catagories.Select(c => c.ToCatagoryDto());

            return Ok(catagoryDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCatagoryById([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var catagory = await _context.Catagories.FindAsync(id);

            if (catagory == null)
            {
                return NotFound();
            }

            return Ok(catagory.ToCatagoryDto());
        }
    }
}