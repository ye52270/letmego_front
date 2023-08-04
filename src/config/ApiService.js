import { API_BASE_URL } from "./api-config";

async function call(api, method, request) {
 
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method
    };



    if(request) {
        options.body = JSON.stringify(request);
        console.log("body : ",JSON.stringify(request));
    }

    return await fetch(options.url, options)
    .then(
        (response) => {
            if(response.status === 200) {
                return response.json();
            }else if(response.status === 400) {
                alert("login 실패");
                window.location.href = "/sign-in"
            }else{
                Promise.reject(response);
                throw Error(response);
            }
        }
    ).catch(
        (error) => {
            console.error("HTTP Error");
            console.error(error);
        }
    );
}

export async function signup(userDTO){
    return await call("/auth/signup", "POST", userDTO);
}

export async function signin(userDTO){
 
    return await call("/auth/signin", "POST", userDTO)
                    .then((response) => {
                        if(response.token) {
                            window.location.href = "/";
                        }

                    })
}