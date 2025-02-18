import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useApi(endPoint) {
    let req = useQuery({
        queryKey:[endPoint],
        queryFn:function(){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`) 
        },
    });
  return req
}
