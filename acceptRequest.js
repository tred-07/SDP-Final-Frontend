const adDetailsThree=(id)=>{
    const token=localStorage.getItem("token")

    if(!token){
        window.location.href="login.html"
    }
    else{
        window.location.href="details3.html"
        localStorage.setItem("ad_id",id)
    }
  }



  const showDetail=()=>{
    const ad_id=localStorage.getItem("ad_id")
    const token=localStorage.getItem("token")
    localStorage.removeItem("ad_id")
    console.log("Ad id: ",ad_id);
    fetch(`https://qrent-backend.onrender.com/advertise/${ad_id}/`,
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
            
            localStorage.setItem("title",data.title)
            localStorage.setItem("description",data.description)
            localStorage.setItem("location",data.location)
            localStorage.setItem("price",data.price)
            data.request.forEach(el => {
                const parent=document.getElementById("showDetails")
            const div=document.createElement("div")
                console.log(el.user.username);
                div.innerHTML=`
                    <h3 style="text-align:center">Advertise id: ${data.id}</h3>
                    <h3 style="text-align:center">Advertise title: ${data.title}</h3>
                    <h3 style="text-align:center">Sender: ${el.name}</h3>
                    <h3 style="text-align:center">Message: ${el.message}</h3>
                    <div class="d-flex justify-center items-center"> Request status: ${
                        el.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</buttom>`
                    }</div>
                    <div class="d-flex justify-center items-center my-[10px]">Do you want to accept this? <button class="btn btn-success" onclick="acceptRequest(${data.id},${el.id})">Yes</button></div>
               `
               console.log("Req id: ",el.id);
               parent.appendChild(div)
            });
            
            
        }).
        catch(er=>console.log(er))
  }


  showDetail();



  const acceptRequest=(ad_id,req_id)=>{
    const token=localStorage.getItem("token")
    const user_id=localStorage.getItem("user_id")
    const title=localStorage.getItem("title")
    localStorage.removeItem("title")
    const description=localStorage.getItem("description")
    localStorage.removeItem("description")
    const price=localStorage.getItem("price")
    localStorage.removeItem("price")
    const location=localStorage.getItem("location")
    localStorage.removeItem("location")
    const is_accepted="True"
    console.log(title,description,price,location);
    
    if(!token || !user_id)window.location.href="login.html"
    else{
     fetch(`https://qrent-backend.onrender.com/advertise/edit/${ad_id}/`,{
         method:"PUT",
         headers:{Authorization:`Token ${token}`,"Content-Type":"application/json"},
         body:JSON.stringify({title,description,price,location,is_accepted})
     })
     .then(res=>{
         if(res.ok){
            //  alert("Accepted.")
            //  window.location.href="profile.html"
             return res.json()
         }
         else{alert("Something went wrong")}
     })
     fetch(`https://qrent-backend.onrender.com/request/${req_id}/`,{
        method:"GET",
        headers:({Authorization:`Token ${token}`,"Content-Type":"application/json"})
     })
     .then(res=>res.json())
     .then(data=>{
        localStorage.setItem("req_message",`${data.message}`)
        localStorage.setItem("is_accepted",`${data.is_accepted}`)
     })
     .catch(er=>console.log(er))
     const message=localStorage.getItem("req_message")
     localStorage.removeItem("req_message")
    //  const is_accepted=localStorage.getItem("is_accepted")
    //  localStorage.removeItem("is_accepted")
    //  if(!is_accepted)is_accepted=true
     fetch(`https://qrent-backend.onrender.com/request/edit/${req_id}/`,{
        method:"PUT",
        headers:({Authorization:`Token ${token}`,"Content-Type":"application/json"}),
        body:JSON.stringify({message,"is_accepted":"true"})
     })
     .then(res=>{
        if(res.ok){
            alert("Accepted.")
            window.location.href="profile.html"
            location.reload()
        }
        else{
            alert("Something went wrong.")
            window.location.href="profile.html"
            location.reload()

        }
     })
    }
    
   };



  