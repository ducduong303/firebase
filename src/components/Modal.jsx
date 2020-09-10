import React, { useContext, useState } from 'react'
import { ContextProvider } from '../Global/Context'

const Modal = () => {
    const { modal, closeModal, register ,logIn } = useContext(ContextProvider);
    const [statusModal, setStatusModal] = useState({
        register: true,
        login: false
    })
    const [inputs, setInputs] = useState({
        username: "",
        image:"",
        email: "",
        password: "",
     
    })
    const clearInput = () => {
        setInputs({
            username: "",
            image:"",
            email: "",
            password: "",
            
        })
    }
    const handleInput = (e) => {
         setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(inputs);
        register(inputs);
        clearInput();
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(inputs);
        logIn(inputs)
        clearInput();
    }
    const formToggle = () => {
        setStatusModal({
            ...statusModal,
            register: !statusModal.register,
            login: !statusModal.login
        })
    }
    const closeForm = (e) => {
        const className = e.target.getAttribute("class");
        if (className === "modal-box") {
            closeModal()
        }
    }
    return (
        <>
            {
                modal ?
                    <div className="modal-box" onClick={closeForm}>
                        <div className="col-lg-4">
                            {statusModal.register ?
                                <div className="modal-content">
                                    <form onSubmit={handleRegister}>
                                        <div className="register-logo">
                                            <span>Register</span>
                                        </div>
                                        <div className="modal-group">
                                            <input className="modal-input"
                                                type="text" name="username"
                                                placeholder="Nhập Usename......"
                                                value={inputs.username}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="modal-group">
                                            <input className="modal-input"
                                                type="text" name="email"
                                                placeholder="Nhập Email......"
                                                value={inputs.email}
                                                onChange={handleInput}
                                            />

                                        </div>
                                        <div className="modal-group">
                                            <input className="modal-input"
                                                type="text" name="password"
                                                placeholder="Nhập Password......"
                                                value={inputs.password}
                                                onChange={handleInput}
                                            />

                                        </div>
                                        <div className="modal-group">
                                            <input type="submit" value="Register" className="btn btn-primary"></input>
                                        </div>
                                        <div className="modal-group">
                                            <span className="modal-note" onClick={formToggle}>Already have an account?</span>
                                        </div>
                                    </form>
                                </div> :
                                <div className="modal-content">
                                    <form onSubmit ={handleLogin}>
                                        <div className="register-logo">
                                            <span>Login</span>
                                        </div>
                                        <div className="modal-group">
                                            <input className="modal-input"
                                                type="text" name="email"
                                                placeholder="Nhập Email......"
                                                value={inputs.email}
                                                onChange={handleInput}
                                            />

                                        </div>
                                        <div className="modal-group">
                                            <input className="modal-input"
                                                type="text" name="password"
                                                placeholder="Nhập Password......"
                                                value={inputs.password}
                                                onChange={handleInput}
                                            />

                                        </div>
                                        <div className="modal-group">
                                            <input type="submit" value="Login" className="btn btn-primary"></input>
                                        </div>
                                        <div className="modal-group">
                                            <span className="modal-note" onClick={formToggle}>Create a new account?</span>
                                        </div>
                                    </form>
                                </div>}

                        </div>
                    </div >
                    : ""
            }
        </>
    )
}

export default Modal
