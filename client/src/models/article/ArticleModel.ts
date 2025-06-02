export class ArticleModel {
  id?: string;
  name: string;
  code: string;
  url?: string;
  file?: File | null;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    name: string = "",
    code: string = "",
    url: string = "",
    file: File | null = null,
    id?: string,
    userId?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.url = url;
    this.file = file;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
} 