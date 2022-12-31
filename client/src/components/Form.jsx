import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getActivity, getAllCountries, postActivity } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'

import s from './form.module.css'


function Form() {
  const dispatch = useDispatch()
  const history = useHistory()

  const countries = useSelector((state) => state.allCountries)
  const error = useSelector((state) => state.error)
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: []
  })


  console.log(input)
  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  /*   useEffect(() => {
      dispatch(getActivity())
  }, [dispatch])
   */


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value
      })
      console.log(e.target.checked)
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


    dispatch(postActivity(input))
    alert("Activity created succesfully")

    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: []
    })

    history.push('/home')
  }





return (
  <div className={`${s.form_mainDiv}`}>
    <Link to='/home'>
      <button>Home</button>
    </Link>
    <h1>Create your activity</h1>


    <form onSubmit={handleSubmit} > activity form
      <div className={`${s.form_formContainer}`}>
        <div className={`${s.form_inputs}`}>
          <label>Name:</label>
          <input type='text'
            value={input.name}
            name='name'
            onChange={handleChange}
          />
        </div>


        <div className={`${s.form_inputs}`}>
          <label>Difficulty:</label>
          <input type='text'
            value={input.difficulty}
            name='difficulty'
            onChange={handleChange} />
        </div>


        <div className={`${s.form_inputs}`}>
          <label>Duration:</label>
          <input type='text'
            value={input.duration}
            name='duration'
            onChange={handleChange} />
        </div>


        <div className={`${s.form_checks}`}>
          <label>Season:</label>
          <label>
            <input type='checkbox'
              value='Summer'
              name='summer'
              onChange={(e) => { handleCheck(e) }} />
            Summer </label>

          <label>
            <input type='checkbox'
              value='autumn'
              name='autumn'
              onChange={(e) => { handleCheck(e) }} />
            Autumn </label>

          <label>
            <input type='checkbox'
              value='winter'
              name='winter'
              onChange={(e) => { handleCheck(e) }} />
            Winter </label>

          <label>
            <input type='checkbox'
              value='spring'
              name='spring'
              onChange={(e) => { handleCheck(e) }} />
            Spring </label>

        </div>

        <div className={`${s.form_select}`}>
          <select onChange={handleSelect}>Countries:

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