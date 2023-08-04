import { API_BASE_URL } from "./api-config";

export async function call(api, method, request) {

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
 
    let headers =new Headers({
        "Content-Type": "application/json",
    });
    
    if(accessToken && accessToken != null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }
     
    let options = {
        headers, 
        url: API_BASE_URL + api,
        method: method
    }; 

    if(request) {
        options.body = JSON.stringify(request);
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

export function signout(){
    localStorage.setItem("ACCESS_TOKEN", null)
    window.location.href = "/";
}

export async function signin(userDTO){

    return await call("/auth/signin", "POST", userDTO)
                    .then((response) => {
                        if(response.token) {
                            localStorage.setItem("ACCESS_TOKEN", response.token);
                            window.location.href = "/";
                        }

                    })
}