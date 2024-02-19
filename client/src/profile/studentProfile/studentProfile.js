import React from 'react';
import "./studentProfile.scss";
import Tsegaye from"../../assets/Tsegaye.jpg"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function StudentProfile() {
  return (
    <div className='profile-container'>
      <div className='form-container'>
        <h2>Student Profile</h2>

        {/* Profile Picture Section */}
        <div className='profile-picture'>
          <img src={Tsegaye} alt='Profile' />
          <label htmlFor='profilePicture'>{<AddAPhotoIcon/>}</label>
          <input type='file' id='profilePicture' name='profilePicture' accept='image/*' />
        </div>

        <form>
          <div className='form-group'>
            <label htmlFor='fullName'>Full Name:</label>
            <input type='text' id='fullName' name='fullName' placeholder='Enter your full name' />
          </div>

          <div className='form-group'>
            <label htmlFor='birthDate'>Birth Date:</label>
            <input type='date' id='birthDate' name='birthDate' />
          </div>

          <div className='form-group'>
            <label htmlFor='sex'>Sex:</label>
            <select id='sex' name='sex'>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' placeholder='Enter your email' />
          </div>

          <div className='form-group'>
            <label htmlFor='phoneNumber'>Phone Number:</label>
            <input type='tel' id='phoneNumber' name='phoneNumber' placeholder='Enter your phone number' />
          </div>

          <button type='submit' className='update'>Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default StudentProfile;
