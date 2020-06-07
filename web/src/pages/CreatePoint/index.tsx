import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import './styles.css'
import { Link , useHistory} from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'
import { Map, TileLayer, Marker} from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import axios from 'axios'
import api from '../../services/api'

import Dropzone from '../../components/Dropzone'

import logo from '../../assets/logo.svg'

interface Item {
    id: number;
    name: string;
    image_url: string;
}
interface UFResponse {
   sigla: string
}
interface CityResponse {
    nome: string
}



const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ ufs, setUfs] = useState<string[]>([])
    const [cities, setCites] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('0')
    const [ selectedCity, setSelectedCity] = useState('0')
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [selectedFile, setSelectedFile] = useState<File>()
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const[ formData, setFormaData] = useState({
        name: '',
        email:'',
        whatsapp: ''
    })
    

    const history = useHistory()

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords

            setInitialPosition([latitude, longitude])
        })
    },[])

    useEffect(()=> {
        api.get('items').then(res =>{
            setItems(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get<UFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const UfInitials = res.data.map(uf => uf.sigla)
            setUfs(UfInitials)
        })
    }, [])
    useEffect(()=>{
        if(selectedUf === '0'){
            return
        }

        axios.get<CityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
            const cityNames = res.data.map(city => city.nome)
            setCites(cityNames)
        })

    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
         const uf = event.target.value

         setSelectedUf(uf)
    }
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
         const city = event.target.value

         setSelectedCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setFormaData({
            ...formData, [name]: value
        })
    }
    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)

        } else {
            setSelectedItems([ ...selectedItems, id ])
        }
    }
     async function handleSubmit(event: FormEvent){
        event.preventDefault()

        

        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems

        const data = new FormData()       
        data.append('name', name)
        data.append('email', email)
        data.append('whatsapp', whatsapp)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('city', city)
        data.append('uf', uf)
        data.append('items', items.join(','))
        
        if(selectedFile) {
            data.append('image', selectedFile)
        }

        await api.post('points', data)
        alert('made it')

        history.push('/')
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to='/'>
                    <FiArrowLeft />
                    Back to home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Collect point <br />registration </h1>
                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Information</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Entity name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text" 
                                name="whatsapp" 
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select the address in the map</span>
                    </legend>

                    <Map center={initialPosition } zoom={15} onClick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={ selectedPosition }/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">County</label>
                            <select 
                                name="uf" 
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}
                             >
                                <option value="0">Select the county</option>
                                {ufs.map(uf => (
                                  <option key={uf} value={uf}>{uf}</option> 
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select 
                                name="city" 
                                id="city" 
                                value={selectedCity}
                                onChange = {handleSelectCity}
                            >
                                <option value="0">Select the city</option>
                                {cities.map(city =>(
                                    <option key={city} value={city}>{city}</option> 
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Collection items</h2>
                        <span>Select one or two items below</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                        <li 
                            key={item.id} 
                            onClick={()=> handleSelectItem(item.id)}
                            className={selectedItems.includes(item.id) ? 'selected': ''}
                        >
                            <img src={item.image_url} alt={item.name}/>
                            <span>{item.name}</span>
                        </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">
                    Register collect point
                </button>
            </form>
        </div>
    )
}

export default CreatePoint