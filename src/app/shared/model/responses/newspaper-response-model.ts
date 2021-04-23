export interface NewsPaperResponseModel {
    newId: number,
    image: string,
    title: string
    content: string,
    author: string,
    deleted: boolean,
    updateTime: number,
    elements: number,
    pages: number,
}