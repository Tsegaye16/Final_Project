// UserList.js
import React, { useState, useEffect } from 'react';
import './profile.scss';
import axios from 'axios';
import Tsegaye from "./../../assets/Tsegaye.jpg"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PersonIcon from '@mui/icons-material/Person';
//import images from "../../../../server/upload/"
import empty from "../../assets/empty.webp"


const   AdminProfile = () => {
  const [edit, setEdit] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    sex: '',
    phone: '',
    birthDate: '',
    image: null,
  });
  const [user,setUser] = useState({})
  useEffect(() => {
    axios.get("http://localhost:8800/admin/viewHerself")
      .then((resp) => {
        const userData = resp.data[0];
        setUser({ ...userData });

        // Populate formData with user data
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          username: userData.username || '',
          password: userData.password || '',
          sex: userData.sex || '',
          phone: userData.phone || '',
          birthDate: userData.birthDate || '',
          image: null,  // Keep image null to avoid setting a default image
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
console.log(user)
  const handleEdit = () =>{
    setEdit(!edit)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: image,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    //const astics = `${user.password.substring(0, 3)}***${user.password.slice(-3)}`

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      await axios.post('http://localhost:8800/admin/updateAdmin', form);
      window.location.reload()

      // Additional logic after successful save if needed
    } catch (error) {
      console.error('Error saving admin profile:', error);
    }
    setEdit(!edit)
  };

  return (
    <div className="user-list">
      <div className='profile'>

      
        {edit &&
        
          <div className='default-visual' key={user.id}>          
        <div className='photo'>
          {user.image ? <img src={`http://localhost:8800/${user.image}`} alt='admin' style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />: <empty style={{fontSize:"10rem"}}/>}
         
          
        </div>
          <div  className='information'>
            <div className='info'>
              <span>full name</span> 
              <p>{user.name}</p>
              </div>
            <div className='info'>
              <span>E-mail</span> 
              <p>{user.email}</p>
            </div>
            <div className='info'>
              <span>User-name</span> 
              <p>{user.username}</p>
            </div>
            <div className='info'>
              <span>password</span> 
              <p> { user.password ? `${user.password.substring(0, 3)}***${user.password.slice(-3)}` : 'No password available'}</p>
            </div>
            <div className='info'>
              <span>Sex</span> 
              <p>{user.sex ? user.sex : 'No'}</p>
            </div>
            <div className='info'>
              <span>Phone number</span> 
              <p> {user.phone ? user.phone: 'No'} </p>
            </div>
            <div className='info'>
              <span>Birth Date</span> 
              <p>{user.birthDate ? user.birthDate: 'No'}</p>
            </div>
            
          </div>
          <button onClick={handleEdit}>Edit</button>
        </div>
      
      
        }
        {!edit &&
        
        <form className='form' onSubmit={handleSave}>          
        <div className='photo'>
        {user.image ? <img src={`http://localhost:8800/${user.image}`} alt='admin' style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />: <PersonIcon style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}/>}
         
          <label htmlFor='image'>{<AddAPhotoIcon/>}</label>
          <input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          onChange={handleFileChange}
        />
        </div>
          <div  className='information'>
          <div className='info' >
              
              <input
              type='text'
              id='namee'
              name='name'
              placeholder='Your full name'
              value={formData.name}
              onChange={handleInputChange}
            />
                </div>
            <div className='info'>
              
            <input
            type='email'
            id='email'
            name='email'
            placeholder='Your E-mail'
            value={formData.email}
            onChange={handleInputChange}
          />
            </div>
            <div className='info'>
              
            <input
            type='text'
            id='username'
            name='username'
            placeholder='User name'
            value={formData.username}
            onChange={handleInputChange}
          />
            </div>
            <div className='info'>
              
            <input
            type='password'
            id='password'
            name='password'
            placeholder='Your Password'
            value={formData.password}
            onChange={handleInputChange}
          />
            </div>
            <div className='info'>
              
            <input
            type='text'
            id='sex'
            name='sex'
            placeholder='Sex'
            value={formData.sex}
            onChange={handleInputChange}
          />
          </div>
            <div className='info'>
              
            <input
            type='text'
            id='phone'
            name='phone'
            placeholder='Your Phone'
            value={formData.phone}
            onChange={handleInputChange}
          />
            </div>
            <div className='info'>
              
            <input
            type='date'
            id='birthDate'
            name='birthDate'
            placeholder='Your Birth Date'
            value={formData.birthDate}
            onChange={handleInputChange}
          />
            </div>
            
          </div>
          <button type='submit' >Save</button>
          
        </form>
        }
        
        
        
        
        </div>
    </div>
  );
};

export default AdminProfile;

