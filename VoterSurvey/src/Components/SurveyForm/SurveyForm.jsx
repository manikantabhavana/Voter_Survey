import React, { useEffect, useState } from 'react';
import './SurveyForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {Select} from 'antd';
import SelectorsService from '../../Services/GetSelectorsService';

function SurveyForm() {
    const navigate=useNavigate()
    const {BoothNo,VoterId}=useParams();
    const [ShowForm,setShowForm]=useState(false);
    const [HouseNo,setHouseNo]=useState('3-112')
    const [MembersCount,setMembersCount]=useState('5');
    const [Castes,setCastes]=useState([]);
    const [Problems,setProblems]=useState([]);
    const [Remarks,setRemarks]=useState([]);


    const [Mobile,setMobile]=useState(null);
    const [Color,setColor]=useState('white');
    const [Location,setLocation]=useState('Local');


    const getSeletors=async()=>{
      try{
        const castes= await SelectorsService.getCatses();
        const problems= await SelectorsService.getProblems();
        const remarks= await SelectorsService.getRemarks();

        const castess=await castes.results
        const problemss=await problems.results
        const remarkss = await remarks.results
        const updatedCasteList =await  castess.map(caste => ({ ...caste, ['label']: caste.Value }));
        const updatedProblemList =await  problemss.map(problem => ({ ...problem, ['label']: problem.Value }));
        const updatedRemarksList =await  remarkss.map(remark => ({ ...remark, ['label']: remark.Value }));
        await setCastes(updatedCasteList)
        await setProblems(updatedProblemList)
        await setRemarks(updatedRemarksList)
        
      }
      catch(error){
        console.error('error in fetching',error)
      }
        
      

    }

    const goBack=()=>{
        navigate(-1)
    }

    useEffect(()=>{
      getSeletors()
    },[])
  return (
    <div className='SurveyFormMainCont'>
         <div className='SurveyHeaderCont'>
            <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack}/>
             <div>Survey : {VoterId}</div>
        </div>

        <div className='SurveyFormCont'>
          <div className='SurveyDetails'>
            <div className='SName'>Manikanta Bhavana</div>
            <div className='SName'>Venkateswara rao Bhavana</div>
            <div className='SAgeGenderCont'>
              <div className='SAge'>Age : 24</div>
              <div className='SAge'>Gender : Male</div>
            </div>
            <div className='SHouseNo'>House No : 3-121</div>

          </div>

          {ShowForm?<div className='SurveyForm'>
            
            <input type='number' placeholder='Mobile Number'  value={Mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
            <Select placeholder={'Select Caste'} options={Castes} className='SelectAntd'/>
            <Select placeholder={'Select Problmes'} options={Problems}  className='SelectAntd'/>
            <Select placeholder={'Select Remark'} options={Remarks}  className='SelectAntd'/>
            <input type='text' placeholder='Nearest Location ' value={Location} onChange={(e)=>{setLocation(e.target.value)}}/>


            <input type='text' placeholder='Nearest Location '/>
            <div className='ColorsCont' style={{backgroundColor:Color}}>
              <div className='RedColor' onClick={()=>{setColor('Red')}}></div>
              <div className='YellowColor' onClick={()=>{setColor('Yellow')}}></div>
              <div className='OrangeColor' onClick={()=>{setColor('Orange')}}></div>
              <div className='GreenColor' onClick={()=>{setColor('Green')}}></div>

            </div>

            <textarea  placeholder='Observations '/>


           
            

          </div>:
          <div className='FamilyMembersCont'>
            
            <div className='FamilyMembHead'>Family Members</div>
            <div className='FamilyMembCont'>In this House No {HouseNo} there is {MembersCount} Members (Possibility).</div>
            <div className='FamilyMembCont'>Confirm with a family member and choose from the following family members carefully.</div>

            <div className='MembersList'>
              
                <label>
                    <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                    <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
                <label>
                <input type='checkbox' className='selectName' />Manikanta
                </label>
              
              



            </div>

          <div>

          

          </div>

           
          </div>
          
          
          
          }
          {ShowForm?<div className='SSubmitBtn'>Submit</div>:<div className='SSubmitBtn' onClick={()=>{setShowForm(true)}}>Confirm</div>}
            








        </div>

    </div>
  )
}

export default SurveyForm;