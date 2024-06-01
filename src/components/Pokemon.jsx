import { useEffect, useState } from "react";


function Pokemon() {

    const [pokemonList,setPokemonlist] = useState([])
    const [loading,setLoading] = useState(true)
    const [detail,setDetail] = useState(false)
    const [dataDetail,setDataDetail] = useState([])
    const [prevUrl,setPrevUrl] = useState('')
    const [nextUrl,setNextUrl] = useState('')
    const [apiUrl,setAipUrl] = useState('https://pokeapi.co/api/v2/pokemon')

    async function getAllPokemon(){
        const restData = await fetch(apiUrl)
        const jsonData = await restData.json()

        setPrevUrl(jsonData.previous || '')
        setNextUrl(jsonData.next || '')


       
        // setPokemonlist(jsonData.results)
        let pokemonDetail = []
        jsonData.results.map(async(item,index)=>{
          const resDataDetail = await fetch(item.url)
          const jsonDataDetail = await resDataDetail.json()
          
          pokemonDetail[index] = jsonDataDetail

          setPokemonlist([...pokemonDetail])
        })

    }
    function pokemonDetail(){
      return(
        <div className="detail" onClick={ ()=>{
          setDetail(false)
        }}>
          <div className="item">
            <a>X</a>
            <div className="image">
              <img src={dataDetail.sprites.other.dream_world.front_default} alt="" />
            </div>
            <div className="title">{dataDetail.name}</div>
            <div className="abilities">{
              dataDetail.abilities.map((item,index)=>{
                return(
                  <span key={index}>{item.ability.name}</span>
                )
              })
            }</div>
          </div>
        </div>

      )
    }
    useEffect(()=>{

        getAllPokemon()
        setLoading(false)
    },[apiUrl])
    // console.log(pokemonList)
  return (
    <div className='wrapper'>
      <div className="content">
        {
          loading && (
            <div className="loading">
              Ngopi Dulu Bro
              <div className="loader"></div>
            </div>
          )
        }
        {
          
          detail && (
            pokemonDetail()
          )
        }
        <div className="grid">
          {
            pokemonList.map((item,index)=>{
                return(
                  <div className="item" key={index} onClick={ ()=>{
                    setDetail(true)
                    setDataDetail(item)
                  }}>
                    <div className="image" >
                      <img src={item.sprites.front_default} alt="" />
                    </div>
                    <div className="title">{item.name}</div>
                    .
                  </div>
                )
            })
          }
        </div>
        {
          prevUrl && (
              <div className="pagination-left">
              <button onClick={()=> {
                setAipUrl(prevUrl)
              }}>&laquo;</button>
            </div>
          )
        }
        {
          nextUrl && (
            <div className="pagination-right">
              <button onClick={ ()=>{
                setAipUrl(nextUrl)
              }}>&raquo;</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Pokemon