export interface SelectLetterTypeDTo{
      refId:number;
      shortName:string;
  }

  export interface SelectPartyTypeDTo{
    refId:number;
    refname1:string;
    refname2:string;
}

export interface IncommingCommunicationDto
{
  mytransid:number;
  searchtag:string;

  description:string;

  filledat:string;

  lettertype:string;

  letterdated:string;

}