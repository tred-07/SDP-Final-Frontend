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
            const parent=document.getElementById("profile-container")
            const div=document.createElement("div")
            div.innerHTML=`
            <h2>Username: ${element.username}</h2>
            <p>${element.first_name} ${element.last_name}</p>
            <p>${element.email}</p>
            `
            div.classList.add('flex', 'flex-col', 'justify-center', 'border-[black]', 'rounded-[25px]', 'px-[20px]', 'py-[20px', 'border-[5px]', 'w-[20%]')
            parent.appendChild(div)
        });
        
    })
    .catch(error => console.error("Error:", error));
    
  }
  fetchProfile();