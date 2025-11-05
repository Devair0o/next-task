import axios from "axios";

import { headers } from "next/headers";

const API = axios.create({
    baseURL: "http://localhost:3000",
    headers:{
        'Content-Type': 'application/json',
    },
});

export default API;