import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authToken, setAuthToken] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null)

    let [user, setUser] = useState(() =>
        localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null)

    let [loading, setLoading] = useState(true)

    let loginUser = async (e) => {
        e.preventDefault()

        let response = axios.post(`http://89.108.103.70/api/Auth/login`, {
            email: this.state.email,
            password: this.state.password
        }).response

        let data = response.data

        let getUser = await fetch('http://127.0.0.1:8000/api/profile/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.accessToken}`
            }
        })
        let dataUser = await getUser.json()
        if (response.status === 200) {
            setAuthToken(data)
            setUser(dataUser.user)
            localStorage.setItem('authTokens', JSON.stringify(data))
            localStorage.setItem('user', JSON.stringify(dataUser.user))
            window.location.replace("/Account")
        } else {
            alert('Ошибочка')
        }
    }

    // let registerUser = async (e) => {
    //     e.preventDefault()
    //     let response = await fetch('http://127.0.0.1:8000/api/register/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value, 'password2': e.target.password2.value })
    //     })
    //     if (response.status === 200) {
    //         let response = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
    //         })
    //         let data = await response.json()
    //         let getUser = await fetch('http://127.0.0.1:8000/api/profile/', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${data.access}`
    //             }
    //         })
    //         let dataUser = await getUser.json()
    //         if (response.status === 200) {
    //             setAuthToken(data)
    //             setUser(dataUser.user)
    //             localStorage.setItem('authTokens', JSON.stringify(data))
    //             localStorage.setItem('user', JSON.stringify(dataUser.user))
    //             nav('/profile')
    //         } else {
    //             alert('Ошибочка')
    //         }
    //     }
    // }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('user')
        window.location.replace("/Login")
    }

    let updateUser = (newUser) => {
        setUser(newUser)
    }

    let updateToken = async () => {
        console.log('Обновили')
        let response = await fetch('http://127.0.0.1:8000/api/Auth/update-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authToken.refresh })
        })
        let data = await response.json()
        let tokens = {
            'refresh': authToken.refresh,
            'access': data.access
        }
        if (response.status === 200) {
            setAuthToken(tokens)
            localStorage.setItem('authTokens', JSON.stringify(tokens))
        } else {
            logoutUser()
        }

    }

    let contextData = {
        user: user,
        authToken: authToken,
        updateUser: updateUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (authToken) {
                updateToken()
            }
        }, 1000 * 60 * 50)
        return () => clearInterval(interval)

    }, [authToken, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}