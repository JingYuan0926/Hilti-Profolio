import React from 'react'
import './Search.css'

//External Imports
import { AiOutlineSearch, AiOutlineCloseCircle} from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

const Searchbar = () => {
  return (
    <div className="Searchbar">
        <form action="">

          <div className="firstDiv">
            <div className="secondDiv">
              <AiOutlineSearch className="icon" />
              <input type="text" placeholder="Search for a Job" />
                <AiOutlineCloseCircle className="icon2" />
            </div>
          
            <div className="secondDiv">
              <BsHouseDoor className="icon" />
              <input type="text" placeholder="Search by Companies" />
                <AiOutlineCloseCircle className="icon2" />
            </div>

            <div className="secondDiv">
              <CiLocationOn className="icon" />
              <input type="text" placeholder="Search by Locations" />
                <AiOutlineCloseCircle className="icon2" />
            </div>

            <button className="btnSearch">Search</button>

          </div>
        </form>

        <div className="thirdDiv">
          <div className="SingleSearch">
            <label htmlFor="relavance">Sort by:  </label>

            <select name="" id="relavance">
              <option value="">Relavance</option>
              <option value="">Inclusive</option>
              <option value="">Starts With</option>
              <option value="">Contains</option>
            </select>
          </div>

          <div className="SingleSearch">
            <label htmlFor="type">Type:  </label>

            <select name="" id="type">
              <option value="">Full Time</option>
              <option value="">Part-time</option>
              <option value="">Hybrid</option>
            </select>
          </div>

          <div className="SingleSearch">
            <label htmlFor="level">Level:  </label>

            <select name="" id="level">
              <option value="">Senior</option>
              <option value="">Junior</option>
              <option value="">Associates</option>
              <option value="">Fresh grads</option>
            </select>
          </div>


      <span>Clear All</span>


        </div>

    </div>
  )
}

export default Searchbar