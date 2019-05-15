import { IColour } from '../people/interfaces/icolour';

export class ColourNamesValueConverter {

    toView(colours: IColour[]) {
        // TODO: Step 4
        //
        // Implement the value converter function.
        // Using the colours parameter, convert the list into a comma
        // separated string of colour names. The names should be sorted
        // alphabetically and there should not be a trailing comma.
        //
        // Example: 'Blue, Green, Red'

        /// Sort the values in the colours list of IColour
        /// This is done alphabetically by comparing all values
        colours.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })

        /// Create an empty list of Strings
        let coloursString:string[] = []; 

        /// loop through all the values in colours
        for (var colourIndex in colours) {
            /// Push each colour name at the index currently being checked
            coloursString.push(colours[colourIndex].name);
        }

        /// return the result of joining each element in the new coloursString list with ", "
        return coloursString.join(", ");
    }
}
