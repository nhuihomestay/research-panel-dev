export const Summary = () => {
  return (
    <>
      <div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Selected
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Index
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Activity Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Descrition
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Time
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                Kcal
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                KG
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {dateRange.map((date, index) => (
              <tr key={index}>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedDates[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="px-4 py-4 ml-5"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {index}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {date}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {type}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {name}
                </td>
                <td className="bg-gray-900 px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {descrition}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {time}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  {kcal}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                  Null
                </td>
              </tr>
            ))}
            <tr className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
              <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
              <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
              <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
              <td className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></td>
              <td className="px-4 py-3.5 text-sm font-bold text-center rtl:text-left text-gray-500 dark:text-gray-100">
                TOTAL
              </td>
              <td className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-100">
                {time * numberOfDays}
              </td>
              <td className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-100">
                {totalkcal}
              </td>
              <td className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-100">
                Null
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
