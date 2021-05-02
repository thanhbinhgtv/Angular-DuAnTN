export interface CommentResponseModel{
    pages: 1,
    data: [
      {
        commentId: number,
        comment: string,
        start: number,
        time: number,
        article: {
          image: string,
          articleId: number,
          title: string
        },
        customer: {
          image: string,
          customerId: number,
          name: string,
          email: string
        }
      }
    ],
    elements: number,
    avgStar: number
}