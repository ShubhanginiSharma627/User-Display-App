import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, CircularProgress, InputAdornment } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
const getTextColor = (hairColor) => {
  if(hairColor){
    if (hairColor.includes(",")) {
      const hairColorsArray = hairColor.split(",");
      hairColor = hairColorsArray[0].trim();
    }

    if (hairColor=='black' || hairColor == 'auburn'){
        return 'white'
    }
    else{
      return 'black'
    }
  }


  return  'black';
};
const getBgColor = (hairColor) => {
  if(hairColor){
    if (hairColor.includes(",")) {
      const hairColorsArray = hairColor.split(",");
      hairColor = hairColorsArray[0].trim();
    }

     if(hairColor == "blond"){
      return '#d9b380'
     }
     else if (hairColor == "brown"){
      return '#b38b67'
     }
     else if (hairColor == "auburn"){
      return '#5e0808'
     }
     else{
      return hairColor
     }
     
  }


  return  'white';
};
const UserCard = ({ user }) => {
  const textColor = getTextColor(user.hair_color == "blond" ? "	#fbe7a1" : user.hair_color);
  const bgcolor = getBgColor(user.hair_color)
  return (
    <Card sx={{ backgroundColor: bgcolor, maxWidth: 200, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" style={{ color: textColor }}>
          {user.name}
        </Typography>
        <img
          src={`https://picsum.photos/200/300?random=${user.name}`}
          alt={user.name}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Typography variant="body2" style={{ color: textColor }}>
          Hair Color: {user.hair_color}
        </Typography>
        <Typography variant="body2" style={{ color: textColor }}>
          Skin Color: {user.skin_color}
        </Typography>
        <Typography variant="body2" style={{ color: textColor }}>
          Gender: {user.gender}
        </Typography>
        <Typography variant="body2" style={{ color: textColor }}>
          Vehicles: {user.vehicles.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://swapi.dev/api/people`);
      setUsers(response.data.results);
      setError(null);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading && <CircularProgress />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {filteredUsers.map((user) => (
          <Grid item key={user.name}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
