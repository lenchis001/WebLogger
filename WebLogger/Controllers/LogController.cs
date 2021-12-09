using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebLogger.Models.Log;
using WebLogger.Services;

namespace WebLogger.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogController : ControllerBase
    {
        public LogController()
        {
            
        }

        [HttpGet]
        public ICollection<Record> Get()
        {
            return LogStorageService.GetRecords(); 
        }

        [HttpPost]
        public void Post(AddRecord model){
            LogStorageService.Add(model);
        }

        [HttpDelete]
        public void Delete(){
            LogStorageService.Clear();
        }
    }
}
