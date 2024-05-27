import axios from 'axios';

export const apiBackend = axios.create({
    baseURL: 'https://api.clara.projetohorizontes.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createConversation = async (cookieId: string) => {
    try {
        const body = { id_cookie: cookieId }; // Inclui o cookieId na requisição
        const response = await apiBackend.post('/conversa/', body);
        const { id:identifier, id_cookie } = response.data;
        window.localStorage.setItem('conversationIdentifier', identifier);
        window.localStorage.setItem('cookieId', id_cookie);
        return response.data;
    }
    catch (error: string | any) {
        console.error('Failed to create conversation:', error.response ? error.response.data : error.message);
        return null;
    }
}

export const createChat = async (message: string, conversationIdentifier: string) => {
    try {
        const body = { texto: message, id_conversa: conversationIdentifier };
        const response = await apiBackend.post('/mensagem/', body);
        return response.data;
    }
    catch (error: string | any) {
        console.error('Failed to create chat:', error.response ? error.response.data : error.message);
        return null;
    }
}
