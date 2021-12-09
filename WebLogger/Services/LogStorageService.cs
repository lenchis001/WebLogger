using WebLogger.Models.Log;
using System.Collections.Generic;
using System;
using System.Linq;

namespace WebLogger.Services {
    static class LogStorageService {
        private static ICollection<Record> _records;
        
        static LogStorageService()
        {
            _records = new List<Record>();
        }

        public static void Add(AddRecord newRecord){
            _records.Add(new Record {
                Message = newRecord.Message,
                CreationDateTime = DateTime.Now
            });
        }

        public static ICollection<Record> GetRecords(){
            return _records.ToArray();
        }

        public static void Clear(){
            _records.Clear();
        }
    }
}