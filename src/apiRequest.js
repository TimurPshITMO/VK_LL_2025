import axios from 'axios';

export const sendRequest = async (cpm, hour_start, hour_end, publishers, audience_size, user_ids) => {

    console.log('sending:',{
        cpm,
        hour_start,
        hour_end,
        publishers,
        audience_size,
        user_ids
      })

      if (true) return await fetch("https://google.com/mcdkncjs")
        .catch((e)=>{return {result:'success', data: {at_least_one: 0.7, at_least_two: 0.6, at_least_three: 0.5}}})
        .finally((e)=>{return {result:'success', data: {at_least_one: 0.7, at_least_two: 0.6, at_least_three: 0.5}}})

  try {
    
      axios.post(`https://capifarm.ru:8443/api/request`, {
        cpm,
        hour_start,
        hour_end,
        publishers,
        audience_size,
        user_ids
      }).then((response)=>{return {result:'success',data: response.data}})

} catch (error) {
    console.error('Error while processing request :(', error);
    return {result:'error'};
  }
};