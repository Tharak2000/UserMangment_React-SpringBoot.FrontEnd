import { Grid, Input, Typography, containerClasses, withTheme } from "@mui/material";
import { useEffect, useState } from "react";
import './App.css';

const UserForm = ({addUser,updateUser,submitted,data,isEdit}) =>{

  const[id,setId] = useState(0);
  const[name,setName] = useState(''); 

  useEffect(() => { // submit wela nathinm yata widiyta data tika reset krla denna one.submit(false) unama.
        if(!submitted) {
          setId(0);
          setName('');
        }
  },[submitted]);//[submitted] kiynne dependancy value eka.submitted value eka change unoth iwthrak meka krla denna wage idea ekak.
//uda eka wada krnne submitted eka false unamahama.(ex-addUser function eka athule anthimata submitted eka false wenawa)

  useEffect(() => { //useEffect kiyna hook ek ganne component did update kiyana lifecsycle method eka pennanna
    if (data?.id && data.id !==0 ){ //data? eken data eka thieda balanawa
      setId(data.id);
      setName(data.name);
    }

  },[data]); //me prop eka run wenna one data eka change wena welawedi
 return(
<>
 
  
<Grid
      container
      spacing={2}   
      sx={{
        backgroundColor: '#ffffff',
        marginLeft : '40px',
        marginBottom : '30px',
        display : 'block',
      }}
    >
    <Grid item xs={12}>
          <Typography component={'h1'} sx={{color:'#000000'}}>User Form</Typography>
    </Grid>

      <Grid item xs={12} sm={6} sx={{display:'flex'}}>
        <Typography component={'label'}
         htmlFor="id"
         sx={{
            color : '#0000000',
            marginRight : '20px',
            fontSize : '16px',
            width : '100px',
            display : 'block',
         }}
         >
          ID
          </Typography>
       
          <Input
            type="number"
            id='id'
            name="id"
            sx={{
              width : '400px' }}
            value = {id}
            onChange={ e => setId(e.target.value)}         
          />
      </Grid>

      <Grid item xs={12} sm={6} sx={{display:'flex'}}>
        <Typography component={'label'}
         htmlFor="id"
         sx={{
            color : '#0000000',
            marginRight : '20px',
            fontSize : '16px',
            width : '100px',
            display : 'block',
         }}
         >
          Name
          </Typography>
          
          <Input
            type="text"
            id='name'
            name="name"
            sx={{
              width : '400px' }}
            value = {name}
            onChange={ e => setName(e.target.value)}         
          />
      </Grid>

                <button
                sx={{
                  margin : 'auto',
                  marginBottom : '20px',
                  backgroundColor :'##00c6e6',
                  color : '#000000',
                  marginLeft : '15px',
                  marginTop : '20px',
                  '&:hover':{
                    opacity : '0.7',
                    backgroundColor : '#00c6e6',
                  }
                }}
                onClick={() => isEdit? updateUser({ id, name}) : addUser({ id, name})}//id=id,name=name meke key=value nisa deparak mention krnna one nee
                //isEdit nam updateUser nathinm addUser
                >
                  {
                    isEdit ? 'Update' : 'Add' //is edit eka ekko update nathinm add
                  }
                  

                </button>
</Grid>
</>
 )
  
}

export default UserForm;