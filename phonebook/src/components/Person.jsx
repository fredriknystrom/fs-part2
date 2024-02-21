const Person = (props) => {
    return(
        <div>
            {props.name} {props.number}    
            <button onClick={props.deletePerson}>delete</button>
        </div>
    )
}

export default Person