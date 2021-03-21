import axios from 'axios'

async function  getLatest(limit){
  const url = `http://localhost:8080/article/latest?limit=${limit}`;
  // console.log(url);
  let resp = {};
  await axios.get(url)
  .then(function (response){
    resp = response.data.value;
  }).catch(function (err){
    console.log(err);
  });
  return resp;
}

async function getAllPublisher(){
  const url = `http://localhost:8080/publisher`;
  let resp = {};
  await axios.get(url,{ headers: {"Access-Control-Allow-Origin": "*"} })
  .then((value)=>{
    resp = value.data.value;
  })
  .catch((err) => {
    console.log(err);
  });
  return resp;
}

async function getPublisherLatest(publisher, limit){
  const url = `http://localhost:8080/publisher/${publisher}/article?limit=${limit}`
  let resp = {};
  await axios.get(url)
  .then(function (response){
    resp = response.data.value;
  }).catch(function (err){
    console.log(err);
  });
  return resp;
}

export {getLatest, getAllPublisher, getPublisherLatest}