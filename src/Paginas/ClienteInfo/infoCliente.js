import React, { useEffect, useState } from 'react';
import api from '../../servicos/api';
import history from '../../history'
function Home()
{
    const [codigo,setCodigo]=useState('');
    const [nome,setNome]=useState('');
    const [email,setEmail]=useState('');
    const [cpf,setCpf]=useState('');

    const [carros,setCarros]=useState([]);
    useEffect(()=>{
        setCodigo(localStorage.getItem('cod_cli'));
        procurarInfo();
    },[]);
    async function procurarInfo(){
    
        const response = await api.get(`/pessoaCod/${localStorage.getItem('cod_cli')}`).then((resp)=>{
            setNome(resp.data[0].pes_nome);
            setCpf(resp.data[0].pes_cpf);
            setEmail(resp.data[0].pes_email);
        });
        const response2 = await api.get(`/carroPes/${localStorage.getItem('cod_cli')}`).then((resp)=>{
            setCarros(resp.data);
        });
    }
    function cadastrarCarro(){
        history.push('/cadastroCarro');
    }
    function editarCliente(){
        history.push('/cadastroCliente');
    }
    function cadastrarContato(){
        history.push('/cadastroContato');
    }
    function editarCarro(valor){
        localStorage.setItem('car_id',valor);
        history.push('/cadastroCarro');
    }
    function voltar(){
        localStorage.removeItem('cod_cli');
        history.goBack();
    }
    return (
    <div>
        <div>
            <p>Nome:{nome}</p>
            <p>Emal:{email}</p>
            <p>CPF:{cpf}</p>
        </div>
        <div id="divTable">
            <table id="tabela">
                <thead>
                    <tr>
                        <td>Placa</td>
                        <td>Desc</td>
                        <td>Ano</td>
                        <td>Ação</td>
                    </tr>
                </thead>
                <tbody>
                    {carros.map(carro=>(
                        <tr key={carro.car_id}>
                            <td>{carro.car_placa}</td>
                            <td>{carro.car_modelo}</td>     
                            <td>{carro.car_ano}</td>
                            <td><button type="button" onClick={()=>editarCarro(carro.car_id)}>Editar</button></td>          
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
        <button type="button" onClick={editarCliente}>Editar Cliente</button>
            <button type="button" onClick={cadastrarCarro}>Cadastrar Carros</button>
            <button type="button" onClick={cadastrarContato}>Cadastrar Contatos</button>
            <button type="button" onClick={voltar}>Voltar</button>
        </div>
    </div>
    );
}

export default Home;