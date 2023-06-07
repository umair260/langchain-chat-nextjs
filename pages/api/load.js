export default async function (req, res) {
const endpoint= 'http://localhost:5000/load';

    // const response = await fetch(endpoint, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
      
      
    // });
   // res.stringify

   fetch(endpoint,{
method:"POST"})
  .then(response => console.log(response.json()))
  .catch(error => console.error('Error:', error));
  res.send({'A':"re"})
//    console.log('UUU')
//    console.log(response.json())
//      res.send(response);
  }
