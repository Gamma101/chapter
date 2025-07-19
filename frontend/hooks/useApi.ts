import { useAuth } from "@/context/AuthContext"
import axios from "axios"

export function useApi() {
  const { user } = useAuth()
  const api = axios.create({
    baseURL: "/api",
  })

  api.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  })
  return api
}

// usage example
//   useEffect(() => {
//     // Запрос к защищённому эндпоинту
//     api.get('/protected-data')
//       .then((response) => setData(response.data))
//       .catch((error) => console.error('Ошибка:', error));
//   }, []);
