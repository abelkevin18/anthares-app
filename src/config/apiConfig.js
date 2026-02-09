// Configuración de la API
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000',
    ENDPOINTS: {
        CUSTOMERS: '/customers'
    }
}

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`
}