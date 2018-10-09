import axios from './axios';
import endpoints from './endpoints';

export const fetchCountries = () => {
  return axios.get(endpoints.conuntries).then(data => {
    return data;
  });
};

export const fetchSampleUsers = () => {
  return axios
    .get(endpoints.sampleUsers)
    .then(res => {
      if (res && res.data) {
        return res.data;
      }
      return null;
    })
    .catch(err => {
      console.log(err);
    });
};
