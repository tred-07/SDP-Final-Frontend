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
        console.log(data);
        
    })
    .catch(error => console.error("Error:", error));
    
  }
  fetchProfile();