import React from 'react'
import { useNavigate } from 'react-router-dom';
const Contect = () => {

    const navigate=useNavigate()
    const userName=JSON.parse(localStorage.getItem("user"));
    const handleLogout=()=>{
        localStorage.removeItem("loggeduser");
        navigate("/login")
    }
    const handleContect=()=>{
        localStorage.removeItem("loggeduser");
        navigate("/")
    }
  return (
    <section
    class="vh-100 bg-image"
    style={{
        backgroundImage: "url('https://mbdcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
    }}
>
    <div className='mask d-flex align-item-center h-100 gradient-custom-3'>
        <div className='container h-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='col-12 col-md-9 col-lg-7 col-xl-6'>
                    <div className='card' style={{ borderRadius: "15px" }}>
                        <div className='card-body p-5'>
                            <h2 className='text-uppercase text-center mb-5'>
                                Home Page
                            </h2>
                            <p className='text-center'> Welcome To Contect page  -{userName.name}</p>
                            <button
                            onClick={handleLogout}
                            type='submit'
                            class='btn btn-success btn-block btn-lg gradient-custom-4 text-body center' 
                            >
                                Logout
                            </button>
                            <button
                           onClick={handleContect}
                            type='submit'
                            class='btn btn-success btn-block btn-lg gradient-custom-4 text-body center' 
                            >
                                Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Contect;