import './index.css'
const Nav=(props)=>{
    const {LogOut}=props
    const onClickLogout=()=>{
        LogOut();
    }
    console.log('nav')
    return(
        <div className="nav-container">
            <button className='home_btn'>Home</button>
            <button
          type="button"
          className="logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        </div>
    )
}
export default Nav