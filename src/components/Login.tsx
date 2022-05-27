import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useSelector } from 'react-redux';
import { INITIAL_STATE } from '../utils/interface';
import { fetchRecords } from '../redux/service';
import { RootState } from '../redux/store';

const init: INITIAL_STATE = {
    name: '',
} 

const Login: React.FC = () => {
    const[state, setState] = useState(init);
    const[toggle, setToggle] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();

    const { records, loading, errors } = useSelector((state: RootState) => state.records);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const DisplayRecords = (): JSX.Element | JSX.Element[] => {
        
        if (loading) {
            return <ScaleLoader color={"#04AA6D"}/>;
        }
        
        if (errors) {
            return <p> Problem on our side. We will fix that ASAP </p>
        }
    
        return records.map((record: any, index: number) => {
            return (<div className="card" key={index}>
                        <div className="container">
                            <div className="records">
                                <p><b><label>Name</label></b><br/> { record.className }</p>
                                <div><b><label>Students</label></b><br/> 
                                    { record.classMates.map((student: string, index: number) =>{
                                        return( <li className="records" key={index}>
                                            <span>{ student }</span>
                                        </li>)
                                    }) } 
                                </div> 
                            </div>
                        </div>
                    </div>
                )
            })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(fetchRecords(state.name))
        setState(() => '');
        setToggle(true);
    }

  return (
    <div className="App">
        { !toggle?
                <form onSubmit={handleSubmit} className="form">
                    <div className="imgcontainer">
                        <img
                            className="avatar" 
                            src={'https://cdn2.iconfinder.com/data/icons/business-management-1/256/Businessman-512.png'} 
                            alt="Avatar"
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="name"><b>Student Name</b></label>
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            placeholder="name"
                            required
                        />
                        <button value="Submit" type="submit">Login</button>
                    </div>
                </form>
                :
                <div>
                    <ul>
                        <li className="active">
                            <Link
                                className="logout" 
                                to="/"
                                onClick={() => setToggle(false)}>Logout
                            </Link>
                        </li>
                    </ul>
                    <div className="card-container">
                        { DisplayRecords() }
                    </div>
            </div>
        }
    </div>
  )
}

export default Login;