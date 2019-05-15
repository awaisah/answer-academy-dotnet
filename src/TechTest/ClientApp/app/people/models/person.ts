import { computedFrom } from 'aurelia-framework';
import { IPerson } from '../interfaces/iperson';
import { IColour } from '../interfaces/icolour';

export class Person implements IPerson {

  constructor(person: IPerson) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.authorised = person.authorised;
    this.enabled = person.enabled;
    this.colours = person.colours;
  }

  id: number;
  firstName: string;
  lastName: string;
  authorised: boolean;
  enabled: boolean;
  colours: IColour[];

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computedFrom('fullName')
  get palindrome(): boolean {
    // Implement the palindrome computed field.
    // True should be returned When the FullName is spelt the same
    // forwards as it is backwards. The match should ignore any
    // spaces and should also be case insensitive.
    //
      // Example: 'Bo Bob' is a palindrome.

      /// create a list of strings with elements of this.fullName
      /// replacing spaces with empty string and reducing it to lower case
      let matchName: string[] = `${this.fullName}`.replace(" ", "").toLowerCase().split("");

      /// loop through each index of matchName
      for (var index in matchName) {
          /// if the values at current index of matchName and of the reverse of matchName are not equal
          /// return false
          if (matchName[index] != matchName.reverse()[index]) {
              return false;
          }
      }
      /// if it gets through the loop without finding two elements which are different
      /// then return true
      return true;
  }
}
