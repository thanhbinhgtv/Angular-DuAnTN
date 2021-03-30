export interface ArticleResponseModel {
    articleId: number,
    title: string,
    content: string,
    image: string,
    roomPrice: number,
    description: string,
    createTime: number,
    lastUpdateTime: number,
    expDate: null,
    vip: boolean,
    status: string,
    service: {
      serviceId: number,
      waterPrice: number,
      electricPrice: number,
      wifiPrice: number,
    },
    roommate: {
      roommateId: number,
      gender: boolean,
      quantity: number,
      description: string,
    },
    customer: {
      customerId: number,
      name: string,
      email: string,
    },
    moderator: null,
    address: {
      wardName: string,
      districtId: number,
      districtName: string,
      cityName: string,
      wardId: number,
      cityId: number,
    }
}