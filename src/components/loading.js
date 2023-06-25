const Loading = () => {
  return <>
    <div style={{ height: '100%' }} className='d-flex align-items-center justify-content-center h-100'>
      <div className='spinner-border' style={{ width: '3rem', height: '3rem' }} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  </>
}

export default Loading;