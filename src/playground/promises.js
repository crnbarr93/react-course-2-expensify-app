const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Andrew',
      age: 26
    });
  }, 1500);
  //   reject('Something went wrong!');
  // }, 1500);
});

promise.then((data) => {
  console.log('1', data);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
    }, 1500);
  });
}).then((str) => {
  console.log('does this run?', str);
}).catch((error) => {
  console.log('error', error);
});
