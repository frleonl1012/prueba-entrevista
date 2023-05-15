import React,{useState} from 'react';
import '../assets/css/Form.css';
import { useForm } from "react-hook-form";

const Formulario = () =>{
    const {register, formState:{errors} , handleSubmit} = useForm();

    const [query, setQuery] = useState([]);

    const onSubmit = (data) => {
        console.log(data.rut);
        
        fetch(`https://jsonplaceholder.typicode.com/users?email=${data.rut}`, {
            "method": "GET",
        })
        .then(response => response.json())
        .then(response => {
            setQuery(response)
        })
        .catch(err => { console.log(err); 
        });
   
    }

    return(
        <div className='container'>
            <h5>Formulario Ingreso de rut</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Rut</label>
                    <input type="text" placeholder='ej: 11111111-1' className="form-label" {...register('rut',{
                        required: true,
                    })} />
                    {errors.rut?.type === 'required' && <p className='msjError'>El campo rut es requerido</p>}

                </div>
            
                <button type="submit" className="btn btn-success">Enviar</button>
            </form>

            <ul>
                {query.map((datos,i)=>{
                    return(
                        <li key={i}>{datos.name}</li>
                    )
                })}
            </ul>
        </div>
    );
}


export default Formulario;