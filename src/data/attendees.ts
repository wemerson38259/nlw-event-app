import { faker} from '@faker-js/faker'

export const attendees = Array.from({length: 232}).map(() => {
    return(
        {
            id:faker.number.int({min:10000,max:20000}),
            name: faker.person.firstName(),
            email: faker.internet.email().toLocaleLowerCase(),
            creatAt:faker.date.recent({days: 30}),
            checkInAt:faker.date.recent({days: 7})
        }
    )
})