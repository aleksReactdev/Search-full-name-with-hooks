import React,{useState,useEffect,useRef} from 'react'


const Search = (props) => {
    const {onLoadIngredients} = props
    const [enteredFilter,setEnteredFilter] = useState('')
    const inputRef = useRef();
    const [isLoadint,setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        let query = enteredFilter.length === 0 ? '' : `
        ?orderBy="title"&equalTo="${enteredFilter}"
        `;
        
        fetch('https://searchreacthooks-default-rtdb.firebaseio.com/ingredients.json'+ query           
        )
        .then(resp => resp.json())
        .then(respData => {
            setIsLoading(false)
            const ingreds=[];
            for(let key in respData){
                ingreds.push({
                    id:key,
                    title:respData[key].title,
                    amount:respData[key].amount
                })
            }
            onLoadIngredients(ingreds)
        }).catch(error => {
            setIsLoading(true)
        })
    },[enteredFilter])

    return(
        <div>
            <input type='text' ref={inputRef} value={enteredFilter} onChange={(event) => setEnteredFilter(event.target.value)}  />
        </div>
    )
}

export default Search