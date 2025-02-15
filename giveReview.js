const giveReview=(id)=>{
    const token=localStorage.getItem("token")
    const star=document.getElementById("rating").value
    const review=document.getElementById("comment").value
    console.log(id,rating,comment);
    fetch(`https://qrent-backend.onrender.com/feedback/create/${id}/`,{
        method:"POST",
        headers:({Authorization:`Token ${token}`,"Content-Type":"application/json"}),
        body:JSON.stringify({star,review})
    }).then(res=>{
        if(res.ok){
            alert("Successfully Submitted.")
            return res.json()
        }
    }).then(data=>{
        window.location.href="profile.html"
    })
}