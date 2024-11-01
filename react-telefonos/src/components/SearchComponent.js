/* componente de búsqueda */

import React, {useState, useEffect} from 'react'

const SearchComponent = () => {
    //setar los hooks userState
    const [ users, setUsers] = useState([]);
    const [ search, setSearch ] = useState("");

    //conexión con la db
    useEffect(() => {
        fetch('/api/telefonos')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const searcher = (e) => {
        setSearch(e.target.value);
    }

    const normalizedSearch = normalizeString(search);

    const filteredContacts = users.filter(user => {
        return (
            (user.apellido && normalizeString(user.apellido).includes(normalizedSearch)) ||
            (user.nombre && normalizeString(user.nombre).includes(normalizedSearch)) ||
            (user.area && normalizeString(user.area).includes(normalizedSearch)) ||
            (user.ubicacion && normalizeString(user.ubicacion).includes(normalizedSearch)) ||
            (user.interno && typeof user.interno === 'string' && normalizeString(user.interno).includes(normalizedSearch))
        );
    });

   

    // //renderiza la vista
    return (
        <div>
            <input
                value={search} 
                onChange={searcher}
                type="text" placeholder="Buscar por área, nombre, apellido, interno o edificio"
                className="form-control"
            />
                <table className="table table-striped table-hover mt-5 shadow-lg">
                    <thead>
                        
                        <tr  className="bg-table">
                            <th scope="col">Apellido</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edificio</th>
                            <th scope="col">Área</th>
                            <th scope="col">Interno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.map(user => (
                            <tr key={user.id}>
                                <td>{user.apellido}</td>
                                <td>{user.nombre}</td>
                                <td>{user.ubicacion}</td>
                                <td>{user.area}</td>
                                <td>{user.interno}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default SearchComponent
