import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Erro from './pages/Erro';
import Filme from './pages/Filme';
import Header from './components/Header';
import Detalhes from './pages/Detalhes';
import Favoritos from './pages/Favoritos';

function RoutesApp() {
    return(
        <BrowserRouter> 
            <Header/>
            <Routes>
                <Route path='/' element={<Filme/>}/>
                <Route path='/detalhes/:id' element={<Detalhes/>}/>
                <Route path='/favoritos' element={<Favoritos/>}/>
                <Route path='*' element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default RoutesApp;