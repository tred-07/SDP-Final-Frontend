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
    console.log("Ad id: ",id);
    fetch(`https://qrent-backend.onrender.com/advertise/${id}/`,
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
            console.log("Check: ",data.id,data.title,data.description,data.price,data.location,Object.getOwnPropertyNames(data.request).length);
            if(data.request)console.log("Check obj exist");
            else console.log("Check obj exist");
            
            
            data.request.forEach(el=>{
                console.log(el);
                
            })
            
            div.innerHTML=`
            <h3 style="text-align:center">Posted By Advertise title:</h3>
      <div class="d-flex justify-center py-[5px]">      <input type="text" name="" id="editT" value="${data.title}" style="border:1px solid black;"></div>
            <h3 style="text-align:center">Posted By Description</h3>
            <div class="d-flex justify-center py-[5px]"><input type="text" name="" id="editDes" value="${data.description}" style="border:1px solid black;"></div>
            <h3 style="text-align:center">Posted By Rent Price:</h3>
      <div class="d-flex justify-center py-[5px]">      <input type="text" name="" id="editP" value="${data.price}" style="border:1px solid black;"></div>
            <h3 style="text-align:center">Location:</h3>
         <div class="d-flex justify-center py-[5px]">   <input type="text" name="" id="editL" value="${data.location}" style="border:1px solid black;"></div>
         <div class="d-flex justify-center mb-[25px] mt-[5px]" onclick="editAd(${data.id})"><button class="btn btn-primary">Save</button></div>
            <div class="d-flex justify-center py-[5px] gap-[5px]">
            ${
                data.is_approved?`<button class="btn btn-success">Approved</button>`:`<button class="btn btn-danger">Not Approved</button>`
            }
            ${
                data.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</button>`
            }</div>
            <h3 style="text-align:center">Posted By ${data.name.toString().replaceAll(",","")} means you.</h3>
            `
            parent.appendChild(div)
            // console.log(data.name,typeof(data.name));
            
            // const showRequest=document.getElementById("showRequest")
            // console.log(typeof(data.request))
            // data.request.forEach(el => {
            //     console.log(el.user.username);
                
            //     div.innerHTML=`
            //         <h3 style="text-align:center">Posted By Message: ${el.message}</h3>
            //         ${
            //             el.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</buttom>`
            //         }
            //    `
            //    console.log(el.id);
               
            // });
            
        }).
        catch(er=>console.log(er))
  }


  showDetail();

  const editAd=(id)=>{
   const token=localStorage.getItem("token")
   const user_id=localStorage.getItem("user_id")
   const title=document.getElementById("editT").value
   const description=document.getElementById("editDes").value
   const price=document.getElementById("editP").value
   const location=document.getElementById("editL").value
   console.log(title,description,price,location);
   
   if(!token || !user_id)window.location.href="login.html"
   else{
    fetch(`https://qrent-backend.onrender.com/advertise/edit/${id}/`,{
        method:"PUT",
        headers:{Authorization:`Token ${token}`,"Content-Type":"application/json"},
        body:JSON.stringify({title,description,price,location})
    })
    .then(res=>{
        if(res.ok){
            alert("Edit Successfull")
            window.location.href="profile.html"
            return res.json()
        }
        else{alert("Something went wrong")}
    })
   }
   
  };


  