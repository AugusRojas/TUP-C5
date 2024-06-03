const API_KEY = '0d2587e64a079adc115aeec6a4485d59';

const iconMap = {
    "01d": "01d.svg",
    "01n": "01n.svg",
    "02d": "02d.svg",
    "02n": "02n.svg",
    "03d": "03d.svg",
    "03n": "03n.svg",
    "04d": "04d.svg",
    "04n": "04n.svg",
    "09d": "09d.svg",
    "09n": "09n.svg",
    "10d": "10d.svg",
    "10n": "10n.svg",
    "11d": "11d.svg",
    "11n": "11n.svg",
    "13d": "13d.svg",
    "13n": "13n.svg",
    "50d": "50d.svg",
    "50n": "50n.svg"
};

function App() {
    const [ciudad, setCiudad] = useState('Barcelona');
    const [clima, setClima] = useState(null);
    const [error, setError] = useState(null);

    const ciudades = ['Tucumán', 'Salta', 'Buenos Aires'];

    useEffect(() => {
        obteniendoClima(ciudad);
    }, [ciudad]);

    const obteniendoClima = async (ciudad) => {
        try {
            setError(null);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${API_KEY}&lang=es`);
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const data = await response.json();
            setClima(data);
        } catch (error) {
            setError(error.message);
            setClima(null);
        }
    };

    const cambioDeCiudad = (e) => {
        setCiudad(e.target.value);
    };

    const controlarSubmit = (e) => {
        e.preventDefault();
        obteniendoClima(ciudad);
    };

    return (
        <div className="containerclima">
            <header>
                <h1>Clima</h1>
                <nav>
                    {ciudades.map(c => (
                        <button key={c} onClick={() => setCiudad(c)}>{c}</button>
                    ))}
                </nav>
            </header>

            <form onSubmit={controlarSubmit} role="search">
                <input
                    type="search"
                    value={ciudad}
                    onChange={cambioDeCiudad}
                    placeholder="Buscar ciudad"
                    required
                />
            </form>
            {error && <p className="error">{error}</p>}
            {clima && (
                <div className="weather-card">
                    <h2>{clima.name}</h2>
                    <hr />
                    <img src={`./icons/${iconMap[clima.weather[0].icon]}`} alt={clima.weather[0].description} />
                    <hr />
                    <p className="pTemperatura">Temperatura: {clima.main.temp}°C</p>
                    <p>Mínima: {clima.main.temp_min}°C / Máxima: {clima.main.temp_max}°C</p>
                    <p>Humedad: {clima.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}