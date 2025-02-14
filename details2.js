const adDetailsTwo=(id)=>{
    const token=localStorage.getItem("token")

    if(!token){
        window.location.href="login.html"
    }
    else{
        console.log("check details2");
        
        window.location.href="details2.html"
        localStorage.setItem("ad_id",id)
    }
  }


  const showDetails=()=>{
    const id=localStorage.getItem("ad_id")
    localStorage.removeItem("ad_id")
    fetch(`https://qrent-backend.onrender.com/advertise/all/${id}/`)
    .then(res=>{
        if(res.ok){
            alert("OK")
            return res.json()
        }
        else{
            // alert("Something Went Wrong.")
            // window.location.href="index.html"
        }
    })
    .then(data=>console.log("Details: ",data)
    ).catch(er=>console.log(er))
  }



  showDetails()