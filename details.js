const adDetails=(id)=>{
    const token=localStorage.getItem("token")

    if(!token){
        window.location.href="login.html"
    }
    else{
        window.location.href="details.html"
        localStorage.setItem("ad_id",id)
    }
  }



  const showDetail=()=>{
    const id=localStorage.getItem("ad_id")
    const token=localStorage.getItem("token")
    localStorage.removeItem("ad_id")
    console.log(id);
    fetch(`https://qrent-backend.onrender.com/advertise/5/`,
        {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
    )
        .then(res=>res.json())
        .then(data=>{
            const parent=document.getElementById("showDetails")
            const div=document.createElement("div")
            div.innerHTML=`
            <p>${data.title}</p>
            <p>${data.description}</p>
            <p>${data.price}</p>
            <p>${data.name.toString().replaceAll(",","")}</p>
            ${
                data.is_approved?`<button class="btn btn-success">Approved</button>`:`<button class="btn btn-danger">Not Approved</button>`
            }
            ${
                data.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</button>`
            }
            `
            parent.appendChild(div)
            console.log(data.name,typeof(data.name));
            
            const showRequest=document.getElementById("showRequest")
            console.log(typeof(data.request))
            data.request.forEach(el => {
                console.log(el.user.username);
                
                div.innerHTML=`
                    <p>Message: ${el.message}</p>
                    ${
                        el.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</buttom>`
                    }
               `
               console.log(el.id);
               
            });
            
        }).
        catch(er=>console.log(er))
  }


  showDetail()