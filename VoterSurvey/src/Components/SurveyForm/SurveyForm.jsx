import React, { useEffect, useState } from 'react';
import './SurveyForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react';
import {Select,Input} from 'antd';
import SelectorsService from '../../Services/GetSelectorsService';
import VotersService from '../../Services/GetVotersService';
import { useDispatch,useSelector } from 'react-redux';
import { addSelectedMember, removeSelectedMember,selectSelectedMembers,resetSelectedMembers } from '../../Store/slice'
import Cookies from 'js-cookie';

const { TextArea } = Input;

function SurveyForm() {
    const currentDate=new Date()
    
    const navigate=useNavigate()
    const dispatch = useDispatch();

    const [No,setNo]=useState(0)
    const {BoothNo,WardNo,VoterId}=useParams();
    useEffect(()=>{
      if(BoothNo!=undefined){
        setNo(BoothNo)
      }
      else{
        setNo(WardNo)
      }
  


    },[])
    

  


    const [ShowForm,setShowForm]=useState(false);
    const surveyer=Cookies.get('Surveyer')
   
    
    const [MembersCount,setMembersCount]=useState('5');
    const [Castes,setCastes]=useState([]);
    const [Problems,setProblems]=useState([]);
    const [Remarks,setRemarks]=useState([]);

    const [Members,setMembers]=useState([]);
    //const [selectedMembers,setselectedMembers]=useState([]);
    const selectedMembers = useSelector(selectSelectedMembers);


    const [Mobile,setMobile]=useState(null);
    const [Color,setColor]=useState('white');
    const [Caste,setCaste]=useState(null);
    const [Location,setLocation]=useState(null);
    const [Name,setName]=useState(null)
    const [RName,setRName]=useState(null)
    const [HouseNo,setHouseNo]=useState(null)
    const [Problem,setProblem]=useState(null)
    const [Remark,setRemark]=useState(null)
    const [Age,setAge]=useState(null)
    const [Gender,setGender]=useState(null);
    const [Relation,setRealtion]=useState(null);
    const [Observation,setObservation]=useState(null);
    const [Availability,setAvailability]=useState('Local')

    const getSeletors=async()=>{
      try{
        const castes= await SelectorsService.getCatses();
        const problems= await SelectorsService.getProblems();
        const remarks= await SelectorsService.getRemarks();

        const castess=await castes.results
        const problemss=await problems.results
        const remarkss = await remarks.results
        const updatedCasteList =await  castess.map(caste => ({ ...caste, ['label']: caste.Value, ['value']: caste.Value }));
        const updatedProblemList =await  problemss.map(problem => ({ ...problem, ['label']: problem.Value ,['value']: problem.Value }));
        const updatedRemarksList =await  remarkss.map(remark => ({ ...remark, ['label']: remark.Value,['value']: remark.Value }));
        await setCastes(updatedCasteList)
        await setProblems(updatedProblemList)
        await setRemarks(updatedRemarksList)
        
      }
      catch(error){
        console.error('error in fetching',error)
      }
        
      

    }
    const getVoterDetails=async()=>{
      try{
        const response=await VotersService.getVoterDetails(VoterId)
       
        setName(response.results[0].Name)
        setHouseNo(response.results[0].House_Number)
        
        setAge(response.results[0].Age)
        setGender(response.results[0].Gender)
        setRName(response.results[0].Father_Name)
        if(response.results[0].Survey==="1"){
          setCaste(response.results[0].Caste)
          setColor(response.results[0].Color)
          setAvailability(response.results[0].Availability)
          setObservation(response.results[0].Observation)
          setMobile(response.results[0].Mobile)
          setLocation(response.results[0].Location)
          setProblem(response.results[0].Problems)
          setRemark(response.results[0].Remarks)
        }
        setRealtion('Relative')
        getMembers();

      }
      catch(error){
        console.error(error,'error in fetching')
      }

    }

    const getMembers=async()=>{
      try{

        const members=await VotersService.getMembers(HouseNo,No)
        const memberss=await members.results
       
        setMembers(memberss)
        console.log(members,'kkk')
        setMembersCount(memberss.length)
        
        
      }
      catch(error){
        console.error('error in fetching',error)
      }
      
      

    }

    const goBack=()=>{
        navigate(-1)
        dispatch(resetSelectedMembers());
    }
    const clearSelectors=()=>{
      dispatch(resetSelectedMembers());
    }
    useEffect(()=>{
      getVoterDetails();
      
      getSeletors();  
      
    },[HouseNo])
    

    const handleSelectedMembers = (event, member) => {
      const { checked } = event.target;
      const memberName = member.Epic;
  
      if (checked) {
        dispatch(addSelectedMember(memberName));
      } else {
        dispatch(removeSelectedMember(memberName));
      }
    };

    const submitSurvey=async()=>{
      const surveyData={Mobile:Mobile,Caste:Caste,Color:Color,Problems:Problem,Remarks:Remark,Survey:1,Observation:Observation,Availability:Availability,Location:Location,Surveyer:surveyer,Surveyed_on:currentDate.toLocaleString()}
      //const surveyData={Mobile_Number:Mobile}
      try{
        const response=await VotersService.submitSurvey(selectedMembers,surveyData);
       

        if(response.success==true){
           toast.success('Submitted Survey Successfully');
           setTimeout(()=>{
            goBack()
           },2000)
        
      
          
        }
        else{
          toast.error('error in submitting')
        }

       

      }
      catch(error){
        console.error('error in submitting Survey',error)
      }
    }


   
  return (
    <div className='SurveyFormMainCont'>
      <ToastContainer/>
         <div className='SurveyHeaderCont'>
            <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack}/>
             <div>Survey : {VoterId}</div>
        </div>

        <div className='SurveyFormCont'>
          <div className='SurveyDetails'>
            <div className='SName'><span>Name : </span>{Name}</div>
            <div className='SName'><span>{Relation} : </span> {RName}</div>
            <div className='SAgeGenderCont'>
              <div className='SAge'><span>Age : </span>{Age}</div>
              <div className='SAge'><span>Gender : </span>{Gender}</div>
            </div>
            <div className='SHouseNo'><span>House No : </span> {HouseNo}</div>
            <div><span>Family Members : </span>{selectedMembers.length}</div>

          </div>

          {ShowForm?<div className='SurveyForm'>
          
           
            
            
            <input type='text' placeholder='Mobile Number'  value={Mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
            <Select placeholder={'Select Caste'} 
            showSearch
            options={Castes} 
            value={Caste}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            onSelect={(value,option)=>{ setCaste(value)}} 
            className='SelectAntd'/>

            <Select placeholder={'Select Problem'}
             options={Problems}
            className='SelectAntd'
            value={Problem}
            onSelect={(value,option)=>{ setProblem(value)}}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            />



            <Select placeholder={'Select Remark'}
             options={Remarks}
             value={Remark}
             onSelect={(value,option)=>{ setRemark(value)}}
              className='SelectAntd'
              optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }/>
            <input type='text' placeholder='Avialbility ' value={Availability} onChange={(e)=>{setAvailability(e.target.value)}}/>
            <input type='text' placeholder='Nearest Location ' value={Location} onChange={(e)=>{setLocation(e.target.value)}}/>


           
            <div className='ColorsCont' style={{background:Color}}>
              <div className='RedColor' onClick={()=>{setColor('Red')}}></div>
              <div className='YellowColor' onClick={()=>{setColor('Yellow')}}></div>
              <div className='OrangeColor' onClick={()=>{setColor('Blue')}}></div>
              <div className='GreenColor' onClick={()=>{setColor('linear-gradient(to right,green,red,blue,yellow)')}}></div>

            </div>

           <input type='text' value={Observation} onChange={(e)=>{setObservation(e.target.value)}} placeholder='Observations'/>

          </div>:
          <div className='FamilyMembersCont'>
          
            <div className='FamilyMembCont'>In this House No <strong style={{color:'red'}}>{HouseNo}</strong> there is <strong style={{color:'red'}}>{MembersCount}</strong> Members (Possibility).</div>
            {/* <div className='FamilyMembCont'>Confirm with a family member and choose from the following family members carefully.</div> */}
          
            <div onClick={clearSelectors} style={{color:'red',fontWeight:'bold'}}>reset</div>
            <div className='MembersList'>
              {Members!=null&&Members.map((member)=>(
              
                <label>
                    <input type='checkbox'
                     className='selectName'
                     onChange={(event) => handleSelectedMembers(event, member)}

                     checked=  {selectedMembers.includes(member.Epic)}
                     
                    />{member.Name}
                </label>

              ))
              }
              
              



            </div>
            

          <div>

          

          </div>

           
          </div>
          
          
          
          }
          {ShowForm?<div className='SSubmitBtn'  onClick={submitSurvey}>Submit</div>:<div className='SSubmitBtn' onClick={()=>{setShowForm(true)}}>Confirm</div>}
            








        </div>

    </div>
  )
}

export default SurveyForm;