import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios"; //axios kiyana dependancy eka install kre backend eke api's tika frontend eke integrate krnna. meka defalut import ekk nisa {Axios} kila enna one ne.
import { useEffect, useState } from "react";

/*page ekk load weddi trigger wenna nm component did mount life cycle method ek run wenna one.mewa thiyenne normally class components wla
  eth api hadala thiyenne Users kiyla functional componenst ekak.so functional components wlata adala react hook eka useEffect.*/

   //[] meka userEffect hook eke 2nd parameter eka(dependancy array).meke mukuth neththn userEffect eka run wenne component eka load wena welawe witharai

const Users = () => {
      const [users,setUsers] = useState([]); //users kiyla state variable ekk hadanawa eka aya use kranna one nisa.setUser kiynne function eka.
      const [submitted,setSubmitted] = useState(false); //submitted kiyna variable eke function eka setSubmitted. false danne mulin mkuth submit krla nathi nisa.
      const[selectedUser,setSelectedUser]= useState({});
      const [isEdit, setIsEdit] = useState(false);

      useEffect(() => {
        getUser();
      
    },[]);

      const getUser = () =>{ //Users la create krganna hadana function eka getUser kiynne.
            Axios.get('http://localhost:8080/api/v1/getusers') //axio eken get api eka cl krnwa. meken return krnne promise ekk

            .then(response => { //methana response ek kiynne uda thiyena link eken dena data eka
              setUsers(response.data); // ?-optional chaining operator eka.meken krnne ? thiyena object eka thiyenawda kiyla balala next step ekt yana eka.(if ekak wage)error ekk thibunoth eka pennawa
            })
            .catch(error => {
               console.error("Axios Error : ",error);
            });
      
      }
      
      const addUser = (data) => {
          setSubmitted(true); //true eken submit butten ek click kra kiyna eka idea wenawa

          const payload = {
              id : data.id,
              name : data.name,
          }
          Axios.post("http://localhost:8080/api/v1/adduser", payload) //post ek methana parameters 2k illnaaw. url ekai payload ekai.

             .then(() => { //methana response ek kiynne uda thiyena link eken dena data eka
                getUser(); //meka cl kre naththn aya page eka reload krnna wenawa aluth user ekka show wenna page eke
                setSubmitted(false);
                isEdit(false);
          })
          .catch(error => {
             console.error("Axios Error : ",error);
          });
      }

      const updateUser =(data) => {
            setSubmitted(true); //true eken submit butten ek click kra kiyna eka idea wenawa

            const payload = {
              id : data.id,
              name : data.name,
          }

          Axios.put("http://localhost:8080/api/v1/updateuser", payload) //post ek methana parameters 2k illnaaw. url ekai payload ekai.

          .then(() => { //methana response ek kiynne uda thiyena link eken dena data eka
             getUser(); //meka cl kre naththn aya page eka reload krnna wenawa aluth user ekka show wenna page eke
             setSubmitted(false);
             isEdit(false);
       })
       .catch(error => {
          console.error("Axios Error : ",error);
       });
      }

      const deleteUser = (data) => {
        setSubmitted(true);

      Axios.delete(`http://localhost:8080/api/v1/deleteuser/${data.id}`) //post ek methana parameters 2k illnaaw. url ekai payload ekai.

      .then(() => { //methana response ek kiynne uda thiyena link eken dena data eka
         getUser(); //meka cl kre naththn aya page eka reload krnna wenawa aluth user ekka show wenna page eke
         setSubmitted(false);
         isEdit(false);
   })
   .catch(error => {
      console.error("Axios Error : ",error);
   });
      }

    return(
      <Box
        sx={{
          width: 'calc(100% - 100px)',
          margin:'auto',
          marginTop:'100px',
        }}
      >
            <UserForm

              addUser = {addUser}
              updateUser = {updateUser}
              submitted = {submitted}
              data = {selectedUser}
              isEdit = {isEdit}
            />
            <UsersTable
             rows={users}
             selectedUser={data => {
               setSelectedUser(data); //userge data eka gannawa
               setIsEdit(true);  // edit ekk krnna yana nisa true
             }}
             deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
             />
      </Box>
      
    )
}

export default Users;