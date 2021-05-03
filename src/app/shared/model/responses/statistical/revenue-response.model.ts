export interface RevenueRespone{
    elements: number,
    pages: number,
    data: [{
        year: number,
        month: number,
        date: number,
        sum: number,
    }]
}