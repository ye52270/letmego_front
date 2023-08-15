export async function call(api, method, request, hosturl) {
    hosturl = "/";

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
 
    let headers =new Headers({
        "Content-Type": "application/json",
    });
    
    if(accessToken && accessToken != null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }
     
    let options = {
        headers, 
        url: hosturl + api,
        method: method
    }; 

    console.log(options.url);

    if(request) {
        options.body = JSON.stringify(request);
    } 

    return await fetch(options.url, options)
    .then(
        (response) => {
            console.log("response : " + response);
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
    console.log(userDTO);
    return await call("/auth/signup", "POST", userDTO, "http://localhost:8080");
}

export function signout(){
    localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.setItem("USER_NAME", null);
    localStorage.setItem("USER_ROLE", null);
    window.location.href = "/";
}

export async function orderListAll(){
    const data =  await call("/order", "GET", null, "http://localhost:8081");
    return data;
}
export async function orderList(email) { 
    const data =  await call("/order?email=" + email, "GET", null, "http://localhost:8081");
    console.log(data);
    return data;
}

export async function proposal(proposalDTO){
    console.log("proposal 저장");
    return await call("/seller/proposal", "POST", proposalDTO, 'http://localhost:8084');
 
}

export async function order(orderDTO){
    return await call("/order/", "POST", orderDTO, 'http://localhost:8081');
}

export async function orderDetail(orderId = ""){
    if(orderId){
        return await call("/order/"+orderId, "GET", null, 'http://localhost:8081');
    }
    return null;
}

export async function proposalDetail(orderId = ""){
    if(orderId){
        return await call("/seller/proposal/" + orderId, "GET", null, 'http://localhost:8084'); 
    }
    return null;
}

export async function signin(userDTO){
 
    return await call("/auth/signin", "POST", userDTO, 'http://localhost:8080')
                    .then((response) => {
                        if(response.token) {
                            localStorage.setItem("ACCESS_TOKEN", response.token);
                            localStorage.setItem("USER_ROLE", response.userRole);
                            localStorage.setItem("USER_NAME", response.firstName + response.lastName);
                            localStorage.setItem("USER_ID", response.email);
                            // console.log(localStorage);
                            window.location.href = "/";
                        }
                    })
}
