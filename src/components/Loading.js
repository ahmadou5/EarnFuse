'use client'
export const Loading = () => {
    return(
    <div className="inset-0 fixed bg-black/60 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] h-[auto] flex flex-col items-center justify-center">
           <div className="w-auto h-auto mt-1">
            <img src='./assets/show.png' className="w-[250px] h-[250px]" />
           </div>
           <div class="loader"></div> 
        </div>
    </div>
    )
}