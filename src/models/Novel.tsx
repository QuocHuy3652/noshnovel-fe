export interface Author {
  name: string;
  slug: string | null;
}

export interface Novel {
  title: string;
  author: Author;
  coverImage: string;
  genres: string;
  novelSlug: string;
  status: string;
  totalChapter: number;
}
