import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.UNPLAS_URL;
const KEY = process.env.UNPLAS_KEY;

const searchImages = async(query:string) => {
    try {
        return await axios.get(URL +'?query=' + query + '&client_id=' + KEY).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.log(error);
        return {message: "Unalbe to access unplash"};
    }
};

export default searchImages;
