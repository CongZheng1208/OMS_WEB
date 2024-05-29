export class ResData {
  public groupNameCode: string;
  public code: string;
  public language: string;
  public model: string;
  public path: string;
  public issueNumber: string;
  public publicationId: string;

  constructor(data: ResData) {
    this.groupNameCode = data.groupNameCode;
    this.code = data.code;
    this.language = data.language;
    this.model = data.model;
    this.path = data.path;
    this.issueNumber = data.issueNumber;
    this.publicationId = data.publicationId;
  }
}
