const express = require("express")
const server = express()

// Ajusta para o express usar JSONs
server.use(express.json())

let jogadores = [
    {id:1, nickName:"Rama", nome:"Ramon Bobella", classificacao:1, estatisticas:0, conquistas:[]},
    {id:2, nickName:"Faccin", nome:"Guilherme Faccin", classificacao:1, estatisticas:0, conquistas:[]},
    {id:3, nickName:"Dudo", nome:"Eduardo Bolsan", classificacao:1, estatisticas:0, conquistas:[]},
    {id:4, nickName:"Pablo", nome:"Pablo sei la o sobrenome", classificacao:1, estatisticas:0, conquistas:[]},
    {id:5, nickName:"Thiago", nome:"Thiago sei la tmb", classificacao:1, estatisticas:0, conquistas:[]},
]

// Rota Raiz
server.get("/", (req,res) => {
    return res.status(200).json({mensagem: "Servidor funcionando"})
})


// Rota para listar todos os jogadores
server.get("/jogadores", (req,res)=>{
    //busca o parametro da URL
   let searchNick = req.query.searchNick

   if(searchNick != undefined){
       return res.status(200).json(jogador)
   } else {
       return res.status(200).json(jogadores)
   }
})

// Rota para buscar um jogador específico
server.get("/jogadores/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const jogador = jogadores.find(item => item.id === id)
    let httpStatus = jogador ? 200 : 404
    return res.status(httpStatus).json(jogador)
})

// Rota para inserir um jogador
server.post("/jogadores", (req,res) => {
    const{ nome, nickName, classificacao, conquistas, estatisticas } = req.body
    const newId = jogadores[jogadores.length - 1].id + 1

    const newJogador = {
        id: parseInt(newId), 
        nome: nome,
        nickName: nickName,
        classificacao: classificacao,
        estatisticas: estatisticas,
        conquistas: conquistas
    }


    jogadores.push(newJogador)

    return res.status(201).json(newJogador)
})

// PUT /jogadores/:id Altera o jogador com a ID :id
server.put("/jogadores/:id", (req,res) => {
    const id = parseInt(req.params.id)
    const{ nome, nickName, classificacao, conquistas, estatisticas } = req.body

    const index = jogadores.findIndex(item => item.id === id)
    const httpStatus = index >= 0 ? 200 : 404

    if(index >= 0){
        jogadores[index] = {
            id: parseInt(id), 
            nome: nome,
            nickName: nickName,
            classificacao: classificacao,
            estatisticas: estatisticas,
            conquistas: conquistas
        }
    }
    return res.status(httpStatus).json(jogadores[index])
})

// DELETE  /jogadores/:id    Exclui o jogador com a ID :id
server.delete("/jogadores/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = jogadores.findIndex(item => item.id === id)
    const httpStatus = index >= 0 ? 200: 404

    if( index >= 0){
        jogadores.splice(index, 1)
    }

    return res.status(httpStatus).json()
})

let conquistas = [
    {id:1, nome:"Contador de Histórias", descricao:"Complete as Histórias de Guerra: Por Conta Própria, Nordlys e Tirailleur no Médio."},
    {id:2, nome:"Ceifador", descricao:"No multiplayer, elimine 30 inimigos."},
    {id:3, nome:"Elite", descricao:"Consiga 500.000 pontos como jogador."},
    {id:4, nome:"Não no Meu Turno", descricao:"No multiplayer, execute 10 reanimações de pelotão."},
    {id:5, nome:"Herói da Segunda Guerra Mundial", descricao:"Consiga todos os outros Troféus de Battlefield V."},
]

server.get("/conquistas", (req,res)=>{
    return res.status(200).json(conquistas)
})

server.get("/conquistas/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const conquista = conquistas.find(item => item.id === id)
    let httpStatus = conquista ? 200 : 404
    return res.status(httpStatus).json(conquista)
})


server.post("/conquistas", (req,res) => {
    const{ nome, descricao } = req.body
    const newAchv = conquistas[conquistas.length - 1].id + 1

    const newAchievement = {
        id: parseInt(newAchv),
        nome: nome,
        descricao: descricao
    }


    conquistas.push(newAchievement)

    return res.status(201).json(newAchievement)
})
server.listen(3000, () => { console.log("Escutando na porta 3000")})