
function Navbar() {

  return (
    <>
      <nav className="fixed top-0 w-[100vw] z-[5]">
        <div className="h-[3vmin] bg-white"></div>
        <div className="h-[8vh] bg-[#F3F3F3] flex items-center justify-between p-[2vmin] pl-[5vmin] pr-[5vmin]">
          <div className="flex gap-[2vmin]">
            <div className="w-[5vmin] h-[5vmin] bg-[url('./images/healtheaselogo.png')"></div>
            <a href="">
              <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">HeathEase</div>
            </a>
          </div>
          <div className="flex gap-[3vmin] text-[2vmin]">
            <a href="#" className="">HOME</a>
            <a href="#" className="">ABOUT</a>
            <a href="#" className="">SERVICES</a>
            <a href="#" className="">ARTICLES</a>
            <a href="#" className="">MEDICINES</a>
            <a href="#" className="">CONTACT US</a>
          </div>
          <div className="flex gap-[1vmin]">
            <a href="">
              <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">Language</div>
            </a>
            <a href="">
              <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">Join Us</div>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
