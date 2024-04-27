
import {create} from 'zustand';

const useAuthStore = create((set) => ({
    idUser: null,
    setIdUser: (newId) => {
        set({ idUser: newId });
    },
    
}));


export default useAuthStore;
