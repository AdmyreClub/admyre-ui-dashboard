const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      <div className="flex-col w-40% items-start ml-10 h-full self-start mr-10 mt-10 ">
        <div className="flex ">
          <img
            src="https://freelancelogodesign.com/oss/attachments/2022/06/02/75346924511/029fcc4d8046508b3c259c569e48b886.png"
            alt=""
            width={100}
          />
          <h1 className="self-center font-[30px]" style={{fontSize:"20px"}}>Admyre</h1>
        </div>
        {children}
      </div>
      <div className="w-[80%] bg-black h-[100vh] mr-0 justify-center flex align-middle"></div>
    </div>
  );
};

export default AuthLayout;
