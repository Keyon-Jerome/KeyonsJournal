using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
namespace JournalBackend.Controllers
{
    public class ValuesController : ApiController
    {
        string connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\xampp\\htdocs\\KeyonsJournal\\csharp\\JournalBackend\\JournalBackend\\App_Data\\JournalDatabase.mdf;Integrated Security=True";
        
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
            runQuery("INSERT INTO UserTable (Username,Password, Email) VALUES ('MaddestOfMad','362790964d0c8d305930575f60e2d3d048184d79','sample@example.com');");
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
        public void runQuery(string queryString)
        {
            using (SqlConnection connection = new SqlConnection(
               connectionString))
            {
                SqlCommand command = new SqlCommand(
                    queryString, connection);
                connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Console.WriteLine(String.Format("{0}, {1}",
                            reader[0], reader[1]));
                    }
                }
            }
        }
    }
}
