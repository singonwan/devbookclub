import axios from 'axios';

// jwt is a stateless authentication
// this function takes in a token as a param from local storage.
// if there is we set the global header 'x-auth-token' with axios.
// if not, delete from global headers
// purpose: when have token, slap it on global header and send it with every request
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
