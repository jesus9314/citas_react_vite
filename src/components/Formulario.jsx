import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
	// Hooks useState
	const [nombre, setNombre] = useState("");
	const [propietario, setPropietario] = useState("");
	const [email, setEmail] = useState("");
	const [alta, setAlta] = useState("");
	const [sintomas, setSintomas] = useState("");
	const [error, setError] = useState(false);

	// useEffect para controlar los cambios en la variable paciente
	useEffect(() =>{
		/* 
		Validamos si el objeto paciente tiene datos usando el método Object.keys que transforma el objeto en un array
		y luego con el método length validamos si el array tiene elementos
		*/
		if(Object.keys(paciente).length > 0){
			setNombre(paciente.nombre)
			setPropietario(paciente.propietario)
			setEmail(paciente.email)
			setAlta(paciente.alta)
			setSintomas(paciente.sintomas)
		}
	},[paciente])

	//Función que genera un key al azar al momento de registrar un nuevo objeto
	const generarId = () =>{
		const random = Math.random().toString(36).substr(2)
		const fecha = Date.now().toString(36)
		return random+fecha
	}

	//functión que se ejecuta al enviar el formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		// Validacion del Formulario
		if ([nombre, propietario, email, alta, sintomas].includes("")) {
			console.log("hay al menos un campo vacío");
			setError(true);
      return
		}
    setError(false)

    //Objeto de paciente
	//1 creamos el objeto sin id
    const objetoPaciente = {
        nombre,
        propietario,
        email,
        alta,
        sintomas,
    }
	//2 validamos si el objeto tiene id
	if(paciente.id){
		//Editando registro
		/*
		4. Si el objeto viene del componente ListadoPacientes, vendrá
		con su id, y de ser así, se le asignará al objeto nuevo creado ese mismo id
		*/
		objetoPaciente.id = paciente.id
		//creamos un nuevo arreglo
		const pacientesActualizados = pacientes.map( p => 
			//5. Busca el objeto con el mismo id, y lo modifica con el nuevo objeto modificado
			p.id===paciente.id ? objetoPaciente : p
		)
		//Asigna el nuevo array al arreglo pacientes
		setPacientes(pacientesActualizados)
		setPaciente({})
	}else{//3. si el objeto no tiene id, le asignamos uno y lo empujamos al array de pacientes
		//nuevo registro
		objetoPaciente.id=generarId()//generamos el id
		setPacientes([...pacientes,objetoPaciente])
	}
	//Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
	};

	return (
		<div className="md:w-1/2 lg:w-2/5">
			<h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
			<p className="text-lg mt-5 text-center mb-10">
				Añade Pacientes y {""}
				<span className="text-indigo-600 font-bold">Administralos</span>
			</p>
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
				{error && <Error msg='Todos los campos son obligatorios'/>}
				<div className="mb-5">
					<label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
						Nombre Mascota
					</label>
					<input value={nombre} onChange={(e) => setNombre(e.target.value)} id="mascota" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la mascota" />
				</div>
				<div className="mb-5">
					<label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
						Nombre del Propietario
					</label>
					<input value={propietario} onChange={(e) => setPropietario(e.target.value)} id="propietario" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del propietario" />
				</div>
				<div className="mb-5">
					<label htmlFor="email" className="block text-gray-700 uppercase font-bold">
						Email
					</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Correo del propietario" />
				</div>
				<div className="mb-5">
					<label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
						Alta
					</label>
					<input value={alta} onChange={(e) => setAlta(e.target.value)} id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
				</div>
				<div className="mb-5">
					<label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
						Síntomas
					</label>
					<textarea value={sintomas} onChange={(e) => setSintomas(e.target.value)} id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" cols="30" rows="10" placeholder="Indica los síntomas"></textarea>
				</div>
				<input 
				value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
				type="submit" 
				className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transitio-all" />
			</form>
		</div>
	);
};

export default Formulario;
