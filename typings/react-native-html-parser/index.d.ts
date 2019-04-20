declare module "react-native-html-parser" {
  export class DOMParser {
    static DOMParser(): any
    parseFromString: (html: string, mimetype: string) => Parsed
  }

  interface Parsed {
    getElementsByAttribute: (attribute: string, value: string) => Array<any>
  }
}