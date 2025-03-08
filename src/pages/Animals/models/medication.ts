export interface Medication {
    id: number;
    name: string;
    description: string;
    dose: number;
    doseUnitOfMeasurement: string;
    frequency: string;
    duration: string;
    notes: string;
    active: boolean;
    clinicId: number;
    animalId: number;
  }
  