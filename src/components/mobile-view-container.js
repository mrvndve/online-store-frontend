const MobileViewContainer = ({ children }) => {
  return <>
    <div className='d-lg-none h-100'>
      {children}
    </div>
  </>
}

export default MobileViewContainer;