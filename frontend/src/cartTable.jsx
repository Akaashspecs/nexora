import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

function MySimpleTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="bg-red-600" key={headerGroup?.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="bg-red-300 text-start px-1  md:px-3 py-2 text-sm  md:text-base font-semibold 
                             whitespace-nowrap truncate overflow-hidden"
                title={flexRender(
                  header.column?.columnDef?.header,
                  header.getContext()
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header?.column.columnDef?.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="md:px-3 px-1 py-2 text-xs md:text-base truncate whitespace-nowrap 
                             overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[250px]  md:max-w-[350px]"
                title={flexRender(
                  cell?.column?.columnDef?.cell,
                  cell.getContext()
                )}
              >
                {flexRender(cell?.column?.columnDef?.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MySimpleTable;
