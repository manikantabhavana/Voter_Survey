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

    }

};

export default VotersService;