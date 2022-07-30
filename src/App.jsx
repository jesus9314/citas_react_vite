import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
	const init = JSON.parse(localStorage.getItem('pacientes')) ?? []
	// Hooks useState
	const [pacientes, setPacientes] = useState(init) // pacientes[]
	const [paciente, setPaciente] = useState({})// paciente{}

	useEffect(() =>{
		localStorage.setItem('pacientes', JSON.stringify(pacientes))
	},[pacientes])

	const eliminarPaciente = id =>{ 
		//creamos un nuevo array filtrando el objeto que tenga el id que recibimos
		const pacientesActualizados = pacientes.filter(p => p.id !== id)
		console.log(pacientesActualizados)
		//actualizamos pacientes con su método
		setPacientes(pacientesActualizados)
	}
	return (
		<div className="container mx-auto mt-20">
			<Header />
			<div className="mt-12 md:flex">

				<Formulario 
				pacientes={pacientes} 
				setPacientes={setPacientes} 
				paciente={paciente} 
				setPaciente={setPaciente}/>

				<ListadoPacientes 
				pacientes={pacientes} 
				setPaciente={setPaciente}
				eliminarPaciente={eliminarPaciente}/>
			</div>
		</div>
	);
}

export default App;
