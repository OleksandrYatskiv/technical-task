import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ContactInfo: React.FC = () => {
  const myName = 'Oleksandr Yatskiv';

  return (
    <Card style={{ marginTop: '20px' }}>
      <CardContent>
        <Typography sx={{textAlign:'center'}} variant="h6" component="div">
          Contact Me
        </Typography>
        <CardMedia
          component="img"
          alt="Funny Gif"
          height="200"
          style={{ width: '200px', margin:'0 auto' }}
          image="https://camo.githubusercontent.com/cae12fddd9d6982901d82580bdf321d81fb299141098ca1c2d4891870827bf17/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313336302f302a37513379765349765f7430696f4a2d5a2e676966"
          title="Funny Gif"
        />
        <Typography variant="body2" color="text.secondary">
          Hi, I'm {myName}! Feel free to connect with me on:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="https://github.com/OleksandrYatskiv"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '10px' }}
        >
          GitHub
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="https://linkedin.com/in/oleksandr-yatskiv-605b02284"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '10px', marginLeft: '10px' }}
        >
          LinkedIn
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
