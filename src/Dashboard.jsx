import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'react';

function Dashboard(){
    const[suc, SetSuc ] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.post('http://localhost:3001/dashboard', { email, password })
      .then(res => {
        if(res.data === "Success"){
         
              SetSuc("Successful ok")
          }else{
            navigate('/')
          }
        }).catch(err => console.log(err));
    },[])
    return(
        <div>
            <h2>Dashboard</h2>
            <p>{suc}</p>
        </div>
    );
}

export default Dashboard;