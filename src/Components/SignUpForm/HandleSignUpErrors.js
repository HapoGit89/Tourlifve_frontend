export const handleError = (res)=>{
    const error=res.response.data.error.message

    if (`${error}`.includes(`Duplicate`))
    {
      alert (`Sorry this username is already taken`)
    }
    else if (`${error}`.includes("instance.password does not meet minimum length"))
    {
      alert (`Your password has to be at least 6 characters long`)
    }
    else if (`${error}`.includes(`email`))
    {
      alert (`Please check the length (minimum 6) and format of your email`)
    }
}