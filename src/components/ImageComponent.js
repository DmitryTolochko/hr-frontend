import axios from "axios"
import React from 'react';

const ImageComponent = (props) => {
    let [image, setImages] = React.useState(null)
  
    React.useEffect((id) => {
      async function getImage (id) {
        let imageBlob
        try {
          imageBlob = (await axios.get(`http://89.108.103.70/api/file/${id}`, { responseType: 'blob' })).data
        } catch (err) {
          return null
        }
        return URL.createObjectURL(imageBlob)
      }
  
      getImage(props.id).then((result) => {
        setImages(result);
      });
    }, [])
  
    console.log(image)
    if (image === null || props.id === null) {
        return <img className={props.tag} src={require('./images/deafult-avatar.png')} alt='avatar'></img>
    }
    return (<img className={props.tag} src={image} alt='avatar'></img>)
}

export default ImageComponent
