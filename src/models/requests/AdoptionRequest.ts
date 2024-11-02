export interface AdoptionRequest {
    UserId: number;
    AdoptionDetails: [{AnimalId: number, Observation: string}];
}