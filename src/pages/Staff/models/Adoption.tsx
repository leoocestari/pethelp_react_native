import { Animal } from "../../Animals/models/animalModel";

export interface Adoption {
    Id: number;
    UserId: number;
    Status: string;
    Observation: string;
    Animals: Animal[];
  }