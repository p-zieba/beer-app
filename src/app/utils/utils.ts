export class Utils {

    static sortArrayAlphabetically(array: any[]): any[] {
        return array.sort(function (a, b) {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });
    }

    static sortArrayAlphabeticallyByAttribute(array: any[], attributeName: string): any[] {
        if (attributeName === 'price') {
            return array.sort((n1, n2) => n1[attributeName] - n2[attributeName]);
        }

        return array.sort(function (a, b) {
            if (a[attributeName] < b[attributeName]) { return -1; }
            if (a[attributeName] > b[attributeName]) { return 1; }
            return 0;
        });
    }

    static removeDuplicates(array: any[]): any[] {
        return array.filter(function (element, index, self) {
            return index === self.indexOf(element);
        });
    }

}
