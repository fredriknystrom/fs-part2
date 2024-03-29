const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {

    const total = props.parts.reduce((s, p) => {
        return(
            s + p.exercises
        )
    }, 0)

    return (
      <div>
        {props.parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
        <p>total of {total} exercises</p>
      </div>

    )
  }

const Course = (props) => {
    console.log(props)
    const {course } = props

    return(
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course