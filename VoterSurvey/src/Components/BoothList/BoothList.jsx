import React from 'react'
import './BoothList.css'
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import BoothService from '../../Services/GetBoothsService';
import {useNavigate} from 'react-router-dom'
function BoothList() {
    const navigate=useNavigate()
    const [Booths,setBooths]=useState([])


    const goBack=()=>{
        navigate(-1)
    }
    const getVoters=(BoothNo)=>{
        navigate(`booth-voter-list/${BoothNo}`)
    }
    const getBooths=async()=>{
        try{
            const booths= await BoothService.getBooths()
            setBooths(booths.results)

        }
        catch(error){
            console.error('error in fetching booths from BoothsService')
        }
        
        
    }
    useEffect(()=>{
        getBooths()
    },[])

    return (
    <div className='BoothListMainCont'>
        <div className='BoothHeaderCont' >
         <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack} />
         <div>Booths</div>
        </div>
        <div className='BoothListCont'>
            <div className='AllocatedFinishedCont'>
                        <div className='AllocatedCont'>
                            <div className='AllocatedBooths'>{Booths.length}</div>
                            <div className='AllocatedText'>Allocated</div>
                        </div>
                        <div className='FinishedCont'>
                            <div className='FinishedBooth'>0</div>
                            <div className='AllocatedText'>Completed</div>
                        </div>
            </div>
            <div className='BoothList'>
                <div className='BoothsListGrid'>
                    {
                        Booths.map((booth)=>(
                            <div className='BoothCont' key={booth.Part_No} onClick={()=>{getVoters(booth.Part_No)}}>
                                <div className='BoothNo' key={booth.Part_No}>{booth.Part_No}</div>
                                <div className='WardNo' key={booth.Part_No}>Ward : 1</div>  
                            </div>

                        ))
                    }
                  

                </div>
                

            </div>

        </div>


    </div>
  )
}

export default BoothList