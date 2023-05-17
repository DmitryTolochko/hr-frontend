const PeoplecardwithPhoto = () => {
    return (
        <div className='photo_card_div'>
                        <img className='img_CV' src={require('./images/deafult-avatar.png')} alt='avatar'></img>
                        <h2 className='photo_div_h2'>
                            Контакты
                        </h2>
                        <h3 className='CVPan_h3'>Почта</h3>
                        <p className='fio_CVpan2'><a href=''>jbhjewvjfewh@mail.ru</a></p>
                        <h3 className='CVPan_h3'>Телефон</h3>
                        <p className='fio_CVpan2'><a href=''>8954905000</a></p>
                        <h3 className='CVPan_h3'>Ссылки</h3>
        </div>
    );
};
        
export default PeoplecardwithPhoto;   