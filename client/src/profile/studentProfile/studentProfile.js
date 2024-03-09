import React from 'react';
import "./studentProfile.scss";
import Tsegaye from "../../assets/Tsegaye.jpg";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Avatar, Container, Grid } from '@mui/material';

function StudentProfile() {

  return (
    <div className='profile-container'>
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '500px', padding: '16px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '4px', backgroundColor: '#fff' }}>
        <h2>Student Profile</h2>

        {/* Profile Picture Section */}
        <div style={{ position: 'relative', marginBottom: '16px', textAlign: 'center' }}>
          <Avatar alt='Profile' src={Tsegaye} sx={{ width: 150, left:150, height: 150, marginBottom: '8px' }} />
          <label htmlFor='profilePicture' style={{ position: 'absolute', bottom: 20, right: 190, transform: 'translate(50%, 50%)', backgroundColor: '#1976D2', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
            {<AddAPhotoIcon style={{ color: '#fff', fontSize: '20px' }} />}
          </label>
          <input type='file' id='profilePicture' name='profilePicture' accept='image/*' style={{ display: 'none' }} />
        </div>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginBottom: '16px' }}>
              <TextField fullWidth label='Full Name' id='fullName' name='fullName' placeholder='Enter your full name' />
            </Grid>

            <Grid item xs={12} sm={6} style={{ marginBottom: '16px' }}>
              <TextField fullWidth type='date' label='Birth Date' id='birthDate' name='birthDate' InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={12} sm={6} style={{ marginBottom: '16px' }}>
              <FormControl fullWidth>
                <InputLabel id='sex-label'>Sex</InputLabel>
                <Select labelId='sex-label' id='sex' name='sex' defaultValue='male'>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ marginBottom: '16px' }}>
              <TextField fullWidth type='email' label='Email' id='email' name='email' placeholder='Enter your email' />
            </Grid>

            <Grid item xs={12} style={{ marginBottom: '16px' }}>
              <TextField fullWidth type='tel' label='Phone Number' id='phoneNumber' name='phoneNumber' placeholder='Enter your phone number' />
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary' fullWidth>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default StudentProfile;
