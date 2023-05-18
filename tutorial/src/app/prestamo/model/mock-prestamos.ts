import { PrestamoPage } from "./PrestamoPage";

export const PRESTAMO_DATA: PrestamoPage = {
    content: [

        {
            id: 1, fechaInicio: '2023-04-13', fechaFin: '2023-04-15',
            game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } },
            client: { id: 1, name: "Verónica" }
        },


    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            { property: "id", direction: "ASC" }
        ]
    },
    totalElements: 7
}
