import { API_BASE_URL } from "./api-config";

export default async function call(api, method, request) {
 
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method
    };



    if(request) {
        console.log("request : ", request);
        options.body = JSON.stringify(request);
    }

    return await fetch(options.url, options)
    .then(
        (response) => {
            if(response.status === 200) {
                return response.json();
            }
        }
    ).catch(
        (error) => {
            console.error("HTTP Error");
            console.error(error);
        }
    );
}