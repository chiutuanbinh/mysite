import axios from 'axios'

export async function getPrice(id){
  let resp = {};
  const url = `http://localhost:8080/price/${id}`
  // console.log(url);
  await axios.get(url)
  .then(function (response){
    // console.log(response.data.buy);
    resp = response.data;
  }).catch(function (err){
    console.log(err);
  });
  return resp;
}