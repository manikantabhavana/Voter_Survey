import React from 'react'
import './Mainpage.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

function Mainpage() {
    const navigate=useNavigate()
    const goToPage=(page)=>{
        navigate(`${page}`)

    }
  return (
    <div className='MainPageMainCont'>
        <div className='HeaderBarCont'>

            <div className='ProfileCont'>
                <Icon icon="iconamoon:profile-thin" className='ProfileIcon'/>
                <div className='AddressMainCont'>
                    <div className='NameCont'>
                        <div className='Name'>Manikanta</div>
                        <Icon icon="eva:arrow-down-fill"  />
                    </div>
                    <div>
                        <div className='Address'>Main Road</div>
                    </div>
                </div>

            </div>
            <div className='HeadIcons'>
                <Icon icon="mingcute:notification-line"  className='BellIcon' />
                <Icon icon="ant-design:logout-outlined"  className='LogoutIcon' />
                <Icon icon="ph:question-light"  className='QueryIcon' />
            </div>


        </div>
        <div className='menuCont'>
            <div className='ConstituencyDetailsCont'>
                <div className='Assembly'>Mummidivaram</div>
                <Icon icon="material-symbols-light:keyboard-arrow-right" className='Icon'/>
                
                

            </div>

            <div className='AllocatedFinishedCont'>
                    <div className='AllocatedCont'>
                         <div className='AllocatedBooths'>20</div>
                        <div className='AllocatedText'>Allocated</div>
                    </div>
                    <div className='FinishedCont'>
                         <div className='FinishedBooth'>10</div>
                        <div className='AllocatedText'>Completed</div>
                    </div>
                </div>

                <div className='menuItemsCont'>
                    <div className='SurveyTitle'>Survey</div>
                    <div className='menuItemsContt'>
                
                    <div className='OptionCont' onClick={()=>{goToPage('booth-list')}}>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Booths</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Wards</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="fluent-mdl2:b-i-dashboard" className='OptionContIcon' />
                        <div>Villages</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Mandals</div>
                    </div>
                    </div>


                    


                </div>
                <div className='ConstituencyDetailsCont'>
                <div className='Assembly'>Find A Voter</div>
                <Icon icon="material-symbols-light:keyboard-arrow-right" className='Icon'/>
                    </div>
                <div className='menuItemsCont'>
                    <div className='SurveyTitle'>Others</div>
                    <div className='menuItemsConttt'>
                
                    <div className='OptionCont'>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Mobile</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Family</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="fluent-mdl2:b-i-dashboard" className='OptionContIcon' />
                        <div>House No</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    </div>


                    


                </div>
            

        </div>
        <div className='navBarCont'>
            <div className='OptionCont'>
                <Icon icon="charm:home"    className='OptionContIcon'/>
                <div>Home</div>
            </div>
            <div className='OptionCont'>
                <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                <div>Booths</div>
            </div>
            <div className='OptionCont'>
                <Icon icon="fluent-mdl2:b-i-dashboard" className='OptionContIcon' />
                <div>Status</div>
            </div>
            <div className='OptionCont'>
                <Icon icon="tabler:location" className='OptionContIcon'  />
                <div>Location</div>
            </div>
            
            
        </div>

    </div>
  )
}

export default Mainpage