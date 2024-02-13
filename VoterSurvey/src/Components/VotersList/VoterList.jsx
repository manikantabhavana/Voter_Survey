import React from 'react'
import './VoterList.css'
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import VotersService from '../../Services/GetVotersService';
import { useSelector,useDispatch } from 'react-redux';
import { addVoterList,selectVoterList } from '../../Store/slice';
import { Spin } from 'antd';
function VoterList() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const Voters=useSelector(selectVoterList)
  const {BoothNo}=useParams()
  //const [Voters,setVoters]=useState([])
  const [TotalVoters,setTotalVoters]=useState([]);
  const [searchTerms,setSearchTerms]=useState(null);
  const [spinning, setSpinning] = useState(false);


  const showLoader = () => {

    setSpinning(true);

    setTimeout(() => {

      setSpinning(false);

    }, 5000);

  };

  const getVotersList=async()=>{
    showLoader()
    try{
      const response=await VotersService.getVoters(BoothNo)
      dispatch(addVoterList(response.results))
    }
    catch(error){
      console.error('error in fetching voter list from Voter Service')
    }
  }
  useEffect(()=>{
    
    if(searchTerms==null){
      setTotalVoters(Voters)
    }
    else{

      const filteredVoters=Voters.filter(voter=>(voter.Voter_Name.toLowerCase().includes(searchTerms.toLowerCase()))
      ||(voter.Voter_Card_No.toLowerCase().includes(searchTerms.toLowerCase()))
      ||(voter.House_No.toLowerCase().includes(searchTerms.toLowerCase())));
      setTotalVoters(filteredVoters)
    }
  },[searchTerms,Voters])
  useEffect(()=>{
    
    getVotersList()
   
    
  },[dispatch])
  


  const goBack=()=>{
    navigate(-1)
  }
  const goToSurvey=(VoterId)=>{
    navigate(`voter-survey/${VoterId}`)
  }
  
 
   
      
     
    
    
  return (
    
    <div className='VoterListMainCont'>
     
     
        <div className='VoterHeaderCont'>
         <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack}/>
         <div>Booth NO : {BoothNo}</div>
        </div>
        <div className='VoterListCont'>
          <div className='VoterListAFS'>
              <div className='AllocatedFinishedCont'>
                          <div className='AllocatedCont'>
                              <div className='AllocatedBooths'>{TotalVoters.length}</div>
                              <div className='AllocatedText'>Total</div>
                          </div>
                          <div className='FinishedCont'>
                              <div className='FinishedBooth'>{TotalVoters.filter((voter)=>voter.Survey==1).length}</div>
                              <div className='AllocatedText'>Surveyed</div>
                          </div>
              </div>
              <div>
                <input type='search' placeholder='Search By Voter Id or Name' className='VoterSearchInput' onChange={(e)=>{setSearchTerms(e.target.value)}}/>
              </div>
            </div>
        
            <div className='VoterList'>
              {TotalVoters.length>=1?
                TotalVoters.map((voter)=>(
                  <div className='VoterCard' onClick={()=>{goToSurvey(voter.Voter_Card_No)}} style={voter.Survey===1?{background: 'linear-gradient(90deg, rgba(255,255,255,1) 96%, rgba(0,255,8,0.978203781512605) 96%)'}:{background:'linear-gradient(90deg, rgba(255,255,255,1) 96%, rgba(0,1,152,0.978203781512605) 96%)'}}>

                    <div className='VoterSnoCont'>
                        <div className='VoterId'><strong>Id : </strong>{voter.Voter_Card_No}</div>
                        <div className='SNO'><strong>S NO : </strong>{voter.Serial_No}</div>
                    </div>
                     
                    
                    <div className='VoterName'><strong>Name : </strong>{voter.Voter_Name}</div>
                    <div className='VoterFName'><strong>{voter.Relation} : </strong>{voter.Relative_Name}</div>
                    <div className='VoterAgeCont'>

                      <div><strong>Age : </strong>{voter.Age}</div>
                      <div><strong>Gender : </strong>{voter.Gender}</div>
                      
                      
                    </div>
                    
                    <div><strong>H NO : </strong>{voter.House_No}</div>
                   
                  </div>
                )): <Spin spinning={spinning} fullscreen/>
                
              }
                

            </div>

        </div>


    </div>
    
  )
}

export default VoterList