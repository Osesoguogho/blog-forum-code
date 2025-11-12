import React from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const post = {name, email, phone, message};
  console.log(post);
  

    async function handleSubmit(e) {
      e.preventDefault();
    setLoading(true);
    try{
    const res = await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: {Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    });
    if(!res.ok) setStatus("Post not sent");
    const response = await res.json();
    console.log(response)
    if(response === "sucess") setStatus("post sent successfully");
      setLoading(false)
     }catch(err) {
   console.log(err.message)
   setError(err.message)
    }
  }

  return (
    <div className='min-h-screen light text-black dark:text-white flex flex-col justify-center items-center'>
      <p className='m-5 font-bold leading-8 text-lg'>Naija247 is a website design by Dr Oguogho Osebhohien. A medical Doctor and a programmer by profession. for advert and other enquiries contact us below.
      </p>
      <h3><span>Email: </span> </h3>
       <hr/>
        
        <form className="flex flex-col  justify-center items-center">
          {error && <p className='text-red-600'>{error}</p>}
          {status && <p className='text-[#03fc45]'>{status}</p>}
        <h1 className='m-5'>Contact Us</h1>
        <label htmlFor="name"> Name</label>
           <input type="text" name='name' placeholder='Your Name' className='mb-5 w-3/4 rounded-lg contact-form text-black text-center' value={name} onChange={(e)=> setName(e.target.value)} />
           <label htmlFor="email">Email</label>
           <input type="email" name='email' placeholder='example@gmail.com' className='mb-5 w-3/4 rounded-lg text-black contact-form text-center' value={email} onChange={(e)=> setEmail(e.target.value)} />
           <label htmlFor="phone">Phone Number</label>
           <input type="number" name='phone' placeholder='080****' className='mb-5 w-3/4 rounded-lg text-black contact-form text-center' value={phone} onChange={(e)=> setPhone(e.target.value)}  />
           <label htmlFor="note">Message</label>
            <textarea name="note" placeholder='leave a note for us here' id="note"
            onChange={(e)=> setMessage(e.target.value)} value={message} cols="50" rows="4" className='text-black text-center w-3/4 rounded-lg contact-form'/>
        <button onClick={handleSubmit} className="my-3 px-3 bg-blue-600 w-1/4 rounded-xl my-5">{loading?"submitting": "submit"}</button>
        </form>
    </div>
  )
}

export default Contact