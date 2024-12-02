import { SignOut } from "@/components/auth/sign-out";

export default function Sidenav() {
  return (
    <aside className="fixed w-60 bg-[#1c212c] min-h-full h-screen flex flex-col items-center pt-5 pb-2 space-y-7">
      <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
        <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
          Menu
        </div>
        <a href="/game/">
          <div className="w-full flex items-center gap-x-1.5 group select-none">
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
            </div>

            <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
              <svg fill="none" viewBox="0 0 24 24" height="1.5em" width="1.5em">
                <path
                  fill="currentColor"
                  d="M15.47 11.293a1 1 0 10-1.415 1.414 1 1 0 001.415-1.414zM16.177 9.172a1 1 0 111.414 1.414 1 1 0 01-1.414-1.414zM19.712 11.293a1 1 0 10-1.414 1.414 1 1 0 001.414-1.414zM16.177 13.414a1 1 0 111.414 1.415 1 1 0 01-1.414-1.415zM6 13H4v-2h2V9h2v2h2v2H8v2H6v-2z"
                />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7 5a7 7 0 000 14h10a7 7 0 100-14H7zm10 2H7a5 5 0 000 10h10a5 5 0 000-10z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="font-QuicksandMedium">Game</span>
            </div>
          </div>
        </a>

        <a href="/stats">
          <div className="w-full flex items-center gap-x-1.5 group select-none">
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
            </div>
            <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
              >
                <path
                  fill="currentColor"
                  d="M0 13h16v2H0zm2-4h2v3H2zm3-4h2v7H5zm3 3h2v4H8zm3-6h2v10h-2z"
                />
              </svg>

              <span className="font-QuicksandMedium">Stats</span>
            </div>
          </div>
        </a>

        <div className="w-full flex items-center gap-x-1.5 group select-none">
          <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
          </div>
          <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
            <svg
              className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C19.995 7.58378 16.4162 4.00496 12 4ZM17 13H11V7H13V11H17V13Z"></path>
            </svg>

            <span className="font-QuicksandMedium">More to be added</span>
          </div>
        </div>
      </div>

      <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
        <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
          Profile
        </div>

        <div className="w-full flex items-center gap-x-1.5 group select-none">
          <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
          </div>
          <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
            <SignOut/>
          </div>
        </div>
      </div>
    </aside>
  );
}