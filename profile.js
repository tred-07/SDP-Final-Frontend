const fetchProfile=()=>{
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "login.html";
    }
    fetch("https://qrent-backend.onrender.com/user/my/",
        {
            method: "GET", 
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            },
        },
    ).
    then(response => response.json())
   .then(data => {
        data.forEach(element => {
            const parent=document.getElementById("profile-part")
            const div=document.createElement("div")
            div.innerHTML=`
            <h2 class="text-center font-bold text-[2rem]">Username: ${element.username}</h2>
            <p class="text-center font-bold text-[2rem]">Name: ${element.first_name} ${element.last_name}</p>
            <p class="text-center font-bold text-[2rem]">Email: ${element.email}</p>
            <h2 class="text-center font-bold text-[2rem]">Total Advertisement:${element.advertise.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Favourite:${element.favourite.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Request:${element.request.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Review:${element.feedback.length}</h2>
            `
            div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[100px]', 'border-[5px]', 'w-[100%]')
            parent.appendChild(div)
            console.log(element);
            element.advertise.forEach(el=>{
                console.log("Ad: ",el);
                const myAdvertiseM=document.getElementById("myAdvertiseM")
                const div=document.createElement("div")
                if(el.is_accepted && el.is_approved){
                    div.innerHTML=`
                <p>${el.id}</p>
                <p>${el.title}</p>
                <p>${el.description}</p>
                <p>${el.price}</p>
                <button><span class="btn btn-success">Approved</span></button>
                <button><span class="btn btn-success">Accepted</span></button>
                `
                }
                else if(!el.is_accepted && el.is_approved){
                    div.innerHTML=`
                <p>${el.id}</p>
                <p>${el.title}</p>
                <p>${el.description}</p>
                <p>${el.price}</p>
                <button><span class="btn btn-success">Approved</span></button>
                <button><span class="btn btn-danger">Not Accepted</span></button>
                <a href="details.html" target="_blank" class="btn btn-primary" onclick="adDetails(${el.id})">Edit</a>
                `
                }
                else{
                    div.innerHTML=`
                <p>${el.id}</p>
                <p>${el.title}</p>
                <p>${el.description}</p>
                <p>${el.price}</p>
                <button><span class="btn btn-danger">Not Approved</span></button>
                <button><span class="btn btn-danger">Not Accepted</span></button>
                 <a href="details.html" target="_blank" class="btn btn-primary" onclick="adDetails(${el.id})">Edit</a>
                `
                }
                myAdvertiseM.appendChild(div)
                
                
            })

            element.favourite.forEach(el=>{
                console.log(el.id,el.advertise,el.created_at);
            })
            
            element.request.forEach(el=>{
                console.log("Request: ",el.id,el.advertise,el.created_at);
                const myRequst=document.getElementById("myRequestM")
                const div=document.createElement("div")
            if(el.is_accepted){
                div.innerHTML=`
              <p>Advertise title: ${el.advertise}</p>
              <p>Requested time: ${el.created_at}</p>
              <p><span class="btn btn-primary">Is accepted by owner: </span> <span class="btn btn-success">Yes</span></p>
              
            `
            }
            else{
                div.innerHTML=`
              <p>Advertise title: ${el.advertise}</p>
              <p>Requested time: ${el.created_at}</p>
              <p><span class="btn btn-primary">Is accepted by owner: </span> <span class="btn btn-danger">No</span></p>
            `
            }
            myRequst.appendChild(div)
            })

            element.feedback.forEach(el=>{
                console.log(el.id,el.advertise,el.rating,el.comment,el.created_at);
            })

        });
        
    })
    .catch(error => console.error("Error:", error));
    
  }
  fetchProfile();


 