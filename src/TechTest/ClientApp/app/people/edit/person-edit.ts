import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
      this.routerConfig = routerConfig;

      

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

    async submit() {

    // Implement the submit and save logic.
    // Send a JSON request to the API with the newly updated
    // this.person object. If the response is successful then
      // the user should be navigated to the list page.

      /// fetch a reponse from /people/{id}
      /// give the body of the request as the json of this.person
      var personUpdate = await this.http.fetch(`/people/${this.person.id}`, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        method: "PUT",
        body: JSON.stringify(this.person)
        });

      /// the new status of the response is 200
      /// naivate to the list page
      /// otherwise throw an error and do nothing else
      if (personUpdate.status == 200) {
          this.router.navigate('people');
      } else {
          throw new Error('Unable to update');
      }

    
  }

  cancel() {
    this.router.navigate('people');
  }
}
