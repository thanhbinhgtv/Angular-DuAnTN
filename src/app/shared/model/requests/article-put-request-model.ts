export interface ArticlePutRequestModel {
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
}

export interface roommate {
    description: string,
    gender: boolean,
    quantity: number,
}