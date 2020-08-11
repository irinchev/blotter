import React from "react";
import {useTable} from "react-table";
import clsx from "clsx";
import "./index.css";

export default class App extends React.Component {
    render() {
        return (
            <div className="w-full h-full">
                <Blotter/>
            </div>
        );
    }
}

function Blotter() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            }
        ],
        []
    );

    let data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            age: Math.random(),
            visits: Math.random(),
            status: Math.random(),
            progress: Math.random()
        });
    }
    return (
        <div className="w-full h-full p-8">
            <div className="w-full h-full flex flex-col">
                <Table columns={columns} data={data}/>
            </div>
        </div>
    )
}

function Table({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <div className="flex-1 overflow-y-auto">
            <table {...getTableProps()} className="w-full border-collapse" cellPadding="0"
                   cellSpacing="0">
                <thead className="">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="w-full font-bold text-xs">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}
                                className="text-left padding-2 uppercase sticky top-0 bg-indigo-100">
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td className="w-48" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}