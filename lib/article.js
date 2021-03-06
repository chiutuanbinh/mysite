import axios from 'axios'

async function getLatest(limit){
  let resp = {};
  const url = `http://localhost:8080/article/latest?limit=${limit}`;
  console.log(url);
  await axios.get(url)
  .then(function (response){
    // console.log(response.data);
    resp = response.data;
  }).catch(function (err){
    console.log(err);
  });
  return resp;
}

export {getLatest}