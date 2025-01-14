import React from 'react'
type countType = {
  name: string;
  count: number;
};
function TypeRoomAvailable({countTypeData, countType}:{countTypeData:countType[], countType:number}) {
  return (
    <section className=" relative flex bg-white rounded-xl w-full h-auto py-9 px-12 flex-col gap-4  border-border border-[2px]   ">
        <p className='text-lg'>Cuartos disponibles: {countType}</p>
        <div className=" overflow-x-auto w-full ">
          <table className="w-[800px] md:w-full table-fixed">
            <thead >
              <tr>
                <th className=" py-3 w-1/4">Tipo</th>
                <th className=" py-3 w-1/4">Disponible</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {countTypeData &&
                countTypeData.map((data, index) => (
                  <tr key={index} className='border-y-[1px] border-secondary '>
                    <td className="py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                      {data.name}
                    </td>
                    <td className=" py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                      {data.count}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
  )
}

export default TypeRoomAvailable