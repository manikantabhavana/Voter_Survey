import React, { useEffect } from 'react'
import './FindVoter.css'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space ,Empty,Spin,Badge} from 'antd';
const { Option } = Select;
import { Icon } from '@iconify/react'
import { useState } from 'react'
import {toast,ToastContainer} from 'react-toastify'

import { useNavigate, useParams } from 'react-router-dom';

function FindVoter() {
  const { Search } = Input
    const params=useParams()
    const navigate=useNavigate()
   
    const [details,setDetails]=useState([])
    const [Mandals,setMandals]=useState([])
    const [Villages,setVillages]=useState([])
    const [Wards,setWards]=useState([])
    const [Booths,setBooths]=useState([])
    const [Areas,setAreas]=useState([]) 
    const [Filters,setFilters]=useState({	Constituency:'38 - KAKINADA RUARL (GEN)'})

    const [Mandal,setMandal]=useState(null)
    const [Village,setVillage]=useState(null)
    const [Ward,setWard]=useState(null)
    const [Booth,setBooth]=useState(null)
    const [Area,setArea]=useState(null) 


    const [VoterList,setVoterList]=useState([])
    const [isloading,setIsloading]=useState(true);
    const [SearchTerms,setSearchTerms]=useState(null)
    
    
  const getConstituencyDetails=async()=>{
    try{
        const response = await fetch('https://api.stepnext.com/constituency-details')
        if(response.ok){

        
        const data=await response.json()
        setDetails(data)
       
       
        const uniqueMandals = ['None',Mandal,...new Set(data.map(obj => obj.Mandal))];
        const convertedListMandals = uniqueMandals.map(mandal => ({
            value: mandal,
            label: mandal,
          }))
        setMandals(convertedListMandals)
        
        }

    }
    catch(error){
        console.error(error,'error in fetch')
    }

  }
  const getVillages=async()=>{
    try{
      let currentData=details
      if(Mandal!=null){
     
         currentData=details.filter((dat)=>dat.Mandal===Mandal)
      }
       
        const uniqueVillages = ['None',Village,...new Set(currentData.map(obj => obj.Village))];
       
        const convertedListVillages = uniqueVillages.map(village => ({
            value: village,
            label: village,
          }))
          
          setVillages(convertedListVillages)

    }
    catch(error){
        console.error(error,'error in get village')
    }

  }
  const getWards=async()=>{
    try{
     let currentData=details
     if(Village!=null){
       currentData=details.filter((dat)=>dat.Village===Village)
     }
       
        const uniqueWards = ['None',Ward,...new Set(currentData.map(obj => obj.Wards))];

       
   
        const convertedListWards = uniqueWards.map(ward => ({
            value: ward,
            label: ward,
          }))
          
          setWards(convertedListWards)

    }
    catch(error){
        console.error(error,'error in get Wards')
    }

  }
  const getBooths=async()=>{
    try{
      let currentData=details
      if( Ward!=null){
        currentData=details.filter((dat)=>dat.Wards===Ward)
      }
     
      
       
        const uniqueBooths = ['None',Booth,...new Set(currentData.map(obj => obj.Booth))];
      
        const convertedListBooths = uniqueBooths.map(booth => ({
            value: booth,
            label: booth,
          }))
          
          setBooths(convertedListBooths)

    }
    catch(error){
        console.error(error,'error in get Booths')
    }

  }
  const getAreas=async()=>{
    try{
      let currentData=details

        if(Booth!=null){
     
          currentData=details.filter((dat)=>dat.Booth===Booth)
        }
       
        const uniqueAreas = ['None',Area,...new Set(currentData.map(obj => obj.Area))];

      
        const convertedListAreas = uniqueAreas.map(area => ({
            value: area,
            label: area,
          }))
          
          setAreas(convertedListAreas)

    }
    catch(error){
        console.error(error,'error in get village')
    }

  }
  useEffect(()=>{
    getWards()
    getAreas()
    getBooths()
    getVillages()
   
  },[details])
  useEffect(()=>{
    getVillages()
  },[Mandal])

  useEffect(()=>{
    getWards()
  },[Village])

  useEffect(()=>{
    getBooths()
  },[Ward])

  useEffect(()=>{
    getAreas()
  },[Booth])

  useEffect(()=>{
    getAreas()
  },[details])


  


  const handleMandal=async(value)=>{
    setMandal(value)
   
   
    

  }
  const handleVillage=async(value)=>{
    setVillage(value)
    
   
    

  }
  const handleWards=async(value)=>{
    setWard(value)
  
    

  }
  const hadleBooths=async(value)=>{
    setBooth(value)
    
   
    

  }
  const handleAreas=async(value)=>{
    setArea(value)
   
   
    

  }

  useEffect(()=>{
    getConstituencyDetails()
 
  },[])
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onCancel = () => {
    setFilters({	Constituency:'38 - KAKINADA RUARL (GEN)'})
    setBooth(null)
    setArea(null)
    setMandal(null)
    setWard(null)
    setVillage(null)

    setOpen(false);
    
  };

  const goBack=()=>{
    navigate(-1)
  }


  const applyFilters=async()=>{
    console.log(Booth,Area,Ward,Village,Mandal,'hello')
    try{
      if(Area!=null){
        setFilters({Area:Area})
      }
      else if(Booth != null){
        setFilters({Booth:Booth})
      }
      else if(Ward!=null ){
        setFilters({Wards:Ward})

      }
      else if(Village!=null){
        setFilters({Village:Village})
      }
      else if(Mandal!=null ){
        setFilters({Mandal:Mandal})
      }
     
      console.log(Filters,'filt')


    }
    catch(error){
      console.error(error,'error in applying filters')
    }
  }
  useEffect(()=>{
    applyFilters()

  },[Booth,Area,Ward,Mandal,Village])
  const getVoters=async(value, _e, info)=>{

    
    try{
      await applyFilters()
      setIsloading(true)


      if(value!=''){
        
        
        const column= Object.keys(Filters)[0];
        const field=Filters[column]
       

        
        const response = await fetch(`https://api.stepnext.com/find-voters/${value}/${column}/${field}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({Filters:Filters,SearchTerms:value})
        })
        if(response.ok){
          const data= await response.json()
          console.log(data.length,'count',data)


         
          setVoterList(data.voterlist)
        
          setIsloading(false)
        }
        else{
          setVoterList([])
          setIsloading(false)
        }
    }
    else{
      toast.error('please enter valid name,id,Hno')

    }
      
    }
    catch(error){
      console.error(
        error,'error in getting voters'
      )
    }
  }





  return (
    <div className='FindVoterMainCont'>
      <ToastContainer/>
        <div className='HeaderFindVoterCont'>
             <Icon icon="gravity-ui:arrow-left" className='HeaderFindVoterIcon' onClick={goBack}/>
            <div className='HeaderFindVoterCont'>
                Find Voter
            </div>
            <div onClick={showDrawer}>Filters</div>


        </div>
        <Drawer
        title="Filters"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onCancel}>Clear</Button>
            <Button onClick={onClose} type="primary">
              Apply
            </Button>
          </Space>
        }
      >
        <Select className='select' placeholder={'Select mandal'} options={Mandals} onChange={handleMandal} value={Mandal}/>
        <Select className='select' placeholder={'Select village'} options={Villages} onChange={handleVillage} value={Village}/>
        <Select className='select' placeholder={'Select Ward'} options={Wards} onChange={handleWards}  value={Ward}/>
        <Select className='select' placeholder={'Select Booth'} options={Booths} onChange={hadleBooths} value={Booth}/>
        <Select className='select' placeholder={'Select Area'} options={Areas} onChange={handleAreas} value={Area}/>
       


      </Drawer>

      <div className='VoterListSearch'>
          <Search
          className='Search'
          placeholder="Search By Name,hno,Id"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={getVoters}
        
        />
       
       
        <div className='VoterListMainContt'>
        {VoterList.length>=1?isloading?<Spin tip="Loading Voters" size='large'></Spin>:

<div className='VoterList1'>
  {

  VoterList.map((voter)=>(

   <div className='VoterCard'  onClick={()=>{goToSurvey(voter.Epic,voter.Surveyer)}} style={voter.Survey==="1"?{background: 'linear-gradient(90deg, rgba(255,255,255,1) 94%, rgba(0,255,8,0.978203781512605) 94%)'}:{background:'linear-gradient(90deg, rgba(255,255,255,1) 96%, rgba(0,1,152,0.978203781512605) 96%)'}}>

      <div className='VoterSnoCont'>
          <div className='VoterId'><strong>Id : </strong>{voter.Epic}</div>
          <div className='SNO'><strong>S NO : </strong>{voter.Voter_S_no}</div>
      </div>
     
       
      
      <div className='VoterName'><strong>Name : </strong>{voter.Name}</div>
      <div className='VoterFName'><strong>Relative : </strong>{voter.Father_Name}</div>
      <div className='VoterAgeCont'>

        <div><strong>Age : </strong>{voter.Age}</div>
        <div><strong>Gender : </strong>{voter.Gender}</div>
        
        
      </div>
      
      <div><strong>H NO : </strong>{voter.House_Number}</div>
      <div className='surveyer'>{voter.Surveyer}</div>
     
    </div>
  ))
}

  

</div>
        
        : <Empty/>
        
        }





          
          
         

          

        </div>
        
         


         


      </div>
        
    </div>
  )
}

export default FindVoter