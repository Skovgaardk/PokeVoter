export default function PokemonViewSkeleton(){
    return(
        <div className="w-[345px] h-[450px] flex flex-col rounded-3xl justify-evenly items-center bg-gradient-to-br from-pokemon-red to-pokemon-blue animate-pulse">
        <div className="w-[315px] flex flex-col justify-evenly items-center bg-[#222831] p-5 rounded-2xl">
          <div className="w-[256px] h-[256px] bg-gray-600 rounded-full mb-4"></div>
          <div className="w-[300px] h-8 bg-gray-600 rounded mb-4"></div>
          <div className="w-full rounded-3xl p-2">
            <div className="flex items-center justify-center bg-[#222831] rounded-2xl">
              <div className="w-[100px] h-12 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
}