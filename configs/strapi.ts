import Strapi from "strapi-sdk-js"

const strapi = new Strapi({
    url: "http://localhost:1337",
    prefix: "/api",
    store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: { path: "/" },
    },
    axiosOptions: {},
})

export default strapi;
