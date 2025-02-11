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
    fetch(`https://qrent-backend.onrender.com/advertise/2/`,
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
            console.log(data);
            div.innerHTML=`
            <p>${data.title}</p>
            <p>${data.description}</p>
            <p>${data.price}</p>
            ${
                data.is_approved?`<button class="btn btn-success">Approved</button>`:`<button class="btn btn-danger">Not Approved</button>`
            }
            ${
                data.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</button>`
            }
            `
            parent.appendChild(div)
        }).
        catch(er=>console.log(er))
  }


  showDetail()