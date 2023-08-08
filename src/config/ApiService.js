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
                console.log("status 200 ok");
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
    localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.setItem("USER_NAME", null);
    window.location.href = "/";
}

export async function orderList() {
    const email = localStorage.getItem("USER_ID");
    const data =  await call("/order?email=" + email, "GET");
    return data;
}

export async function order(orderDTO){
 
    return await call("/order/", "POST", orderDTO);
 

}

export async function signin(userDTO){

    return await call("/auth/signin", "POST", userDTO)
                    .then((response) => {
                        if(response.token) {
                            localStorage.setItem("ACCESS_TOKEN", response.token);
                            localStorage.setItem("USER_NAME", response.firstName + response.lastName);
                            localStorage.setItem("USER_ID", response.email);
                            console.log(localStorage);
                            window.location.href = "/";
                        }

                    })
}
