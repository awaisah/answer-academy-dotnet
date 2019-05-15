using System;
using Microsoft.AspNetCore.Mvc;
using TechTest.Repositories;
using TechTest.Repositories.Models;

namespace TechTest.Controllers
{
    [Route("api/people")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        public PeopleController(IPersonRepository personRepository)
        {
            this.PersonRepository = personRepository;
        }

        private IPersonRepository PersonRepository { get; }

        [HttpGet]
        public IActionResult GetAll()
        {
            // TODO: Step 1
            //
            // Implement a JSON endpoint that returns the full list
            // of people from the PeopleRepository. If there are zero
            // people returned from PeopleRepository then an empty
            // JSON array should be returned.


            //// Returns a new JsonResult with what is returned from PersonRepository
            /// If nothing is returned an empty JSON array will be returned.

            return new JsonResult(PersonRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // TODO: Step 2
            //
            // Implement a JSON endpoint that returns a single person
            // from the PeopleRepository based on the id parameter.
            // If null is returned from the PeopleRepository with
            // the supplied id then a NotFound should be returned.

            //// Get a Person istance from PersonRepository with Id id
            Person p = PersonRepository.Get(id);

            //// Check if the Person p is not null 
            if (p != null)
            {
                //// If p is not null the return the Json instance of p
                return new JsonResult(PersonRepository.Get(id));
            }

            //// only reach this point if p is null
            return NotFound();


        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PersonUpdate personUpdate)
        {
            // TODO: Step 3
            //
            // Implement an endpoint that receives a JSON object to
            // update a person using the PeopleRepository based on
            // the id parameter. Once the person has been successfully
            // updated, the person should be returned from the endpoint.
            // If null is returned from the PeopleRepository then a
            // NotFound should be returned.

            System.Diagnostics.Debug.WriteLine(personUpdate.ToString());

            //// Get a Person istance from PersonRepository with Id id
            Person p = PersonRepository.Get(id);

            //// Check if the Person p is null 
            if (p == null)
            {
                //// If p is null the return NotFound
                return NotFound();
            }


            //// If not null will update p's values for Authorised, Enabled and Colours
            /// with those from personUpdaye
            p.Authorised = personUpdate.Authorised;
            p.Enabled = personUpdate.Enabled;
            p.Colours = personUpdate.Colours;

            //// Get a Person istance from PersonRepository when doing Update
            p = PersonRepository.Update(p);

            //// Check if the Person p is not null 
            if (p != null)
            {
                //// If p is not null the return the Json instance of p
                return new JsonResult(p);
            }

            //// Otherwise return NotFound
            return NotFound();
        }
    }
}