const fetchProfile=()=>{
    const token = localStorage.getItem("token");
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
            const parentsAdvertise=document.getElementById("myAdvertise")
            parentsAdvertise.innerHTML=``
            const parent=document.getElementById("profile-part")
            const div=document.createElement("div")
            div.innerHTML=`
            <h2 class="text-center font-bold text-[2rem]">Username: ${element.username}</h2>
            <p class="text-center font-bold text-[2rem]">Name: ${element.first_name} ${element.last_name}</p>
            <p class="text-center font-bold text-[2rem]">Email: ${element.email}</p>
            <h2 class="text-center font-bold text-[2rem]">Total Advertisements:${element.advertise.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Favourite:${element.favourite.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Advertisements:${element.request.length}</h2>
            <h2 class="text-center font-bold text-[2rem]">Total Advertisements:${element.feedback.length}</h2>
            `
            div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[100px]', 'border-[5px]', 'w-[100%]')
            parent.appendChild(div)
            console.log(element);
            element.advertise.forEach(el=>{
                console.log(el.id,el.title,el.description,el.price,el.image,el.is_approved,el.is_accepted,el.created_at,el.updated_at);
            })

            element.favourite.forEach(el=>{
                console.log(el.id,el.advertise,el.created_at);
            })
            
            element.request.forEach(el=>{
                console.log(el.id,el.advertise,el.created_at);
            })

            element.feedback.forEach(el=>{
                console.log(el.id,el.advertise,el.rating,el.comment,el.created_at);
            })

        });
        
    })
    .catch(error => console.error("Error:", error));
    
  }
  fetchProfile();