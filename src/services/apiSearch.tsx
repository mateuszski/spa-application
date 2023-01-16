import axios from 'axios';

export const apiSearch = async (url: string) => {

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {     
        return error;
    }
};