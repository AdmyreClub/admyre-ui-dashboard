const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      <div className="flex-col  items-start ml-10 h-full self-start mr-10 mt-10 ">
        <div className="flex justify-center h-[50px]">
          <div className="flex  justify-center mr-6">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 150 160"
              width={"45px"}
              className="mt-[-16px] "
            >
              <defs>
                <style></style>
              </defs>
              <ellipse
                className="cls-1"
                cx="79.67"
                cy="118.87"
                rx="16.97"
                ry="16.56"
              />
              <path
                className="cls-1"
                d="M106,41.1c5.42,4.53,8.61,10.24,12.4,15.93,10.82,16.55,21.49,33.3,31.4,50.35a19.75,19.75,0,0,1-7.22,27c-10.72,6.38-25.1.75-28.73-11.14-5.9-18.82-11.07-38-16-57.14-1.64-6.63-3.7-12.84-3.4-19.9A7.06,7.06,0,0,1,106,41.1Z"
              />
            </svg>

            <div className="flex flex-col">
              <span className="font-mont text-[30px] font-[900] text-black ml-3">
                Admyre
              </span>
              <span className="font-mont text-[12px] font-[600] text-black ml-[105px] mt-[-14px]">
                .club
              </span>
              <span className="font-mont text-[8px] font-[600] text-slate-100 bg-purple-800 px-[5px] py-[1px] rounded-sm ml-[130px] mt-[-50px]">
                BETA
              </span>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="w-[80%] bg-black h-[100vh] mr-0 justify-center flex align-middle"></div>
    </div>
  );
};

export default AuthLayout;
