type AddressProps = {
  street: string
  number: number
  zip: string
  city: string
  state: string
}

export default class Address {
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";
    _state: string = "";
  
    constructor(props: AddressProps) {
      this._street = props.street;
      this._number = props.number;
      this._zip = props.zip;
      this._city = props.city;
      this._state = props.state
  
      //this.validate();
    }
  
    get street(): string {
      return this._street;
    }
  
    get number(): number {
      return this._number;
    }
  
    get zip(): string {
      return this._zip;
    }
  
    get city(): string {
      return this._city;
    }
    
    get state(): string {
      return this._state;
    }
    
    validate() {
      console.log(this._street.length === 0)
      if (this._street.length === 0) {
        throw new Error("Street is required");
      }
      if (this._number === 0) {
        throw new Error("Number is required");
      }
      if (this._zip.length === 0) {
        throw new Error("Zip is required");
      }
      if (this._city.length === 0) {
        throw new Error("City is required");
      }
    }
  }