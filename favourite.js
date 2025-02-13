const addToFavourite=(id)=>{
    const token=localStorage.getItem("token")
    const user_id=localStorage.getItem("user_id")
    if(!token || !user_id){
        window.location.href="login.html"
    }
    else{
        fetch(`https://qrent-backend.onrender.com/favourite/create/${id}/`,
       {
            method:"POST",
            headers:{
                Authorization:`Token ${token}`,
                "Content-Type":"application/json"
            },
        })
        .then(res=>{
            if(res.ok){
                alert("Added to favourite successfull. Please check My Favourite option.")
                return res.json()
            }
            else{
                alert("Something went wrong.")
            }
        })
        .catch(er=>console.log(er))
    }
}