import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './Jobs.css'
import hilti_logo from '../../assets/hilti_logo.png'

//Import Icons
import { BiTimeFive } from 'react-icons/bi'

// Assume this function is called when a specific job is applied to
const applyForJob = async (role, e) => {

  // Send the role to the server to generate questions
  const response = await fetch('http://localhost:3001/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role }), // Send the role in the request body
  });

  const data = await response.json();
  console.log(role);
  // Now data contains the generated questions which you can display to the use
  // Do something with the data, like storing it in state or navigating to another route where you can display the questions
};



const Data = [
  {
    id: 1,
    title: 'Web Developer',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 2,
    title: 'Software Developer',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 3,
    title: 'Software Engineer',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 4,
    title: 'Data Analysist',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 5,
    title: 'Digital Marketing',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 6,
    title: 'Senior Developer',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 7,
    title: 'Junior Developer',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
  {
    id: 8,
    title: 'Business Analysist',
    time: 'Now',
    location: 'Petaling Jaya, Malaysia',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
    company: 'Hilti Asia IT Services',
    companyLogo: hilti_logo
  },
]

const Jobs = () => {
  return (
    <div>
      <div className="jobContainer">
        {
          Data.map(({ id, title, time, location, description, company, companyLogo }) => {
            return (
              <div key={id} className="singleJob">
                <h1>{title}</h1>
                <span className="time">
                  <BiTimeFive /> {time}
                </span>

                <h6>{location}</h6>
                <p>
                  {description}
                </p>

                <div className='company'>
                  <img src={companyLogo} alt="Company Logo" className='w-[10%]' />
                  <span>{company}</span>
                </div>

                <Link to='/Tailored AI Questionnaire'>
                  <button type="button" className='Apply' onClick={(e) => applyForJob(title, e)}>
                    Apply Now
                  </button>
                </Link>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default Jobs