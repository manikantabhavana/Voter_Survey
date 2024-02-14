import Cookies from "js-cookie";
import apiService from "./api";
const VotersService={
    getVoters:async(BoothNo)=>{
       try{
        const response=await apiService.get(`Voters/?booth=${BoothNo}`,)
        
        return response

       }
       catch(error){
        console.error('error in fetching booths')
       }

    },
    getVoterDetails:async(VoterId)=>{
        try{
         const response=await apiService.get(`get-voter-details/?voter_id=${VoterId}`,)
         return response
 
        }
        catch(error){
         console.error('error in fetching booths')
        }
 
     },
     getMembers:async(HouseNo,BoothNo)=>{
        try{
         
         const response=await apiService.post(`members`,{house:HouseNo,booth:BoothNo})
         return response
 
        }
        catch(error){
         console.error('error in fetching booths')
        }
 
     },
     submitSurvey:async(selectedMembers,surveyData)=>{
     
        try{
         const response=await apiService.post('submit-survey-all',{selectedMembers,surveyData})
         return response
 
        }
        catch(error){
         console.error('error in submitting survey data',error)
        }
 
     }

};


export default VotersService;