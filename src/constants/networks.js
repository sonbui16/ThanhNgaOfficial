import axios from 'axios';
const getLinkLive = (url, methods) => {
  return new Promise((resolve, reject) => {
    axios({
      method: methods,
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  });
};
export {getLinkLive};
