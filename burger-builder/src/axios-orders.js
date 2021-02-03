import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://udemy-react-burger-build-default-rtdb.firebaseio.com'
});

export default axiosOrders;
