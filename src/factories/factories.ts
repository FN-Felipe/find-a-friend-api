import { authenticateFactory } from './authenticate-factory'
import { createOrgsFactory } from './create-orgs-factory'
import { createPetsFactory } from './create-pets-factory'
import { fetchPetsByCityFactory } from './fetch-pets-by-city-factory'
import { fetchQueryCharacteristcsFactory } from './fetch-query-characteristcs-factory'
import { petProfileFactory } from './pet-profile-factory'

export function Factories() {
  return {
    createOrgsFactory,
    authenticateFactory,
    createPetsFactory,
    fetchPetsByCityFactory,
    petProfileFactory,
    fetchQueryCharacteristcsFactory,
  }
}
