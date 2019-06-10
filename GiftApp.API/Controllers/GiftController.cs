using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using GiftApp.API.DTOs;
using GiftApp.API.Models;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GiftApp.API.Controllers
{
    //[Authorize] Remove commnet before deployment
    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {
        private readonly IGiftRepository _repo;
        private readonly IMapper _mapper;
        public GiftController(IGiftRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("Getall/{userId}/{eventId}")]
        public async Task<IActionResult> GetAll(int userId, int eventId)
        {
            var allGifts = await _repo.GetAll(userId, eventId);
            if (allGifts == null) return BadRequest();

            var giftToRetrunDTOs = _mapper.Map<ICollection<GiftToRetrunDTO>>(allGifts);

            return Ok(giftToRetrunDTOs);
        }

        
        [HttpGet("GetAllWishGiftList/{userId}")]
        public async Task<IActionResult> GetAllWishGiftList(int userId)
        {
            var allWishListGifts = await _repo.GetAllWishGiftList(userId);
            if (allWishListGifts == null) return BadRequest();

            var giftToRetrunDTOs = _mapper.Map<ICollection<GiftToRetrunDTO>>(allWishListGifts);

            return Ok(giftToRetrunDTOs);
        }


        [HttpPost("CreateNewGift")]
        public async Task<IActionResult> CreateNewGift(GiftToCreateDTO gift)
        {
            var giftDB = new Gift();

            if(gift.GiftType == "WishList"){

                giftDB = await _repo.CreateWishListGift(gift);

            }else if(gift.GiftType == "UserEvent"){
                giftDB = await _repo.CreateUserEventGift(gift);
            }
            

            if (giftDB == null) return BadRequest();

            var giftToReturn = _mapper.Map<GiftToRetrunDTO>(giftDB);

            return Ok(giftToReturn);
        }


         [HttpPost("AddFromWishList")]
        public async Task<IActionResult> AddFromWishList(AddRemoveWishListGiftDTO addRemoveWishListGiftDTO)
        {
            var giftsDB = await _repo.AddFromWishList(addRemoveWishListGiftDTO);

            var giftToReturn = _mapper.Map<IList<GiftToRetrunDTO>>(giftsDB);

            return Ok(giftToReturn);
        }


        [HttpPost("DeleteGift")]
        public async Task<IActionResult> DeleteGift(DeleteGiftDTO deleteGiftDTO)
        {
            var giftDB = await _repo.DeleteGift(deleteGiftDTO.GiftIds);
           
            return Ok();
        }

        
        [HttpPost("DeleteWishListGift")]
        public async Task<IActionResult> DeleteWishListGift(AddRemoveWishListGiftDTO addRemoveWishListGiftDTO)
        {
            var giftDB = await _repo.DeleteWishListGift(addRemoveWishListGiftDTO);
           
            return Ok();
        }

        [HttpPost("EditGift")]
        public async Task<IActionResult> EditGift(Gift gift)
        {
            var giftToReturn = await _repo.EditGift(gift);
            if (giftToReturn == null) return BadRequest();
            return Ok(giftToReturn);
        }



    }
}