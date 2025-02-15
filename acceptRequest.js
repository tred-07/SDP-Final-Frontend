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
            
            data.request.forEach(el=>{
                console.log("Req: ",el);
            })
            
    //         div.innerHTML=`
    //         <h3 style="text-align:center">Posted By Advertise title:</h3>
    //   <div class="d-flex justify-center py-[5px]">      <p id="editT" value="${data.title}" style="border:1px solid black;"></div>
    //         <h3 style="text-align:center">Posted By Description</h3>
    //         <div class="d-flex justify-center py-[5px]"><p id="editDes" value="${data.description}" style="border:1px solid black;"></div>
    //         <h3 style="text-align:center">Posted By Rent Price:</h3>
    //   <div class="d-flex justify-center py-[5px]">      <p id="editP" value="${data.price}" style="border:1px solid black;"></div>
    //         <h3 style="text-align:center">Location:</h3>
    //      <div class="d-flex justify-center py-[5px]">   <p id="editL" value="${data.location}" style="border:1px solid black;"></div>
    //         <div class="d-flex justify-center py-[5px] gap-[5px]">
    //         ${
    //             data.is_approved?`<button class="btn btn-success">Approved</button>`:`<button class="btn btn-danger">Not Approved</button>`
    //         }
    //         ${
    //             data.is_accepted?`<button class="btn btn-success">Accepted</button>`:`<button class="btn btn-danger">Not Accepted</button>`
    //         }</div>
    //         <h3 style="text-align:center">Posted By ${data.name.toString().replaceAll(",","")} means you.</h3>
    //         `
            
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
               `
               console.log("Req id: ",el.id);
               parent.appendChild(div)
            });
            
            
        }).
        catch(er=>console.log(er))
  }


  showDetail();



  