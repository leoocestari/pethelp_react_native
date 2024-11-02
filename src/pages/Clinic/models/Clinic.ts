export interface Clinic {
    Id: string;
    Name: string;
    Cnpj: string;
    PhoneNumber: string;
    Address: {
      City: string;
      Complement: string;
      Country: string;
      Neighborhood: string;
      Number: string;
      State: string;
      Street: string;
      ZipCode: string;
    };
  }