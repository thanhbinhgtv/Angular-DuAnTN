export interface ArticlePostRequestModel {
    wardId: number,
    address: string,
    title: string,
    description: string,
    roomPrice: number,
    acreage: number,
    electricPrice: number,
    waterPrice: number,
    wifiPrice: number,
    image: string,
    video: string,
    roommateDTO: roommate,
    vip: boolean,
    type: string,
    number: string,
}

export interface roommate {
    description: string,
    gender: boolean,
    quantity: number,
}