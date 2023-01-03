import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getActivity, getAllCountries, postActivity } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'

import s from './form.module.css'
let wordAtLeastOneLetter = new RegExp('^[a-zA-Z]{3,}$')
let regOneToFive = new RegExp('^[1-5]$')
let regOneToTen = new RegExp('^[1-9]$')



const validateForm = (input) => {
  let inputError = {}

  if (!wordAtLeastOneLetter.test(input.name)) {
    inputError.name = "Name required"
  } else { inputError.name = "" }
  if (!input.difficulty) {
    inputError.difficulty = "A number is required"
  } else { inputError.difficulty = "" }
  if (!regOneToFive.test(input.difficulty)) {
    inputError.difficulty = "value must be under 5"
  } else { inputError.difficulty = "" }
  if (!regOneToTen.test(input.duration)) {
    inputError.duration = "value must be under 10"
  } else { inputError.duration = "" }
  return inputError
}



function Form() {


  const dispatch = useDispatch()
  const history = useHistory()

  const countries = useSelector((state) => state.allCountries)
  const error = useSelector((state) => state.error)
  const [inputError, setInputError] = useState({})

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: []
  })

  const season = ['Winter', 'Spring', 'Autumn', 'Summer'];




  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])



  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    //control errores
    setInputError(validateForm({
      ...input,
      [e.target.name]: e.target.value
    }))


  }


//Handles

  const handleSeason = (e) => {
    if (e.target.value) {
      setInput({
        ...input,
        season: e.target.value
      })
      console.log(e.target.value)
    }
  }


  const handleSelect = (id) => {
    if (id.target.value) {
      setInput({
        ...input,
        countries: [...input.countries, id.target.value]
      })

    }
  }


  const handleDelete = (e) => {
    setInput({
      ...input,
      countries: input.countries.filter(c => c !== e)
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(input)

    if (input.name && input.difficulty && input.duration && input.season && input.countries !== "") {

      dispatch(postActivity(input))
      alert("Activity created succesfully")
      history.push('/home')
    }
    else {

      console.log(inputError)
      alert("some information is missing")
    }



    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: []
    })


  }



//Render

  return (
    <div className={`${s.form_mainDiv}`}>
      <Link to='/home'>
        <button className = {`${s.form_toHomeBtn}`}>Home</button>
      </Link>
      <h1>Create your activity</h1>


      <form onSubmit={handleSubmit} >
        <div className={`${s.form_formContainer}`}>

          <div className={`${s.form_inputs}`}>
            <label>Name:</label>
            <input type='text'
              value={input.name}
              name='name'
              onChange={handleChange}
            />
            {inputError.name && (<p className= {`${s.form_error}`}>{inputError.name}</p>)}
          </div>

          <div className={`${s.form_inputs}`}>
            <label>Difficulty:</label>
            <input type='text'
              value={input.difficulty}
              name='difficulty'
              onChange={handleChange} />
            {inputError.difficulty && (<p className= {`${s.form_error}`}>{inputError.difficulty}</p>)}
          </div>

          <div className={`${s.form_inputs}`}>
            <label>Duration:</label>
            <input type='text'
              value={input.duration}
              name='duration'
              onChange={handleChange} />
            {inputError.duration && (<p className= {`${s.form_error}`}>{inputError.duration}</p>)}
          </div>

          <div className={`${s.form_checks}`}>
            <label>Season: </label>
            <select onChange={handleSeason} required>
              <option value="" hidden>Select season</option>
              {season.map(e => (
                <option value={e} name="season" key={e} >{e}</option>
              ))}
            </select>
          </div>


          <div className={`${s.form_select}`}>
            <select onChange={handleSelect}>Countries:

            <option value="" name="countSelect" >Countries</option>
              {countries?.map(e => {

                return (
                  <option value={e.id} name="countries" key={e.id}>{e.name}</option>
                )

              })}

            </select>


            <div className={`${s.form_ul}`}>
              <ul >
                <li>{input.countries.map(el =>
                  <div onClick={() => handleDelete(el)} key={el} className={`${s.form_ulLi}`}>
                    {el}

                  </div>
                )} </li>
              </ul>

            </div>


            <div>
              <button type="submit">Create activity</button>
            </div>


          </div>
        </div>
      </form>

    </div>
  )
}

export default Form