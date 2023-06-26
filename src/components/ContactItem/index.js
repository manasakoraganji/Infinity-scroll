import './index.css'
const ContactItem=props=>{
    const {ContactItem}=props
    const {name,picture,id}=ContactItem
    return(
        <li className='list-item'>
            <div>
                <h1 className='name'>{name}</h1>
            </div>
            <div>
                <img alt={id} src={picture} className='img'/>
            </div>
        </li>
    )
}
export default ContactItem