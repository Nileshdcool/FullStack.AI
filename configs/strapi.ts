import Strapi from "strapi-sdk-js"
import { BACKEND_URL } from "@/cms/config/constants";


const strapi = new Strapi({
    url: BACKEND_URL,
    prefix: "/api",
    store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: { path: "/" },
    },
    axiosOptions: {},
})

export default strapi;
