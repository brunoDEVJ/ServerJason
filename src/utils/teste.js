const array = [
  {
    descricao: "qualquercoisa",
    numero: "123",
  },
  {
    descricao: "outro",
    numero: "1111",
  },
];

// const jobj = JSON.parse(obj)

let testcampo = []
let testvalue = []


// array.forEach(element => {
//   console.log(Object.keys(element).length)
// });



array.forEach((element) => {
  
  for (let i = 0; i <  Object.keys(element).length; i++) {
    
    testcampo[i] = Object.keys(element)[i];
    testvalue[i] = Object.values(element)[i];
  }
// console.log(testcampo[0],testvalue[0])
// console.log(testcampo[1],testvalue[1])
});

