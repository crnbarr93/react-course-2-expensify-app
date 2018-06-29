// const person = {
//   name: 'Connor',
//   age: 25,
//   location: {
//     city: 'Donaghadee',
//     temp: 21
//   }
// };
//
// const { name, age } = person;
//
// console.log(`${name} is ${age}.`);
//
// const { city, temp: temperature } = person.location;
//
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`);
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// }
//
// const { name:publisherName = 'Self-Published' } = book.publisher;
//
// console.log(publisherName);

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

const [, city, state = 'New York'] = address;

console.log(`You are in ${city}, ${state}.`);
