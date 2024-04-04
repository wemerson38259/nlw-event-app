import { LuSearch,LuMoreHorizontal, LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import IconButton from "./icon-button";
import Table from "./table/table";
import TableHeader from "./table/table-header";
import TableCell from "./table/table-cell";
import TableRow from "./table/table-row";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { attendees } from "../data/attendees";

interface Attendee {
  id: number,
  name: string,
  email:string,
  createdAt: string,
  checkedInAt: string | null
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if(url.searchParams.has('search'))
      return String(url.searchParams.get('search'))

    return ''
  })
  const [page,setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if(url.searchParams.has('page'))
      return Number(url.searchParams.get('page')) ?? null

    return 1
  })

  const [total,setTotal] = useState(0)
  const [attendees,setAttendees] = useState<Attendee[]>([])

  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    const url =  new URL ('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
    url.searchParams.set('pageIndex',String(page - 1))
    if(search.length > 0)
      url.searchParams.set('query',search)

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setAttendees(data.attendees)
      setTotal(data.total)
    })
  },[page,search])

  function setCurrentPage(page: number){
    const url = new URL(window.location.toString())

    url.searchParams.set('page',String(page))

    window.history.pushState({},"",url)

    setPage(page)
  }

  function setCurrentSearch(search: string){
    const url = new URL(window.location.toString())

    url.searchParams.set('search',String(search))

    window.history.pushState({},"",url)

    setSearch(search)
  }
  function hendleChange(e: ChangeEvent<HTMLInputElement>){
    setCurrentSearch(e.target.value)
    setCurrentPage(1)
  }

  function hendleClickPrev(){
    if(page != 1)
      setCurrentPage(page - 1)
  }

  function hendleClickNext(){
    if(totalPages != page)
      setCurrentPage(page + 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3" >
          <LuSearch className="size-4 text-emerald-300"/>
          <input 
            onChange={hendleChange}
            value={search}
            className="bg-transparent flex-1 outline-none text-sm border-0 p-0 focus:ring-0" 
            placeholder="Buscar participantes" 
            type="text" 
          />
        </div>
      </div>
      <div>
        <Table>
        <thead>
              <tr className="border-b border-white/10">
                <TableHeader style={{width: 64}}>
                  <input type="checkbox"  className="size-4 bg-black/20 rounded-md border border-white/10"/>
                </TableHeader>
                <TableHeader>Código</TableHeader>
                <TableHeader>Participantes</TableHeader>
                <TableHeader>Data de Inscrição</TableHeader>
                <TableHeader>Data do Check-in</TableHeader>
                <TableHeader style={{width: 64}}></TableHeader>
              </tr>
            </thead>
            <tbody>
            {attendees.map((attendee) =>{
             return (
              <TableRow key={attendee.id} >
                <TableCell>
                  <input type="checkbox"  className="size-4 bg-black/20 rounded border border-white/10 "/>
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                  </TableCell>
                {/* <TableCell>{attendee.createdAt.toISOString()}</TableCell>
                <TableCell>{attendee.checkedInAt.toISOString()}</TableCell> */}
                <TableCell></TableCell>
                <TableCell>{
                attendee.checkedInAt === null? 
                <span className="text-zinc-500">Não fez check-in</span>
                : ''}</TableCell>
                <TableCell>
                  <IconButton transparent={true}>
                    <LuMoreHorizontal className="text-white size-4"/>
                  </IconButton>
                </TableCell>
              </TableRow>
             )
            })}
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={3}>
                  Mostrando 10 de {total} itens
                </TableCell>
                <TableCell className="text-right" colSpan={3}>
                  <div className="inline-flex items-center gap-8">
                    <span>página {page} de {totalPages}</span> 
                    <div className="flex gap-1.5">
                      <IconButton>
                        <LuChevronsLeft  onClick={() => setCurrentPage(1)} className="text-white size-4"/>
                      </IconButton>
                      <IconButton>
                        <LuChevronLeft onClick={hendleClickPrev} className="text-white size-4"/>
                      </IconButton>
                      <IconButton>
                        <LuChevronRight onClick={hendleClickNext} className="text-white size-4"/>
                      </IconButton>
                      <IconButton>
                        <LuChevronsRight onClick={() => setCurrentPage(totalPages)} className="text-white size-4"/>
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </tr>
            </tfoot>
        </Table>
      </div>
    </div>
  )
}
