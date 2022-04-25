import React, { useEffect, useMemo, useState } from "react"
import { useTable } from "react-table"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import { UserActions } from "./redux/actions/UserActions"


function App() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.UserReducer)
  console.log(users)
  const data = useMemo(() =>
    users
    ,
    [])
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: "Email",
        accessor: "email"
      },
      { Header: "Address", columns: [{ Header: "Suite", accessor: "address.suite" }, { Header: "Street", accessor: "address.street" }, { Header: "City", accessor: "address.city" }] },
      { Header: "Company", accessor: "company.name" }
    ],
    []
  )

  const tableInstance = useTable({ columns, data })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  const fetchUsers = async () => {
    dispatch(UserActions())
  }



  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <table {...getTableProps()}>
      <thead>
        {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {// Render the header
                      column.render('Header')}
                  </th>
                ))}
            </tr>
          ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {// Render the cell contents
                          cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
      </tbody>
    </table>
  );
}

export default App;
