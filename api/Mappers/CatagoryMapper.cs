using api.Dtos.Account;
using api.Models;

namespace api.Mappers
{
    public static class CatagoryMapper
    {
        public static CatagoryDto ToCatagoryDto(this Catagory catagory)
        {
            return new CatagoryDto
            {
                Id = catagory.Id,
                Name = catagory.Name
            };
        }
    }
}