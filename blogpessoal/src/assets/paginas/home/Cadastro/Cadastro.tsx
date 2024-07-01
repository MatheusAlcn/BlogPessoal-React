import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../../../Models/Usuario'
import { cadastrarUsuario} from '../../../../Service/Service'
import './Cadastro.css'

function Cadastro() {
  const navigate = useNavigate();

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // armazenar os dados que o usuario digitou no form
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuarioResposta);
        alert('Deu bom.. é noiz');
      } catch (error) {
        alert('Deu ruim... =/');
      }
    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      setUsuario({ ...usuario, senha: "" }) 
      setConfirmarSenha("")                 
    }
  }

  function back() {
    navigate('/login')
  }

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back()
    }
  }, [usuarioResposta])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form
          className="flex justify-center items-center flex-col w-2/3 gap-3"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">E-mail</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2" onClick={back}>
              Cancelar
            </button>
            <button
              className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;