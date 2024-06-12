import React, { useEffect, useState } from 'react'
import axios from 'axios'
import noVideo from '../../assets/noVideo.png'

function ShowAllVideo() {
    const [allVideos, setAllVideos] = useState([])

    let jwt = localStorage.getItem("@JWT");

    useEffect(() => {
        ( async () => {
            try {
                const response = await axios.get(`/api/v1/videos/`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                console.log('Response of Get All videos api: ', response.data)
                if(response.data.success === true){
                    setAllVideos(response.data.data)
                }else{
                    setAllVideos([])
                }
            } catch (error) {
                console.log('Get All videos api is not working: ', error)
            }
        })()
    }, [])

  return (
    <div style={{marginLeft: '140px'}} className='mt-4'>
        {
            allVideos.length > 0 ? (
                <></>
            ) : (
                <div style={{width: '100%'}} className='d-flex justify-content-center'>
                    <img src={noVideo} width='40%' height='40%'/>
                </div>
            )
        }
    </div>
  )
}

export default ShowAllVideo