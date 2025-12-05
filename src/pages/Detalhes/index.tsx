import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import './detalhes.css';
import { toast} from "react-toastify";

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    vote_average: number;
}

function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
          params: {
            api_key: "8da13dd16afa022057d1239915a47e59",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado.");
          setLoading(false);
          navigate("/", {replace: true})
        });
    }

    loadFilme();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando detalhes do filme...</h2>
      </div>
    );
  }

  if (!filme) {
    return (
      <div className="detalhes-container">
        <h2>Filme não encontrado.</h2>
      </div>
    );
  }

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");
    

    let filmesSalvos: Movie[] = JSON.parse(minhaLista || '[]');

    let hashFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

    if(hashFilme){
      toast.warn("ESSE FILME JÁ ESTÁ NA LISTA")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("FILME SALVO COM SUCESSO!")
  }

  return (
    <div className="detalhes-container">
        <h1>{filme.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
          alt={filme.title}
        />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <h4>Avaliação: {filme.vote_average} / 10</h4>

        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a href={`https://youtube.com/results?search_query=${filme.title}`} target="_blank" rel="noreferrer">
      Trailer
    </a>
          </button>
        </div>
    </div>
  );
}

export default Detalhes;