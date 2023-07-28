const flowFn = (...fns) => fns.reduce((result, fn) => (...args) => {
  const r1 = result(...args)
  if (r1 != undefined && r1.then != undefined) {
    return r1.then(fn)
  }
  return fn(r1)
})

const get = (array) => (index) => array[index];
const getField = (fieldName) => (obj) => obj[fieldName];

const log = (text) => (input) => {
  console.log(text, input);
  return input;
};

const ifThen = (ifFn, thenFn) => (obj) => ifFn(obj)
  ? thenFn(obj)
  : emptyFn(obj);

const emptyFn = obj => obj;

const rotateArray = (originalArray, steps) => originalArray.map((val, index, arr) => arr[(index - steps + arr.length) % arr.length])

const filter = (filterFn) => (array) => array.filter(filterFn);

const forEach = (forEachFn) => (array) => {
  const newArr = [];

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const newElem = forEachFn(element);
    newArr.push(newElem);
  }

  return newArr;
};

const callObjFn = (fnName, ...args) => (obj) => obj[fnName](...args);
